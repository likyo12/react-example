import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'completed';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  
  // Checkout Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCharge = subtotal > 150 ? 0 : 15;
  const total = subtotal + shippingCharge;

  const handleNextStep = () => {
    if (step === 'cart') {
      if (cartItems.length === 0) return;
      setStep('shipping');
    } else if (step === 'shipping') {
      if (!email || !firstName || !lastName || !address || !city || !zipCode) {
        alert('Please fill in all shipping details.');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (!cardNumber || !expiry || !cvv) {
        alert('Please fill in your payment details.');
        return;
      }
      setStep('completed');
    }
  };

  const handleReset = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
          />

          {/* Right Sliding Drawer */}
          <motion.div
            id="cart-drawer-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-60 h-full w-full max-w-md bg-surface text-on-background shadow-30px flex flex-col pointer-events-auto border-l border-outline-variant/20"
          >
            {/* Header */}
            <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
              <div>
                <h2 className="font-serif text-2xl text-on-surface tracking-wide">
                  {step === 'cart' && 'Your Selection'}
                  {step === 'shipping' && 'Shipping Details'}
                  {step === 'payment' && 'Secure Payment'}
                  {step === 'completed' && 'Order Serenity'}
                </h2>
                <p className="font-sans text-xs text-on-surface-variant opacity-80 mt-1 uppercase tracking-widest">
                  {step === 'cart' && 'Sustainable luxury, curated for you'}
                  {step === 'shipping' && 'Enter your delivery address'}
                  {step === 'payment' && 'Review details & finalize order'}
                  {step === 'completed' && 'Your order is confirmed'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 cursor-pointer text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors"
                id="close-cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow overflow-y-auto p-8">
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-outline">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="font-serif text-lg text-on-surface">Your selection is empty</p>
                      <p className="font-sans text-sm text-on-surface-variant max-w-xs">
                        Adorn your home with sustainable, high-end organic linen.
                      </p>
                      <button
                        onClick={onClose}
                        className="font-sans text-xs text-primary border-b border-primary hover:opacity-85 uppercase tracking-widest mt-2"
                      >
                        Continue Exploring
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          className="flex gap-4 p-4 bg-white/50 border border-outline-variant/20 rounded-md shadow-xs relative"
                        >
                          <div className="w-20 h-24 bg-surface-container-high overflow-hidden rounded-xs shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-serif text-sm font-medium text-on-surface pr-4">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-on-surface-variant/40 hover:text-error transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="font-sans text-[10px] text-primary tracking-widest uppercase mt-1">
                                {item.selectedColor} • {item.selectedSize}
                              </p>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              {/* Quantity selection */}
                              <div className="flex items-center border border-outline-variant/50 rounded-xs bg-white">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="px-2 py-1 text-on-surface-variant hover:text-primary"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-sans text-xs font-medium px-2 shrink-0">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="px-2 py-1 text-on-surface-variant hover:text-primary"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <p className="font-sans text-sm text-primary font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="evelyn.v@linen.com"
                      className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Evelyn"
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Vance"
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="45 Rue du Faubourg Saint-Honoré"
                      className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Paris"
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="75008"
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/30 mt-6 space-y-2">
                    <p className="font-sans text-xs text-on-surface-variant flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      We offset 100% of shipping emissions with organic forestry initiatives.
                    </p>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <div className="bg-surface-container-high p-4 rounded-sm border border-outline-variant/30 flex justify-between items-center mb-6">
                    <div>
                      <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider">
                        Deliver to
                      </p>
                      <p className="font-serif text-sm font-medium text-on-surface mt-1">
                        {firstName} {lastName}
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                        {address}, {city}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-primary font-sans text-xs underline uppercase tracking-widest cursor-pointer hover:opacity-80"
                    >
                      Edit
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      defaultValue={`${firstName} ${lastName}`}
                      className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                      <CreditCard className="w-4 h-4 text-on-surface-variant/50 absolute right-3 top-3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans text-on-surface-variant tracking-wider uppercase mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-white border border-outline-variant/60 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'completed' && (
                <div className="space-y-6 flex flex-col justify-center items-center text-center py-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-primary-fixed"
                  >
                    <Sparkles className="w-10 h-10 text-primary" />
                  </motion.div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-on-surface">Thank You for Choosing Lumière</h3>
                    <p className="font-sans text-xs text-primary uppercase tracking-widest font-semibold">
                      Your Eco-Conscious parcel is ordered
                    </p>
                    <p className="font-sans text-sm text-on-surface-variant max-w-sm mt-3">
                      We will package your European flax linens using certified biodegradable paper and send a carbon-neutral tracking link to <strong>{email}</strong> shortly.
                    </p>
                  </div>

                  <div className="bg-surface-container-low p-5 rounded-xs border border-outline-variant/30 text-left w-full space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                      <span className="font-sans text-xs text-on-surface-variant">Order ID</span>
                      <span className="font-mono text-xs font-semibold text-on-surface">LUMI-{(Math.floor(Math.random() * 89999) + 10000)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans text-on-surface">Total Charge</span>
                      <span className="font-sans text-primary font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Calculation / Checkout Actions */}
            {step !== 'completed' && (
              <div className="mt-auto p-8 border-t border-outline-variant/30 bg-surface-container-low">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-sans text-on-surface-variant">Subtotal</span>
                    <span className="font-sans text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {step !== 'cart' && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-sans text-on-surface-variant">Shipping</span>
                      <span className="font-sans text-on-surface">
                        {shippingCharge === 0 ? (
                          <span className="text-secondary font-semibold shrink-0">FREE</span>
                        ) : (
                          `$${shippingCharge.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-base pt-2 border-t border-outline-variant/20">
                    <span className="font-sans font-medium text-on-surface">Estimated Total</span>
                    <span className="font-serif text-lg font-bold text-on-surface">
                      {step === 'cart' ? `$${subtotal.toFixed(2)}` : `$${total.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-5 bg-on-background text-background font-sans text-xs font-semibold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {step === 'cart' && (
                      <>
                        Checkout Now <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                    {step === 'shipping' && 'Proceed to Payment'}
                    {step === 'payment' && `Pay $${total.toFixed(2)}`}
                  </button>
                )}
              </div>
            )}

            {step === 'completed' && (
              <div className="mt-auto p-8 border-t border-outline-variant/30 bg-surface-container-low">
                <button
                  onClick={handleReset}
                  className="w-full py-5 bg-primary text-on-primary font-sans text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Return to Store
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
