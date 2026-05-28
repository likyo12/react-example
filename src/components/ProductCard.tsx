import { Product } from '../types';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <motion.div
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col h-full bg-surface-container-low/35 rounded-xs overflow-hidden border border-outline-variant/10 hover:border-outline-variant/40 transition-all duration-300 shadow-xs focus:ring-1 focus:ring-primary focus:outline-none"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low shrink-0">
        <img
          src={product.image}
          alt={product.description}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Dynamic Badge Tags */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 text-[9px] font-sans font-semibold uppercase tracking-widest rounded-xs ${
              product.badgeType === 'new' 
                ? 'bg-primary/20 text-on-primary-fixed-variant backdrop-blur-md'
                : product.badgeType === 'organic'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-tertiary-container text-on-tertiary-container'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Tag on Hover */}
        <div className="absolute inset-0 bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-on-surface font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2 shadow-sm rounded-xs transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-base text-on-surface tracking-wide group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-sans text-xs font-medium text-on-surface">{product.rating}</span>
            </div>
          </div>
          <p className="font-sans text-[10px] text-on-surface-variant font-semibold mt-1 uppercase tracking-widest opacity-70">
            {product.subtitle}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/20">
          <div className="flex gap-1.5">
            {product.colors.slice(0, 3).map((color, idx) => (
              <span
                key={idx}
                title={color}
                className="w-3.5 h-3.5 rounded-full border border-outline-variant/40 shrink-0"
                style={{
                  backgroundColor: 
                    color === 'Warm Sand' ? '#E6DFD3' : 
                    color === 'Cloudburst' ? '#8F999D' : 
                    color === 'Sage' ? '#7A8C7F' : 
                    color === 'Oatmeal' ? '#DFD8CE' : 
                    color === 'Terracotta' ? '#C27561' : 
                    color === 'Charcoal' ? '#3F3F3E' : '#FFFFFF'
                }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="font-sans text-[9px] text-on-surface-variant self-center font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
          <p className="font-sans text-sm font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
