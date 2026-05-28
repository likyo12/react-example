import { useState, FormEvent } from 'react';
import { products } from './data';
import { Product, CartItem } from './types';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import FabricZoom from './components/FabricZoom';
import TraceabilityTimeline from './components/TraceabilityTimeline';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, BookOpen, ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Prepulate with 1 initial item matching the original draft screenshot
    {
      id: 'lumi-01-initial',
      product: products[0],
      quantity: 1,
      selectedColor: 'Cloudburst',
      selectedSize: 'Queen'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFabricZoomOpen, setIsFabricZoomOpen] = useState(false);

  // Newsletter Section State
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubbed, setNewsSubbed] = useState(false);

  // Add to Selection handler
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const rowId = `${item.product.id}-${item.selectedColor}-${item.selectedSize}`;
    
    setCartItems(prev => {
      const matchIdx = prev.findIndex(ci => ci.id === rowId || (ci.product.id === item.product.id && ci.selectedColor === item.selectedColor && ci.selectedSize === item.selectedSize));
      if (matchIdx > -1) {
        const copy = [...prev];
        copy[matchIdx].quantity += item.quantity;
        return copy;
      } else {
        return [...prev, { ...item, id: rowId }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQ = item.quantity + delta;
        return nextQ > 0 ? { ...item, quantity: nextQ } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSubbed(true);
    setTimeout(() => {
      setNewsEmail('');
    }, 4000);
  };

  // Filter products by active selection
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans relative">
      
      {/* Scroll indicator banner / Global Eco notice */}
      <div className="bg-primary text-background text-[10px] font-sans font-bold tracking-[0.2em] text-center py-2.5 uppercase select-none z-50 relative">
        ★ Complimentary organic linen bag with purchase over $150 ★
      </div>

      {/* Navigation Layer */}
      <Navigation
        cartItemsCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="flex-grow">
        
        {/* Sun-drenched master bedroom Hero Banner */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHi2-_cEiJsUVhVxhx5wBcZAXZLC8D6_sFhVXkLVrqlJp0noBILhF-4ZdtNLGCy4G3QU3T1NGRSTK_SJb4A9LAtEjxfCZZoirEdgoge-Q6MDd3fU0MDA0CuFt5QY-aDTaQP-5OPOFLzo_G7PlL8L0nBRxtAre75gm4y5fbDozGG9kzFlQBVdVPy4pWH-u46VX_eaX1w5onAL_j-kezOkUG2LBdadBG_OnfAGbHq6F8wAcF8ojpK_GSqHme9AGzMJbt_cr1GHxXi-af"
              alt="An expansive master bedroom with sunlight pouring over rumpled organic European flax linen"
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Ambient gradients for typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/25 to-transparent" />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-left"
            >
              <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-semibold mb-4 block uppercase">
                Sustainable by Nature
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-on-background mb-6 leading-[1.05] tracking-tight">
                Living with <br />Intention.
              </h1>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-lg mb-10 leading-relaxed md:font-light">
                Experience the tactile luxury of 100% organic European flax. Crafted for longevity, pre-washed for extreme softness, and designed to inspire serenity.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary hover:bg-primary/95 text-on-primary px-8 py-4.5 font-sans text-xs font-semibold uppercase tracking-widest transition-all hover:shadow-md cursor-pointer active:scale-95"
                >
                  Shop the Collection
                </button>
                <button
                  onClick={() => document.getElementById('about-story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-outline px-8 py-4.5 font-sans text-xs font-semibold uppercase tracking-widest text-on-surface hover:bg-surface-container-low transition-all cursor-pointer"
                >
                  Our Story
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Down Hint indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60">
            <span className="font-mono text-[9px] uppercase tracking-widest">Inquire Below</span>
            <div className="w-[1px] h-8 bg-on-background/40 animate-bounce" />
          </div>
        </section>


        {/* Visual Bento Section: Curated Living */}
        <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto" id="collection">
          <div className="text-center max-w-md mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface tracking-wide">
              Curated Living
            </h2>
            <div className="w-12 h-[2px] bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">
            {/* Large Box: Bedding Column (Span-8) */}
            <div className="md:col-span-8 relative group overflow-hidden bg-surface-container-low rounded-xs border border-outline-variant/20 shadow-xs h-[320px] md:h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_inZVQ3_39pnUNYwZR2yVsMonOQstuYdQdbDkH4PZ4D5V8AfNmo2q8HaFFRHJS4o44JS9jsgIYCyng46al1suUxeA-IwHqTnSSX7vuy239kUcfBWHuyWLR5pWcvu1HsK5LBuugebnbYiotzKUxkHwcPbZR7skZSDYRZKHTsLyWhKc0QpByTFwUNXCobKo4awzUMdgQD-YfH7SfFJiKb5Zg5Snvu9uXbDURdiyOgkrpgyOYisY8ugCbZIgMA1EP7v6T6HVSAClRapW"
                alt="Beautiful premium organic bedding pillow set styled in sage green flax linen options"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">Bedding</h3>
                  <button
                    onClick={() => {
                      setSelectedCategory('bedding');
                      document.getElementById('catalog-cards')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-sans text-[10px] font-semibold text-white tracking-[0.2em] border-b border-white pb-1 uppercase hover:opacity-85 cursor-pointer"
                  >
                    Explore Series
                  </button>
                </div>
              </div>
            </div>

            {/* Right Stack: Bath & Apparel (Span-4) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              
              {/* Bath Box */}
              <div className="h-[250px] md:h-1/2 relative group overflow-hidden bg-surface-container-low rounded-xs border border-outline-variant/20 shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACAsCZMks857Y1vUtwnjTvobJWFPJ3bzcaCupTZdsJPs6MCT1o3A-rFlcNLJnljVnTmTuJHw3cfzgf1zOIvm43t9_wWZE6BEOgmChwSLRuoGhJbZUiS_PiVh1dyQMiwjmk6tvJ-yFDAdOJt7D_pxmroCgJekUt0bvakyojG4CetpwlhuldGCHqXuuGBUhE5XwGEHPF5W692HOHNuefghLBlryJinQTccAYQHqYpekMyUL2f-y2-ziqEIXWin6dNon9A0NjjjMXDjDy"
                  alt="Thick water absorbent organic waffle linen towels hanging on sand racks"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-white font-medium">Bath</h3>
                    <button
                      onClick={() => {
                        setSelectedCategory('bath');
                        document.getElementById('catalog-cards')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-sans text-[10px] font-semibold text-white tracking-[0.2em] border-b border-white pb-1 uppercase hover:opacity-85 cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Apparel Box */}
              <div className="h-[250px] md:h-1/2 relative group overflow-hidden bg-surface-container-low rounded-xs border border-outline-variant/20 shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB--C9s_-UpNTzeCnuusowsf8CSm2tZ2qJjjQ6KYgIpzU8RKYEmn119bp7V-An-DI12tVYzFB1N4iV1H99vsDYZEvycwbvAHB5Eb0ytCCngFj5A4bjBotJZDjpNZPuajs7T_qzwsXQX0zoiAnzro-1aIMeu15edXJAWvsTHHaqOLosz5i_dJCl3TpTSGpdIZFn7zD--T7mNEtHc3r4GfxF1OwMkkGpPrBx8R-ni3euLKe7QC9RbGvG1wKq_kIw1Qk7HLQdCZpSt2-qt"
                  alt="Slow styling terracotta linen clothes hanging in minimalist closet"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-white font-medium">Apparel</h3>
                    <button
                      onClick={() => {
                        setSelectedCategory('apparel');
                        document.getElementById('catalog-cards')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-sans text-[10px] font-semibold text-white tracking-[0.2em] border-b border-white pb-1 uppercase hover:opacity-85 cursor-pointer"
                    >
                      Discover Slow Fashion
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Brand Story Philosophy Segment */}
        <section className="bg-surface-container-low py-24 overflow-hidden border-t border-b border-outline-variant/15" id="about-story">
          <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            
            {/* Left Hand: Flax Raw Plant held by hand */}
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xs border border-outline-variant/30 shadow-xs bg-[#EAEAED]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMWQqTxLDGrGdheCRC_4fAWsYj_a7sUChgJjg0ggzVR64MaguRilCfcU1glE0So1NGPVDH2FnIAz-UJP-5tFwjJbNToJQzzmAZzKvACKIjt7zb_iZovE_ATfUM2q_E3uVcUs6uvz0g4dUxexure7hPHizmw22sB5xQadrCKebpWuDaZ2CXvMgKOtx1AY2oTDhMcFpImNjY-1Uo4vCR_jvbSEkF2_6O-dR1dNRB3vaxrD76SOY9hh7BtqueJC3Ap_xZ0igRD-1NIQd0"
                  alt="Raw organic golden flax bundles held by multi generational grower hand"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Overlapping Quote Box */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-8 md:p-10 shadow-30px max-w-xs border border-outline-variant/20 hidden sm:block">
                <p className="font-serif text-sm md:text-base text-on-surface-variant italic leading-relaxed">
                  "We believe the objects in our homes should carry the weight of stories, not the weight of excess."
                </p>
                <div className="w-8 h-[1px] bg-primary mt-4" />
                <p className="font-sans text-[9px] font-semibold text-primary tracking-widest uppercase mt-2">
                  LUMIÈRE PHILOSOPHY
                </p>
              </div>
            </div>

            {/* Right Hand: Editorial parameters */}
            <div className="space-y-8 text-left">
              <span className="font-sans text-[10px] text-primary tracking-widest font-semibold uppercase block">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-on-surface leading-tight tracking-wide">
                Consciously Crafted <br className="hidden md:block" /> for Decades, not Days.
              </h2>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-light">
                Our linen is sourced from the coastal plains of Northern France and Belgium, where the unique microclimate, natural ocean mist, and fertile valleys produce the world’s finest flax fibers. Every single sheet in our harvest is woven with local intention and finished using GOTS-compliant, non-toxic organic dyes.
              </p>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-90 font-light">
                By choosing Lumière, you support regenerative rain-fed organic farming practices and a completely transparent supply chain that prioritizes the long-term health of our soil, our workers, and the sanctuary you call home.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => document.getElementById('traceability')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-fixed-dim select-none cursor-pointer border-b border-primary/50 pb-1"
                >
                  Learn About Traceability <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </section>


        {/* Featured Pieces Catalog grid */}
        <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto" id="catalog-cards">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-on-surface tracking-wide">
                Featured Pieces
              </h2>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant mt-2 font-light">
                Selected essentials for the seasonal home.
              </p>
            </div>
            
            {/* Tab filter pill row */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All Products', value: 'all' },
                { label: 'Bedding', value: 'bedding' },
                { label: 'Bath', value: 'bath' },
                { label: 'Apparel', value: 'apparel' },
                { label: 'Table selection', value: 'table' }
              ].map((tab) => {
                const isActive = selectedCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedCategory(tab.value)}
                    className={`px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-widest rounded-xs border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-primary text-background border-primary shadow-xs' 
                        : 'bg-white text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout of filtered products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={p}
                    onSelect={setSelectedProduct}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </section>


        {/* Trace Timeline Map section */}
        <TraceabilityTimeline />


        {/* Interstitial banner: Fabric Zoom */}
        <section className="relative h-[550px] bg-on-background overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0 select-none">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvwxruVHHtpSBGOo7QIZ-_muXHql1UWmEaFi2UL2NfcAD4dd-z5CbSN2RrmGGdNYPQtItk_zxTW1aBUtYgRhHZP6f_y5xOkU-rJ-QkKBA2FqIDlpJbvfdma3voV_ygf8ord_bdUDfDkjnXtGOlzMvE_YbFrrEN52XbjeZuHTvm8mEc4SHK-DKuQWO0vpgS7A9eYY4cC851xekK6HpruL7Nd8aj1NEhK0egXySDLK-WGnMFrd26pDeILDwgWz0lG-m-lv5djCCCJ6db"
              alt="Background loom weave fibers"
              className="w-full h-full object-cover opacity-35 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-2xl px-6 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl text-background tracking-wide leading-tight"
            >
              Tactile Luxury
            </motion.h2>
            <p className="font-sans text-sm md:text-base text-background/85 max-w-lg mx-auto leading-relaxed md:font-light">
              Our fabric isn’t just manufactured; it’s planted. We preserve the organic irregularities of the flax stalk to ensure every single woven sheet sings the story of its field.
            </p>
            <div>
              <button
                onClick={() => setIsFabricZoomOpen(true)}
                className="bg-background text-on-background px-8 py-4.5 font-sans text-xs font-semibold uppercase tracking-widest hover:bg-surface-container transition-colors cursor-pointer active:scale-95"
              >
                The Weaving Process
              </button>
            </div>
          </div>
        </section>


        {/* Newsletter Section */}
        <section className="py-24 px-6 md:px-16 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-on-surface tracking-wide">
            Join our Slow Living Community
          </h2>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed font-light">
            Receive custom organic recipes, stories from the grower co-ops, care manuals, and early seasonal drop notifications.
          </p>
          
          <div className="pt-4">
            <AnimatePresence mode="wait">
              {!newsSubbed ? (
                <motion.form
                  key="form"
                  onSubmit={handleNewsletterSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-md mx-auto flex gap-4 border-b border-outline-variant/60 py-2 focus-within:border-primary transition-all"
                >
                  <input
                    type="email"
                    placeholder="YOUR EMAIL ADDRESS"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="flex-grow bg-transparent border-0 outline-none text-sm py-2 px-1 focus:ring-0 placeholder-on-surface-variant/50 font-sans tracking-wide"
                    required
                  />
                  <button
                    type="submit"
                    className="font-sans text-xs font-semibold text-primary hover:opacity-80 uppercase tracking-widest cursor-pointer px-4"
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-primary-container p-5 rounded-xs border border-outline-variant/30 text-on-primary-container inline-block max-w-md w-full"
                >
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-primary" /> Welcomed to the Guild
                  </p>
                  <p className="font-sans text-xs mt-1.5 opacity-90 text-stone-750">
                    We've sent a tranquil botanical dispatch to your inbox. Take breath.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </main>

      {/* Structured Footer */}
      <Footer
        onCategoryChange={setSelectedCategory}
        onOpenTraceability={() => document.getElementById('traceability')?.scrollIntoView({ behavior: 'smooth' })}
        onOpenZoom={() => setIsFabricZoomOpen(true)}
      />

      {/* Sliding Selection Cart Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Complete Product Details Dialog Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Macroscopic weave zoom view */}
      <FabricZoom
        isOpen={isFabricZoomOpen}
        onClose={() => setIsFabricZoomOpen(false)}
      />

    </div>
  );
}
