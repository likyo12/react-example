import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, Check, Plus, Minus, Info, ClipboardList, Recycle } from 'lucide-react';
import { Product, CartItem, Review } from '../types';
import { useState, FormEvent } from 'react';
import { sampleReviews } from '../data';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

type TabType = 'details' | 'care' | 'traceability' | 'reviews';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Live local review system
  const [localReviews, setLocalReviews] = useState<Review[]>(
    sampleReviews[product.id] || [
      { id: 'gen-01', author: 'Clara M.', rating: 5, date: 'May 05, 2026', text: 'This has totally transformed my sleep. I wake up completely refreshed. Highly recommend if you appreciate simple, tactile luxuries!' }
    ]
  );
  
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;
    
    const submitted: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: newText
    };

    setLocalReviews([submitted, ...localReviews]);
    setNewAuthor('');
    setNewRating(5);
    setNewText('');
  };

  const handleAddToCart = () => {
    onAddToCart({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-4xl bg-surface rounded-xs overflow-hidden shadow-30px z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible pointer-events-auto border border-outline-variant/30 text-on-background"
        >
          {/* Close trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 cursor-pointer bg-white/90 hover:bg-neutral-100 rounded-full text-on-surface shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Photo panel */}
          <div className="md:w-1/2 aspect-[4/5] md:aspect-auto relative overflow-hidden bg-surface-container-low select-none">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-primary text-on-primary text-[10px] font-sans font-semibold uppercase tracking-widest px-4 py-1.5 rounded-xs shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Side: Informational Detail panel */}
          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[90vh] md:max-h-[80vh] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-on-surface tracking-wide">
                    {product.name}
                  </h2>
                  <p className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase mt-1">
                    {product.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full border border-outline-variant/30 hover:bg-surface-container-low transition-colors ${
                    isLiked ? 'text-red-500 fill-red-500' : 'text-on-surface-variant'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-6 mt-4">
                <span className="font-serif text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <div className="h-4 w-[1px] bg-outline-variant/40" />
                <div className="flex items-center gap-1.5 text-amber-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-sans text-sm font-semibold text-on-surface">
                    {product.rating}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    ({localReviews.length} reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-on-surface-variant mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Color swatches selector */}
              <div className="mt-8">
                <span className="text-[10px] font-sans text-on-surface-variant tracking-wider uppercase font-semibold">
                  SELECT COLOR: <strong className="text-on-surface">{selectedColor}</strong>
                </span>
                <div className="flex gap-3 mt-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-transform hover:scale-105 ${
                        selectedColor === color 
                          ? 'border-primary ring-2 ring-primary/20 scale-105' 
                          : 'border-outline-variant/40'
                      }`}
                      style={{
                        backgroundColor: 
                          color === 'Warm Sand' ? '#E6DFD3' : 
                          color === 'Cloudburst' ? '#8F999D' : 
                          color === 'Sage' ? '#7A8C7F' : 
                          color === 'Oatmeal' ? '#DFD8CE' : 
                          color === 'Terracotta' ? '#C27561' : 
                          color === 'Charcoal' ? '#3F3F3E' : '#FFFFFF'
                      }}
                    >
                      {selectedColor === color && (
                        <Check className={`w-3.5 h-3.5 ${
                          color === 'Warm Sand' || color === 'Oatmeal' ? 'text-neutral-850' : 'text-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mt-6">
                <span className="text-[10px] font-sans text-on-surface-variant tracking-wider uppercase font-semibold">
                  SELECT SIZE: <strong className="text-on-surface">{selectedSize}</strong>
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 font-sans text-xs uppercase tracking-wider rounded-xs border transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-on-primary border-primary font-medium'
                          : 'bg-white text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Info Accordion Tabs */}
              <div className="mt-8 border-t border-outline-variant/30">
                <div className="flex border-b border-outline-variant/30">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-sans font-medium border-b-2 transition-all ${
                      activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/70 hover:text-primary'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-sans font-medium border-b-2 transition-all ${
                      activeTab === 'care' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/70 hover:text-primary'
                    }`}
                  >
                    Care Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('traceability')}
                    className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-sans font-medium border-b-2 transition-all ${
                      activeTab === 'traceability' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/70 hover:text-primary'
                    }`}
                  >
                    Sourcing
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-3 text-center text-xs uppercase tracking-widest font-sans font-medium border-b-2 transition-all ${
                      activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant/70 hover:text-primary'
                    }`}
                  >
                    Reviews
                  </button>
                </div>

                <div className="py-5 text-sm font-sans text-on-surface-variant leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Material Composition:</strong> {product.materials}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Recycle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Certificates:</strong> Oeko-Tex Standard 100 Class 1 (safe for babies), certified organic flax.</span>
                      </p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-1">
                      <p className="flex items-start gap-2">
                        <ClipboardList className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{product.care}</span>
                      </p>
                    </div>
                  )}

                  {activeTab === 'traceability' && (
                    <div className="bg-surface-container-low p-4 rounded-xs border border-outline-variant/20 italic text-stone-750">
                      "{product.story}"
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="max-h-48 overflow-y-auto pr-1 space-y-4">
                        {localReviews.map((rev) => (
                          <div key={rev.id} className="pb-3 border-b border-outline-variant/15 last:border-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-on-surface">{rev.author}</span>
                              <span className="text-[10px] text-on-surface-variant/60">{rev.date}</span>
                            </div>
                            <div className="flex gap-0.5 text-amber-500 mb-1.5">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs text-on-surface-variant italic">"{rev.text}"</p>
                          </div>
                        ))}
                      </div>

                      {/* Review Builder Form */}
                      <form onSubmit={handleAddReview} className="border-t border-outline-variant/25 pt-4 space-y-3">
                        <p className="text-[10px] font-sans font-semibold text-on-surface uppercase tracking-wider">
                          Leave your feedback
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Your Name (e.g. Jean S.)"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className="bg-white border border-outline-variant/40 rounded-xs px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                            required
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-on-surface-variant">Rating:</span>
                            <select
                              value={newRating}
                              onChange={(e) => setNewRating(Number(e.target.value))}
                              className="bg-white border border-outline-variant/40 rounded-xs py-1.5 px-2 text-xs focus:outline-none focus:border-primary"
                            >
                              <option value={5}>5 ★ - Serene</option>
                              <option value={4}>4 ★ - Soft</option>
                              <option value={3}>3 ★ - Neutral</option>
                              <option value={2}>2 ★ - Rough</option>
                              <option value={1}>1 ★ - Coarse</option>
                            </select>
                          </div>
                        </div>
                        <textarea
                          placeholder="Tell us about the texture and longevity..."
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          className="w-full bg-white border border-outline-variant/40 rounded-xs p-3 text-xs h-16 focus:outline-none focus:border-primary"
                          required
                        />
                        <button
                          type="submit"
                          className="py-1.5 px-4 bg-outline hover:bg-primary text-white font-sans text-[10px] uppercase font-semibold tracking-widest rounded-xs transition-colors cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Modifier and Add to Bag panel */}
            <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center gap-4">
              <div className="flex items-center border border-outline-variant/60 rounded-xs bg-white h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-sans text-sm font-semibold px-2 shrink-0 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-grow h-12 flex items-center justify-center gap-2 font-sans text-xs uppercase font-semibold tracking-widest transition-all cursor-pointer ${
                  isAdded 
                    ? 'bg-secondary text-white' 
                    : 'bg-on-background text-background hover:opacity-90 active:scale-[0.98]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Selection
                  </>
                ) : (
                  'Add to Selection'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
