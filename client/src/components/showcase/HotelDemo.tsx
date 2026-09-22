"use client";
import { useEffect, useState } from "react";
import { localDateString } from "@/lib/localDate";
import {
  ArrowDown,
  ArrowRight,
  Mountain,
  Coffee,
  Waves,
  Trees,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { lodgeRooms } from "@/content/demo-content";
import { DemoAction } from "./DemoAction";
export function HotelDemo() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [selection, setSelection] = useState("");
  const [error, setError] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => setToday(localDateString()), []);
  return (
    <>
      <section className="hotel-hero">
        <AssetImage asset={visuals.hotel} priority sizes="100vw" />
        <nav className="demo-nav hotel-nav" aria-label="Stillwater navigation">
          <a href="#stillwater-home" className="demo-brand">
            <Mountain size={24} /> STILLWATER<span>AN ALPINE RETREAT</span>
          </a>
          <div>
            <a href="#stay">Stay</a>
            <a href="#experience">Experience</a>
          </div>
          <a href="#availability" className="demo-button">
            Find your escape <ArrowRight size={15} />
          </a>
        </nav>
        <div className="hotel-hero-copy" id="stillwater-home">
          <span className="demo-overline">
            A WORLD AWAY. RIGHT WHERE YOU BELONG.
          </span>
          <h1>
            Stay a little closer
            <br />
            to <em>nature.</em>
          </h1>
          <p>Quiet mornings. Mountain air. Nothing you need to rush.</p>
          <a
            href="#stay"
            className="hotel-down"
            aria-label="Discover the lodge"
          >
            <ArrowDown size={24} />
          </a>
        </div>
        <span className="hotel-coordinate">
          THE LAKE. THE MOUNTAINS. YOUR OWN PACE.
        </span>
      </section>
      <form
        id="availability"
        className="hotel-booking demo-wrap"
        onSubmit={(event) => {
          event.preventDefault();
          if (departure <= arrival) {
            setError("Check-out must be after check-in.");
            setSelection("");
            return;
          }
          setError("");
          setSelection(
            arrival + " to " + departure + " · " + guests + (guests === "1" ? " guest" : " guests"),
          );
          document
            .getElementById("stay")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <label>
          CHECK IN
          <input
            aria-label="Check in"
            required
            type="date"
            min={today}
            value={arrival}
            onChange={(event) => {
              setArrival(event.target.value);
              setSelection("");
            }}
          />
        </label>
        <label>
          CHECK OUT
          <input
            aria-label="Check out"
            required
            type="date"
            min={arrival || today}
            value={departure}
            onChange={(event) => {
              setDeparture(event.target.value);
              setSelection("");
            }}
          />
        </label>
        <label>
          GUESTS
          <select
            value={guests}
            onChange={(event) => {
              setGuests(event.target.value);
              setSelection("");
            }}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
          </select>
        </label>
        <button className="demo-button">
          Explore your stay <ArrowRight size={16} />
        </button>
        {error && (
          <p className="booking-message" role="alert">
            {error}
          </p>
        )}
      </form>
      <section className="hotel-intro demo-wrap" id="experience">
        <span className="demo-overline">LET THE LANDSCAPE SET THE PACE</span>
        <h2>
          Not much on the agenda.
          <br />
          <em>Everything to look forward to.</em>
        </h2>
        <p>
          Hidden between the forest and the water, Stillwater is a small
          mountain retreat for days that feel a little longer. Come for the
          view. Stay for how it makes you feel.
        </p>
        <div className="hotel-amenities">
          {[
            [Trees, "Trails from the doorstep"],
            [Waves, "A pool with a panorama"],
            [Coffee, "Slow, seasonal breakfasts"],
          ].map(([Icon, label]) => {
            const Symbol = Icon as typeof Trees;
            return (
              <div key={String(label)}>
                <Symbol size={23} />
                {String(label)}
              </div>
            );
          })}
        </div>
      </section>
      <section id="stay" className="hotel-rooms demo-wrap">
        <div className="demo-section-heading">
          <div>
            <span className="demo-overline">ROOM TO EXHALE</span>
            <h2>Your own quiet corner.</h2>
          </div>
          <p>
            Natural textures. Considered comforts.
            <br />
            Views that do the talking.
          </p>
        </div>
        {selection && (
          <p className="availability-result" role="status">
            Previewing stays for {selection}. These are sample room options;
            live availability is not connected.
          </p>
        )}
        <div className="hotel-room-grid">
          {lodgeRooms.map((room, i) => (
            <article key={room.name}>
              <div className={"hotel-room-image room-" + i}>
                <AssetImage
                  asset={room.visual}
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <span>{i === 0 ? "BY THE WATER" : "AMONG THE TREES"}</span>
              </div>
              <div>
                <span className="demo-overline">{room.detail}</span>
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="room-bottom">
                  <span>
                    From <strong>£{room.price}</strong> / night
                  </span>
                  <DemoAction
                    label="Explore this stay"
                    title={room.name}
                    detail={
                      (selection ? selection + " · " : "") +
                      "From £" +
                      room.price +
                      " per night · Concept pricing"
                    }
                    kind="booking"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="hotel-footer">
        <Mountain size={30} />
        <span>STILLWATER</span>
        <p>Find a little distance from the everyday.</p>
        <a href="#availability">Your next quiet moment ↑</a>
      </footer>
    </>
  );
}
