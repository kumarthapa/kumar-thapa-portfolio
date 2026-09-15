"use client";
import { motion } from "framer-motion";
import { Plus, Clock3 } from "lucide-react";
import type { Service } from "@/lib/types";
import { money } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add } from "@/store/cartSlice";
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const dispatch = useAppDispatch();
  const ready = useAppSelector((s) => s.cart.hydrated);
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className="service-image">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          width="1000"
          height="640"
        />
        <span>{service.category}</span>
      </div>
      <div className="service-body">
        <div className="delivery">
          <Clock3 size={14} />
          {service.delivery}
        </div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="service-bottom">
          <div>
            <span className="small-label">PACKAGE PRICE</span>
            <strong>{money(service.priceCents)}</strong>
          </div>
          <button
            disabled={!ready}
            className="add-button"
            onClick={() => dispatch(add(service))}
            aria-label={`Add ${service.name} to cart`}
          >
            <Plus size={19} />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
