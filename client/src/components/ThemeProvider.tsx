"use client";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Moon, Sun, Waves } from "lucide-react";
export type Theme = "white" | "blue" | "black";
const storageKey = "kumarthapa-theme";
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: "white", setTheme: () => {} });
const isTheme = (value: unknown): value is Theme =>
  value === "white" || value === "blue" || value === "black";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, updateTheme] = useState<Theme>("white");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (isTheme(saved)) updateTheme(saved);
    } catch {}
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey)
        updateTheme(isTheme(event.newValue) ? event.newValue : "white");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function setTheme(value: Theme) {
    updateTheme(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {}
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}
const themeOptions = [
  { value: "white", label: "White", description: "Clean & bright", icon: Sun },
  { value: "blue", label: "Blue", description: "Cool & focused", icon: Waves },
  { value: "black", label: "Black", description: "Soft & minimal", icon: Moon },
] as const;

export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const current = themeOptions.find((option) => option.value === theme)!;
  const ThemeIcon = current.icon;

  useEffect(() => {
    if (!open) return;
    menuRef.current
      ?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
      ?.focus();
    function dismiss(event: PointerEvent) {
      if (!controlRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      className="theme-control"
      ref={controlRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="theme-trigger"
        aria-label={`Color theme: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <ThemeIcon className="theme-trigger-icon" size={17} aria-hidden="true" />
        <span className="theme-trigger-label">{current.label}</span>
        <ChevronDown className="theme-chevron" size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className="theme-panel">
          <div className="theme-panel-heading">
            <span id={`${menuId}-label`}>Appearance</span>
            <p>Choose your color theme.</p>
          </div>
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-labelledby={`${menuId}-label`}
            className="theme-options"
            onKeyDown={(event) => {
              const items = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                  '[role="menuitemradio"]',
                ),
              );
              const index = items.indexOf(
                document.activeElement as HTMLButtonElement,
              );
              let next = -1;
              if (event.key === "ArrowDown") next = (index + 1) % items.length;
              else if (event.key === "ArrowUp")
                next = (index - 1 + items.length) % items.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = items.length - 1;
              else if (
                event.key.length === 1 &&
                !event.altKey && !event.ctrlKey && !event.metaKey
              ) {
                for (let offset = 1; offset <= items.length; offset++) {
                  const candidate = (index + offset) % items.length;
                  if (themeOptions[candidate].label.toLowerCase()
                    .startsWith(event.key.toLowerCase())) {
                    next = candidate;
                    break;
                  }
                }
              }
              if (next !== -1) {
                event.preventDefault();
                items[next]?.focus();
              }
            }}
          >
            {themeOptions.map(({ value, label, description }) => (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={theme === value}
                aria-labelledby={`${menuId}-${value}-label`}
                aria-describedby={`${menuId}-${value}-description`}
                tabIndex={-1}
                className="theme-option"
                onClick={() => {
                  setTheme(value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <span
                  className={`theme-preview theme-preview-${value}`}
                  aria-hidden="true"
                >
                  <span className="theme-preview-bar" />
                  <span className="theme-preview-content">
                    <span />
                    <span />
                  </span>
                </span>
                <span className="theme-option-copy">
                  <span
                    id={`${menuId}-${value}-label`}
                    className="theme-option-name"
                  >
                    {label}
                  </span>
                  <span
                    id={`${menuId}-${value}-description`}
                    className="theme-option-description"
                  >
                    {description}
                  </span>
                </span>
                <span className="theme-option-check" aria-hidden="true">
                  {theme === value && <Check size={12} strokeWidth={2.5} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
