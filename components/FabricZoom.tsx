import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Eye, Layers, Compass, Wind } from 'lucide-react';

interface FabricZoomProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FabricZoom({ isOpen, onClose }: FabricZoomProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage relative to container coordinates
    const posX = ((e.clientX - left) / width) * 100;
    const posY = ((e.clientY - top) / height) * 100;
    
    setCoords({ x: posX, y: posY });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Dialog Frame */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl bg-surface rounded-xs overflow-hidden shadow-30px z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible pointer-events-auto border border-outline-variant/30 text-on-background"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 cursor-pointer bg-white/95 hover:bg-neutral-100 rounded-full text-on-surface shadow-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Magnifier Viewer */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-surface-container-low border-r border-outline-variant/20">
              <div>
                <span className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase">
                  Interactive Microscopic Viewer
                </span>
                <h3 className="font-serif text-2xl text-on-surface tracking-wide mt-2">
                  Tactility Close-Up
                </h3>
                <p className="font-sans text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Move your mouse across the textile swatch below to view the organic, certified long-staple flax weave magnified by 300%.
                </p>
              </div>

              {/* Swatch with interactive mouse-lens */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowLens(true)}
                onMouseLeave={() => setShowLens(false)}
                className="relative aspect-square w-full max-w-md mx-auto overflow-hidden mt-6 bg-[#EAEAED] cursor-crosshair group rounded-xs shadow-xs"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvwxruVHHtpSBGOo7QIZ-_muXHql1UWmEaFi2UL2NfcAD4dd-z5CbSN2RrmGGdNYPQtItk_zxTW1aBUtYgRhHZP6f_y5xOkU-rJ-QkKBA2FqIDlpJbvfdma3voV_ygf8ord_bdUDfDkjnXtGOlzMvE_YbFrrEN52XbjeZuHTvm8mEc4SHK-DKuQWO0vpgS7A9eYY4cC851xekK6HpruL7Nd8aj1NEhK0egXySDLK-WGnMFrd26pDeILDwgWz0lG-m-lv5djCCCJ6db"
                  alt="Extreme close up of organic flax linen weavers craftsmanship"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Magnifier Lens circles */}
                {showLens && (
                  <div
                    className="absolute w-44 h-44 rounded-full border-2 border-primary bg-white pointer-events-none shadow-lg overflow-hidden shrink-0"
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvwxruVHHtpSBGOo7QIZ-_muXHql1UWmEaFi2UL2NfcAD4dd-z5CbSN2RrmGGdNYPQtItk_zxTW1aBUtYgRhHZP6f_y5xOkU-rJ-QkKBA2FqIDlpJbvfdma3voV_ygf8ord_bdUDfDkjnXtGOlzMvE_YbFrrEN52XbjeZuHTvm8mEc4SHK-DKuQWO0vpgS7A9eYY4cC851xekK6HpruL7Nd8aj1NEhK0egXySDLK-WGnMFrd26pDeILDwgWz0lG-m-lv5djCCCJ6db")`,
                      backgroundSize: '350%',
                      backgroundPosition: `${coords.x}% ${coords.y}%`,
                    }}
                  />
                )}

                {!showLens && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity pointer-events-none">
                    <span className="bg-white/90 text-on-surface font-sans text-[10px] font-semibold tracking-widest uppercase px-3.5 py-2 shadow-xs rounded-xs flex items-center gap-2">
                      <ZoomIn className="w-4 h-4 text-primary" /> Hover to Zoom Weave
                    </span>
                  </div>
                )}
              </div>

              <p className="font-mono text-[10px] text-on-surface-variant text-center opacity-60 mt-4 uppercase">
                250 GSM • Long-Staple European Flax • Plain Weave Structure
              </p>
            </div>

            {/* Right Side: Flax Botanical details */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase">
                  Scientific Weave Properties
                </span>
                <h2 className="font-serif text-3xl text-on-surface tracking-wide mt-2">
                  Anatomy of Comfort
                </h2>
                
                <div className="space-y-6 mt-8">
                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-primary-container text-on-primary-container rounded-xs shrink-0">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-on-surface font-semibold">
                        Organic Slubbing
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                        The irregular horizontal and vertical bumps (slubs) in the yarn are not flaws—they are the stamp of raw botanical fibers, offering rich texture and a beautifully organic rumple.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-primary-container text-on-primary-container rounded-xs shrink-0">
                      <Wind className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-on-surface font-semibold">
                        Micro-Thermoregulation
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Linen fibers are hollow, acting as natural climate controls. In hot temperatures, dry breezes flow through easily; in chilly seasons, they store warm ambient air close to your body.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2.5 bg-primary-container text-on-primary-container rounded-xs shrink-0">
                      <Compass className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-on-surface font-semibold">
                        Moisture Breathability
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                        Linen can absorb up to 20% of its physical weight in absolute moisture beforehand starting to feel damp, encouraging highly breathable, hygienic, and restorative rest.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-outline-variant/30 flex justify-between items-center bg-surface-container-low p-4 rounded-xs border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <h5 className="font-sans text-xs font-semibold text-on-surface">Certified Sourcing</h5>
                    <p className="font-sans text-[10px] text-on-surface-variant">Sourced exclusively from European cultivators</p>
                  </div>
                </div>
                <span className="font-sans text-[10px] text-secondary font-bold uppercase tracking-wider border border-secondary/50 rounded-xs px-2.5 py-1">
                  GOTS CERTIFIED
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
