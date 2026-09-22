"use client";
import { useState } from "react";
import { ArrowDownRight, Flame, UtensilsCrossed } from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { restaurantMenu } from "@/content/demo-content";
import { DemoAction } from "./DemoAction";
type MenuCategory = keyof typeof restaurantMenu;
export function RestaurantDemo() {
  const [category, setCategory] = useState<MenuCategory>("From the kitchen");
  return (
    <>
      <nav
        className="demo-nav restaurant-nav"
        aria-label="Casa Ember navigation"
      >
        <a href="#casa-home" className="demo-brand">
          <Flame size={25} /> CASA EMBER
        </a>
        <div>
          <a href="#menu">The menu</a>
          <a href="#our-table">Our table</a>
        </div>
        <DemoAction
          label="Book a table"
          title="There’s a place for you."
          detail="Choose a preferred date for your sample reservation."
          kind="booking"
        />
      </nav>
      <section className="restaurant-hero" id="casa-home">
        <div className="restaurant-hero-copy">
          <span className="demo-overline">
            FIRE, FLOUR & THE GOOD THINGS IN LIFE
          </span>
          <h1>
            A SEAT
            <br />
            AT <em>OUR</em>
            <br />
            TABLE.
          </h1>
          <p>
            Handmade pasta. A wood-fired kitchen.
            <br />
            And always room for one more.
          </p>
          <a href="#menu" className="demo-button">
            See what’s cooking <ArrowDownRight size={20} />
          </a>
          <span className="restaurant-stamp">
            MADE SLOW.
            <br />
            SHARED OFTEN.
          </span>
        </div>
        <div className="restaurant-hero-image">
          <AssetImage
            asset={visuals.restaurant}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span>GOOD FOOD IS MEANT TO BE SHARED.</span>
        </div>
      </section>
      <div className="restaurant-ticker" aria-hidden="true">
        FRESHLY ROLLED <span>✳</span> FIRED WITH FEELING <span>✳</span> BEST
        SHARED <span>✳</span> CASA EMBER
      </div>
      <section id="menu" className="restaurant-menu demo-wrap">
        <div className="demo-section-heading">
          <div>
            <span className="demo-overline">A SHORT MENU. A LOT OF HEART.</span>
            <h2>COME HUNGRY.</h2>
          </div>
          <p>
            Seasonal ingredients, familiar comforts,
            <br />
            and a few things you’ll come back for.
          </p>
        </div>
        <div className="menu-tabs" role="group" aria-label="Menu categories">
          {(Object.keys(restaurantMenu) as MenuCategory[]).map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="menu-items" aria-live="polite">
          {restaurantMenu[category].map((dish) => (
            <article key={dish.name}>
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.detail}</p>
              </div>
              <strong>£{dish.price}</strong>
            </article>
          ))}
        </div>
        <p className="menu-allergens">
          Cooking for everyone matters. On a live visit, please tell the team
          about allergies or dietary requirements.
        </p>
      </section>
      <section id="our-table" className="restaurant-story">
        <div className="demo-wrap">
          <UtensilsCrossed size={46} />
          <h2>
            THE BEST NIGHTS
            <br />
            START WITH <em>“STAY A LITTLE.”</em>
          </h2>
          <p>
            Casa Ember is our love letter to the long dinner: another plate for
            the table, stories that get better with telling, and a kitchen that
            cooks from the heart.
          </p>
          <DemoAction
            label="Save your seat"
            title="Make an evening of it."
            kind="booking"
          />
        </div>
      </section>
      <footer className="restaurant-footer demo-wrap">
        <strong>CASA EMBER</strong>
        <span>Kitchen hours · Tue–Sun, 12–10pm</span>
        <a href="#menu">One more look at the menu ↗</a>
      </footer>
    </>
  );
}
