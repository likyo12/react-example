import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onCategoryChange: (category: string) => void;
  onOpenTraceability: () => void;
  onOpenZoom: () => void;
}

export default function Footer({ onCategoryChange, onOpenTraceability, onOpenZoom }: FooterProps) {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-surface-container border-t border-outline-variant/30 text-on-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Narrative */}
        <div className="space-y-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-serif text-lg font-bold tracking-[0.15em] text-on-surface uppercase block"
          >
            LUMIÈRE LINEN
          </a>
          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed max-w-xs">
            Elevating the everyday through sustainable, high-end textile design. Sourced from flax, cured by nature, woven in France.
          </p>
        </div>

        {/* Shop navigation column */}
        <div className="flex flex-col space-y-3">
          <span className="font-sans text-[10px] font-semibold tracking-widest text-primary uppercase mb-2">
            SHOP
          </span>
          <button
            onClick={() => { onCategoryChange('bedding'); handleScrollToSection('collection'); }}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Bedding Series
          </button>
          <button
            onClick={() => { onCategoryChange('bath'); handleScrollToSection('collection'); }}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Organic Bath
          </button>
          <button
            onClick={() => { onCategoryChange('apparel'); handleScrollToSection('collection'); }}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Slow-wear Apparel
          </button>
          <button
            onClick={() => { onCategoryChange('table'); handleScrollToSection('collection'); }}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Table selection
          </button>
        </div>

        {/* Information column */}
        <div className="flex flex-col space-y-3">
          <span className="font-sans text-[10px] font-semibold tracking-widest text-primary uppercase mb-2">
            INFORMATION
          </span>
          <button
            onClick={onOpenTraceability}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Europe Sourcing Maps
          </button>
          <button
            onClick={onOpenZoom}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Organic Certification
          </button>
          <button
            onClick={onOpenZoom}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Flax Weave Magnifier
          </button>
          <button
            onClick={() => alert("Lumière Return serenity: We accept unused linens back within 30 days in their original unspun bio-bags, including free emission-offset shipping labels.")}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Shipping & Returns
          </button>
        </div>

        {/* Connect navigation column */}
        <div className="flex flex-col space-y-3">
          <span className="font-sans text-[10px] font-semibold tracking-widest text-primary uppercase mb-2">
            CONNECT
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all uppercase tracking-wider block"
          >
            Instagram Hub
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all uppercase tracking-wider block"
          >
            Pinterest Board
          </a>
          <button
            onClick={() => alert("Speak with the Lumière Concierge: Our helpdesk is open Monday-Friday from 9:00 to 18:00 CET. Sowers can reach us via atelier@lumierelinen.com.")}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Concierge Desk
          </button>
          <button
            onClick={() => alert("Lumière Privacy Guarantee: We do not resell seed data. Your personal credentials and organic orders are compiled privately under French safety laws.")}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-all text-left uppercase tracking-wider cursor-pointer"
          >
            Privacy Guarantee
          </button>
        </div>
      </div>

      {/* Subfooter */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-sans text-[10px] text-on-surface-variant/70 tracking-wider">
          © 2026 Lumière Linen. Consciously Crafted. Sourced ethically from Western Europe.
        </p>
        <div className="flex items-center gap-6 text-on-surface-variant/60">
          <div className="flex items-center gap-1 text-[10px] font-sans font-semibold tracking-widest">
            <Heart className="w-4 h-4 text-primary shrink-0" /> HAND LOOMED
          </div>
          <div className="flex items-center gap-1 text-[10px] font-sans font-semibold tracking-widest">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" /> GOTS PREMIUM
          </div>
          <div className="flex items-center gap-1 text-[10px] font-sans font-semibold tracking-widest">
            <Sparkles className="w-4 h-4 text-primary shrink-0" /> CARBON ZERO
          </div>
        </div>
      </div>
    </footer>
  );
}
