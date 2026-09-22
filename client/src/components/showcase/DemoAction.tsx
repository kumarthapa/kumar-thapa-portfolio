"use client";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { localDateString } from "@/lib/localDate";

export function DemoAction({
  label,
  title,
  detail,
  kind = "enquiry",
  className = "",
}: {
  label: string;
  title: string;
  detail?: string;
  kind?: "booking" | "enquiry" | "trial";
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [preview, setPreview] = useState(false);
  const [today, setToday] = useState("");
  return (
    <>
      <button
        className={"demo-button " + className}
        onClick={() => {
          setPreview(false);
          setToday(localDateString());
          dialog.current?.showModal();
        }}
      >
        {label}
        <ArrowUpRight size={16} />
      </button>
      <dialog
        ref={dialog}
        className="demo-dialog"
        aria-labelledby={id}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close preview"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} />
        </button>
        <span className="demo-overline">INTERACTIVE CONCEPT</span>
        <h2 id={id}>{title}</h2>
        {detail && <p>{detail}</p>}
        {preview ? (
          <div className="demo-result" role="status">
            <Check size={30} />
            <h3>Your preview is ready.</h3>
            <p>
              On a live website, this step would send your request to the team.
              This is a demo: nothing has been sent, booked, or charged.
            </p>
            <button
              className="demo-button"
              onClick={() => dialog.current?.close()}
            >
              Back to the experience
            </button>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setPreview(true);
            }}
          >
            <p className="demo-form-note">
              Try the form with sample details. Information stays in this page
              and is not submitted.
            </p>
            <label>
              Your name
              <input
                name="name"
                autoComplete="off"
                required
                placeholder="Alex Morgan"
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                autoComplete="off"
                type="email"
                required
                placeholder="alex@example.com"
                maxLength={254}
              />
            </label>
            {kind === "booking" && (
              <label>
                Preferred date
                <input
                  type="date"
                  name="date"
                  min={today}
                  required
                />
              </label>
            )}
            {kind === "trial" && (
              <label>
                Workspace name
                <input
                  name="workspace"
                  required
                  placeholder="Studio North"
                  maxLength={100}
                />
              </label>
            )}
            <button className="demo-button" type="submit">
              Preview {kind === "trial" ? "workspace setup" : "request"}
              <ArrowUpRight size={16} />
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
