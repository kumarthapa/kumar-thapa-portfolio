"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { retailProducts } from "@/content/demo-content";
export function RetailDemo() {
  const [filter, setFilter] = useState("All");
  const [bag, setBag] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const count = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = retailProducts.reduce(
    (sum, p) => sum + p.price * (bag[p.id] || 0),
    0,
  );
  function update(id: string, delta: number) {
    setBag((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + delta),
    }));
  }
  return (
    <>
      <div className="retail-announcement">
        Considered objects. Everyday companions.
      </div>
      <nav
        className="demo-nav retail-nav"
        aria-label="Form and Field navigation"
      >
        <a className="demo-brand" href="#form-home">
          form & field<span>OBJECTS FOR EVERYDAY LIVING</span>
        </a>
        <div>
          <a href="#collection">The collection</a>
          <a href="#materials">Our approach</a>
        </div>
        <button
          className="retail-bag"
          onClick={() => dialog.current?.showModal()}
        >
          <ShoppingBag size={17} /> Bag{" "}
          <span aria-live="polite">({count})</span>
        </button>
      </nav>
      <section className="retail-hero" id="form-home">
        <div>
          <span className="demo-overline">LESS, BUT BETTER.</span>
          <h1>
            Good design.
            <br />
            <em>Lived in.</em>
          </h1>
          <p>
            Useful, beautiful things for the spaces you make your own. Made to
            feel at home from day one.
          </p>
          <a className="demo-button" href="#collection">
            Meet the collection <ArrowUpRight size={16} />
          </a>
          <span className="retail-issue">THE EVERYDAY EDIT — VOL. 01</span>
        </div>
        <div className="retail-hero-image">
          <AssetImage
            asset={visuals.retail}
            priority
            sizes="(max-width: 760px) 100vw, 65vw"
          />
          <span>A QUIETER KIND OF STATEMENT.</span>
        </div>
      </section>
      <section id="collection" className="retail-collection demo-wrap">
        <div className="demo-section-heading">
          <div>
            <span className="demo-overline">FIND YOUR EVERYDAY FAVOURITES</span>
            <h2>Simple things. Well made.</h2>
          </div>
          <div className="retail-filters" role="group" aria-label="Product categories">
            {["All", "Seating", "Tables", "Objects"].map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="retail-products">
          {retailProducts
            .filter((p) => filter === "All" || p.category === filter)
            .map((product) => (
              <article key={product.id}>
                <div className={"product-image product-" + product.id}>
                  <AssetImage
                    asset={product.visual}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  <span>{product.category}</span>
                </div>
                <div className="product-title">
                  <h3>{product.name}</h3>
                  <strong>£{product.price}</strong>
                </div>
                <p>{product.material}</p>
                <p className="product-description">{product.description}</p>
                <button
                  className="product-add"
                  onClick={() => {
                    update(product.id, 1);
                    setNotice(product.name + " added to your demo bag.");
                  }}
                >
                  Add to bag <Plus size={16} />
                </button>
              </article>
            ))}
        </div>
        <p className="retail-notice" role="status">
          {notice}
        </p>
      </section>
      <section id="materials" className="retail-materials demo-wrap">
        <span className="demo-overline">A FEW THINGS WE BELIEVE IN</span>
        <h2>
          Keep what matters.
          <br />
          <span>Make room for living.</span>
        </h2>
        <div>
          <p>
            We’re drawn to honest materials, useful shapes, and pieces that
            settle into your life. Our collection starts with a simple question:
            will you still love using this tomorrow?
          </p>
          <a href="#collection" className="demo-text-link">
            Find your next favourite <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <footer className="retail-footer demo-wrap">
        <strong>form & field</strong>
        <span>For the way you live, every day.</span>
        <a href="#collection">Explore the everyday edit ↗</a>
      </footer>
      <dialog
        className="demo-dialog retail-cart"
        ref={dialog}
        aria-labelledby="bag-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close bag"
          onClick={() => dialog.current?.close()}
        >
          <X size={22} />
        </button>
        <span className="demo-overline">FORM & FIELD</span>
        <h2 id="bag-title">Your everyday edit.</h2>
        {count === 0 ? (
          <p>Your bag is waiting for something good.</p>
        ) : (
          <>
            <div className="bag-items">
              {retailProducts
                .filter((p) => bag[p.id] > 0)
                .map((p) => (
                  <div key={p.id}>
                    <div>
                      <h3>{p.name}</h3>
                      <span>£{p.price} each</span>
                    </div>
                    <div className="bag-quantity">
                      <button
                        aria-label={"Remove one " + p.name}
                        onClick={() => update(p.id, -1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{bag[p.id]}</span>
                      <button
                        aria-label={"Add one " + p.name}
                        onClick={() => update(p.id, 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="bag-total">
              <span>Subtotal</span>
              <strong>£{total}</strong>
            </div>
            <p className="demo-form-note">
              This is a demo bag. Products and prices are illustrative; checkout
              and payments are not connected.
            </p>
          </>
        )}
        <button className="demo-button" onClick={() => dialog.current?.close()}>
          Continue exploring <ArrowRight size={16} />
        </button>
      </dialog>
    </>
  );
}
