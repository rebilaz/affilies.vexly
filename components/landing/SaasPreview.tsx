// components/landing/SaasPreview.tsx
import React from "react";

function Icon({ name }: { name: "home" | "users" | "chart" }) {
  const cls = "h-4 w-4";
  if (name === "home")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 11l9-8 9 8" />
        <path d="M9 22V12h6v10" />
      </svg>
    );
  if (name === "users")
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 4 4 6-8" />
    </svg>
  );
}

function LineChart() {
  return (
    <div className="relative h-[180px] w-full">
      <svg viewBox="0 0 640 220" className="h-full w-full">
        {/* grid */}
        {[40, 85, 130, 175].map((y) => (
          <line key={y} x1="40" y1={y} x2="610" y2={y} stroke="rgba(15,23,42,0.06)" strokeWidth="2" />
        ))}

        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(99,102,241,0.18)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.02)" />
          </linearGradient>
          <linearGradient id="stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgb(99 102 241)" />
            <stop offset="100%" stopColor="rgb(139 92 246)" />
          </linearGradient>
        </defs>

        {/* area */}
        <path
          d="M40 170 C120 168, 160 140, 220 120 C300 92, 360 110, 420 120 C500 135, 540 120, 610 88 L610 190 L40 190 Z"
          fill="url(#area)"
        />
        {/* line */}
        <path
          d="M40 170 C120 168, 160 140, 220 120 C300 92, 360 110, 420 120 C500 135, 540 120, 610 88"
          fill="none"
          stroke="url(#stroke)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function KpiCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-medium text-slate-500">{label}</div>
        <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
          Live
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function SaasPreview() {
  return (
    <div className="pointer-events-none select-none">
      {/* Outer frame: subtler border + richer shadow */}
      <div className="rounded-[26px] border border-slate-200/80 bg-white shadow-[0_28px_70px_-40px_rgba(15,23,42,0.35)] overflow-hidden">
        <div className="grid grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="border-r border-slate-200 bg-white">
            <div className="flex items-center gap-3 px-6 py-5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-semibold">
                N
                <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-indigo-400/15 blur-md" />
              </span>
              <span className="text-sm font-semibold text-slate-900">Nexus</span>
            </div>

            <nav className="px-3 py-2 space-y-1">
              <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900">
                <span className="text-slate-600">
                  <Icon name="home" />
                </span>
                Overview
              </div>

              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
                <Icon name="users" />
                Customers
              </div>

              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600">
                <Icon name="chart" />
                Analytics
              </div>
            </nav>

            {/* subtle bottom fade */}
            <div className="pointer-events-none mt-8 h-10 w-full bg-gradient-to-b from-transparent to-slate-50" />
          </aside>

          {/* Main */}
          <main className="relative bg-slate-50">
            {/* soft background tint */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.10),transparent_60%)]" />

            {/* Topbar */}
            <div className="relative flex items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-5 backdrop-blur">
              <div className="text-sm font-semibold text-slate-900">Dashboard</div>
              <div className="text-xs font-medium text-slate-500">Oct 24, 2023</div>
            </div>

            <div className="relative px-8 py-7 space-y-6">
              {/* KPI cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <KpiCard label="Total Revenue" value="$124,500" />
                <KpiCard label="Active Subscribers" value="1,240" />
                <KpiCard label="Avg. Revenue Per User" value="$105" />
              </div>

              {/* Chart card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">Revenue Growth</div>
                    <div className="text-xs text-slate-500">Recurring revenue over the last 30 days</div>
                  </div>
                  <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                    Last 30d
                  </span>
                </div>
                <div className="mt-4">
                  <LineChart />
                </div>
              </div>

              {/* Table hint */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_1px_0_rgba(15,23,42,0.02)]">
                <div className="grid grid-cols-3 border-b border-slate-200 px-6 py-3 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                  <div>COMPANY</div>
                  <div className="text-center">STATUS</div>
                  <div className="text-right">VALUE</div>
                </div>

                {[
                  ["Acme Corp", "Active", "$8,240"],
                  ["Northwind", "Active", "$4,980"],
                  ["Globex", "Paused", "$1,120"],
                ].map(([c, s, v]) => (
                  <div key={c} className="grid grid-cols-3 px-6 py-4 text-sm">
                    <div className="flex items-center gap-3 font-medium text-slate-900">
                      <span className="h-7 w-7 rounded-full bg-slate-100" />
                      {c}
                    </div>
                    <div className="text-center">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium " +
                          (s === "Active"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-slate-50 text-slate-500")
                        }
                      >
                        {s}
                      </span>
                    </div>
                    <div className="text-right font-medium text-slate-900">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
