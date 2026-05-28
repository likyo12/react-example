import { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Shield, Calendar, Mail, Heart, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

export default function Navigation({
  cartItemsCount,
  onOpenCart,
  onCategoryChange,
  selectedCategory,
}: NavigationProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Shop All', value: 'all' },
    { label: 'Bedding', value: 'bedding' },
    { label: 'Bath', value: 'bath' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Table selection', value: 'table' },
    { label: 'Traceability', value: 'traceability', triggerScroll: true }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setMobileMenuOpen(false);
    if (item.triggerScroll) {
      const element = document.getElementById('traceability');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onCategoryChange(item.value);
      const element = document.getElementById('collection');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 shadow-xs' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center w-full">
        {/* Mobile menu triggers */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-on-surface hover:text-primary cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-serif text-lg md:text-xl font-bold tracking-[0.15em] text-on-background select-none hover:opacity-85"
          >
            LUMIÈRE LINEN
          </a>
          
          {/* Main Desktop Center Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            {menuItems.map((item, idx) => {
              const isActive = selectedCategory === item.value || (item.triggerScroll && false);
              return (
                <button
                  key={idx}
                  onClick={() => handleMenuClick(item)}
                  className={`font-sans text-xs uppercase tracking-widest font-medium pb-1.5 border-b-2 transition-all cursor-pointer ${
                    isActive 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-4 relative">
          {/* Profile User Icon */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="p-2 hover:opacity-75 transition-opacity cursor-pointer text-on-surface hover:text-primary"
            title="Your account"
            id="profile-btn"
          >
            <User className="w-[18px] h-[18px]" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="p-2 hover:opacity-75 transition-opacity cursor-pointer relative text-on-surface hover:text-primary"
            title="Open Selection Bag"
            id="cart-toggle"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Luxury Profile Pop-over */}
          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 z-50 w-80 bg-surface rounded-xs border border-outline-variant/30 shadow-30px p-6 text-on-background"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                    <div className="w-10 h-10 bg-primary-container rounded-xs flex items-center justify-center text-primary font-bold font-serif text-lg">
                      G
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-on-surface">M. Julijs Guscins</h4>
                      <p className="font-sans text-[10px] text-on-surface-variant break-all">guscinsjulijs@gmail.com</p>
                    </div>
                  </div>

                  <div className="py-4 space-y-3.5">
                    <p className="font-sans text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" /> Lumière Guild Gold Elite
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      Thank you for choosing slow living. You enjoy complimentary emissions-offset shipping on all orders and exclusive early access to our seasonal harvests.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/22 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-medium font-sans">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-secondary" style={{ strokeWidth: 2.2 }} /> Organic Tier
                      </span>
                      <span className="text-secondary font-semibold">Active Elite</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium font-sans mt-1">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-secondary" style={{ strokeWidth: 2.2 }} /> Member Since
                      </span>
                      <span className="text-stone-700">May 2026</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide-out Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-surface p-8 shadow-2xl flex flex-col md:hidden uppercase"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-md font-bold tracking-widest text-on-surface">Lumière</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 cursor-pointer">
                  <X className="w-5 h-5 text-on-surface" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mt-6">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMenuClick(item)}
                    className="text-left font-sans text-xs uppercase tracking-[0.2em] font-medium text-on-surface hover:text-primary border-b border-spacing-1 border-outline-variant/20 pb-2 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto text-center font-sans text-[10px] text-on-surface-variant tracking-wider opacity-60">
                <p>© 2026 LUMIÈRE LINEN</p>
                <p className="mt-1">Consciously Crafted.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
