import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
  compact?: boolean;
  compared?: boolean;
  onCompare?: () => void;
  compareDisabled?: boolean;
};

export function ProductCard({ product, featured = false, compact = false, compared = false, onCompare, compareDisabled = false }: ProductCardProps) {
  const image = product.cardImage ?? product.image;
  const imageSizes = compact
    ? "(max-width: 680px) 88vw, (max-width: 980px) 45vw, 25vw"
    : featured
      ? "(max-width: 680px) 100vw, (max-width: 980px) 55vw, min(650px, 50vw)"
      : "(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw";
  return <article className={`product-card ${featured ? "product-feature" : "product-regular"} ${compact ? "product-card--compact" : ""}`}>
    <Link href={`/products/${product.slug}`} className="product-card-media" aria-label={`View ${product.name}`}>
      <Image src={image} alt={`${product.name} industrial equipment`} fill sizes={imageSizes} />
      {compact && <span className="product-card-arrow" aria-hidden="true">↗</span>}
    </Link>
    <div className="product-card-body">
      <div className="product-card-category">{product.category}</div>
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      {compact ? <div className="product-spec product-compact-spec"><span>{product.specLabel}</span><strong>{product.specValue}</strong></div> : <div className="product-spec"><span>{product.specLabel}</span><strong>{product.specValue}</strong></div>}
      <div className="product-card-actions">
        <Link className="text-link" href={`/products/${product.slug}`}>View details <span aria-hidden="true">→</span></Link>
        {onCompare && <button className={`compare-toggle ${compared ? "is-selected" : ""}`} type="button" onClick={onCompare} aria-pressed={compared} disabled={compareDisabled}>{compared ? "In compare" : "Compare"}</button>}
      </div>
    </div>
  </article>;
}
