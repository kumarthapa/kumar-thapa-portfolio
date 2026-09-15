import type { Metadata } from "next";
import LetsTalk from "./letstalk";

export const metadata: Metadata = {
  title: "Let’s talk — KUMARTHAPA",
  description:
    "Tell us about your next project. Let’s bring your design, development, or cloud infrastructure idea to life.",
};

export default function ContactPage() {
  return <LetsTalk />;
}
