import { useState } from 'react';
import { weavingStages } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, MapPin, Sparkles } from 'lucide-react';

export default function TraceabilityTimeline() {
  const [activeStep, setActiveStep] = useState(1);
  const currentStage = weavingStages.find(s => s.step === activeStep) || weavingStages[0];

  return (
    <section className="bg-surface-container-low py-20 border-t border-b border-outline-variant/20" id="traceability">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase block mb-3">
            ROOTED IN GEOGRAPHY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-on-surface tracking-wide">
            Trace our French Flax Roots
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-2">
            Every thread of Lumière linen has a passport. Follow the organic transformation from seed to cozy bedroom companion.
          </p>
        </div>

        {/* Step Numbers Map */}
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 max-w-4xl mx-auto mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 z-0 hidden md:block -translate-y-1/2" />
          
          {weavingStages.map((stage) => {
            const isSelected = stage.step === activeStep;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStep(stage.step)}
                className="relative z-10 flex-1 flex flex-col items-center group focus:outline-none cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm border-2 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary text-white border-primary scale-110 shadow-sm' 
                    : 'bg-white text-on-surface-variant border-outline-variant/60 hover:border-primary'
                }`}>
                  {stage.step}
                </div>
                <span className={`font-sans text-[10px] font-semibold tracking-wider uppercase mt-3 transition-colors ${
                  isSelected ? 'text-primary' : 'text-on-surface-variant/70 group-hover:text-primary'
                }`}>
                  {stage.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlight content card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-outline-variant/30 rounded-xs overflow-hidden shadow-xs">
          <div className="aspect-[4/3] md:aspect-auto md:h-[450px] relative overflow-hidden bg-surface-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStage.step}
                initial={{ opacity: 0.1, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.1, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={currentStage.imageUrl}
                alt={currentStage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute bottom-6 left-6 bg-white/95 px-4 py-2 text-[10px] font-sans font-semibold text-primary tracking-widest uppercase rounded-xs shadow-xs flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" /> CO-OP CLIMATE MAP
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-6">
            <span className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase border border-primary/30 rounded-xs px-2.5 py-1">
              STAGE 0{currentStage.step} OF 04
            </span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl text-on-surface tracking-wide">
                  {currentStage.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {currentStage.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/20">
              <div className="flex gap-2.5 items-start">
                <Leaf className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans text-xs font-semibold text-on-surface">Zero Water Waste</h5>
                  <p className="font-sans text-[10px] text-on-surface-variant leading-normal">Grown relying solely on rainfall</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Award className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans text-xs font-semibold text-on-surface">CO2 Sink Fields</h5>
                  <p className="font-sans text-[10px] text-on-surface-variant leading-normal">Flax farms trap 250k tons of carbon annually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
