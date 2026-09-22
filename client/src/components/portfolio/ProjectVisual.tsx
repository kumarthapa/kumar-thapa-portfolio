import type { CSSProperties } from "react";
import {
  Radio,
  Truck,
  Package,
  Factory,
  Receipt,
  Layers3,
  Search,
  Bell,
  LayoutDashboard,
  BarChart3,
  Settings2,
  CircleCheck,
} from "lucide-react";
import type { Project } from "@/content/portfolio";
import { AssetImage } from "./AssetImage";

const icons = {
  manufacturing: Factory,
  tracking: Radio,
  fleet: Truck,
  billing: Receipt,
  inventory: Package,
  integrated: Layers3,
};
const dashboardCopy = {
  manufacturing: {
    name: "FactoryOS",
    title: "Production overview",
    metrics: ["In production", "Quality review", "Ready to dispatch"],
    values: ["128", "16", "42"],
    rows: [
      "Comfort Hybrid · Batch A",
      "Cloud Rest · Batch B",
      "Essential Foam · Batch C",
    ],
    states: ["Assembly", "Quality check", "Dispatch ready"],
  },
  tracking: {
    name: "Trace",
    title: "Asset control center",
    metrics: ["Registered assets", "In use", "Service due"],
    values: ["248", "186", "8"],
    rows: [
      "Handheld scanner · SC-012",
      "Test equipment · TE-008",
      "Tool cabinet · TC-004",
    ],
    states: ["Warehouse A", "Production", "Maintenance"],
  },
  fleet: {
    name: "Fleetwise",
    title: "Dispatch overview",
    metrics: ["On route", "Available", "In maintenance"],
    values: ["12", "6", "2"],
    rows: [
      "North depot → City center",
      "Warehouse → East district",
      "South hub → Airport",
    ],
    states: ["On route", "Loading", "Scheduled"],
  },
  billing: {
    name: "Ledger",
    title: "Sales workspace",
    metrics: ["Draft invoices", "Awaiting payment", "Paid this week"],
    values: ["6", "12", "34"],
    rows: [
      "INV-1042 · North Studio",
      "INV-1041 · Cedar Works",
      "INV-1040 · Field Supply",
    ],
    states: ["Paid", "Pending", "Draft"],
  },
  inventory: {
    name: "Stockroom",
    title: "Inventory overview",
    metrics: ["Active products", "Low stock", "Purchase orders"],
    values: ["186", "8", "12"],
    rows: [
      "Packing cartons · A-12",
      "Cotton fabric · B-04",
      "Foam sheets · C-08",
    ],
    states: ["In stock", "Reorder", "In stock"],
  },
  integrated: {
    name: "Connect",
    title: "Retail operations",
    metrics: ["Items scanned", "Ready to bill", "Needs review"],
    values: ["24", "22", "2"],
    rows: ["Scan items", "Review basket", "Invoice & update stock"],
    states: ["Connected", "Ready", "Synced"],
  },
};

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual)
    return (
      <AssetImage
        asset={project.visual}
        className="project-asset"
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    );
  const Icon = icons[project.dashboard];
  const data = dashboardCopy[project.dashboard];
  return (
    <div
      className={`project-visual visual-${project.dashboard}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div
        className="dashboard-preview"
        role="img"
        aria-label={`${project.title} interface concept with illustrative sample data`}
      >
        <aside className="dash-sidebar">
          <strong>
            <Icon size={16} />
            {data.name}
          </strong>
          <span className="dash-active">
            <LayoutDashboard />
            Overview
          </span>
          <span>
            <Package />
            Workspace
          </span>
          <span>
            <BarChart3 />
            Reports
          </span>
          <span>
            <Settings2 />
            Settings
          </span>
          <small>WORKSPACE DEMO</small>
        </aside>
        <div className="dash-main">
          <div className="dash-top">
            <span>Workspace / Overview</span>
            <Search size={10} />
            <Bell size={10} />
            <i>KT</i>
          </div>
          <div className="dash-heading">
            <strong>{data.title}</strong>
            <span>Sample data</span>
          </div>
          <div className="dash-metrics">
            {data.metrics.map((metric, i) => (
              <div key={metric}>
                <span>{metric}</span>
                <strong>{data.values[i]}</strong>
                <small>Sample workspace</small>
              </div>
            ))}
          </div>
          {project.dashboard === "fleet" ? (
            <div className="dash-map">
              <svg viewBox="0 0 440 150" aria-hidden="true">
                <rect width="440" height="150" fill="#e8f0ea" />
                <path
                  d="M0 40H440M0 90H440M65 0V150M165 0V150M270 0V150M365 0V150"
                  stroke="white"
                  strokeWidth="14"
                />
                <path
                  d="M0 125 Q150 100 225 30 T440 18"
                  stroke="#b1d3e9"
                  strokeWidth="25"
                  fill="none"
                />
                <path
                  d="M65 120 V40 H270 V90 H365"
                  stroke="#3789f7"
                  strokeWidth="4"
                  strokeDasharray="7 4"
                  fill="none"
                />
                {[
                  [65, 120],
                  [270, 40],
                  [365, 90],
                ].map(([x, y]) => (
                  <g key={x}>
                    <circle cx={x} cy={y} r="12" fill="#1476df" />
                    <circle cx={x} cy={y} r="4" fill="white" />
                  </g>
                ))}
              </svg>
              <span>Route planning · concept map</span>
            </div>
          ) : project.dashboard === "tracking" ? (
            <div className="dash-zones">
              {["Warehouse A", "Production floor", "Dispatch bay"].map(
                (zone, i) => (
                  <div key={zone}>
                    <Radio size={23} />
                    <strong>{zone}</strong>
                    <span>
                      {
                        [
                          "Reader online",
                          "Assets assigned",
                          "Movement recorded",
                        ][i]
                      }
                    </span>
                    <i />
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="dash-chart">
              <strong>
                {project.dashboard === "billing"
                  ? "Weekly invoice activity"
                  : project.dashboard === "inventory"
                    ? "Stock movement"
                    : "Activity this week"}
              </strong>
              <div className="chart-bars">
                {[35, 62, 48, 85, 68, 92, 74, 57, 80, 94, 76, 89].map(
                  (height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
              <div className="chart-days">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
              </div>
            </div>
          )}
          <div className="dash-table">
            <div>
              <strong>Recent activity</strong>
              <span>Status</span>
            </div>
            {data.rows.map((row, i) => (
              <div key={row}>
                <span>{row}</span>
                <em>{data.states[i]}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hardware-badge">
        <Icon size={25} />
        <div>
          <strong>{project.category}</strong>
          <span>
            <CircleCheck size={10} /> Interface concept
          </span>
        </div>
      </div>
    </div>
  );
}
