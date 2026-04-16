"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const summaryCards = [
  {
    title: "Published Stories",
    value: "128",
    note: "12 approvals cleared since morning review",
    delta: "+12.6%",
    icon: "story",
  },
  {
    title: "Live Readers",
    value: "48.2k",
    note: "Homepage traffic is holding above daily average",
    delta: "+8.4%",
    icon: "users",
  },
  {
    title: "Pending Reviews",
    value: "09",
    note: "Editorial checks lined up for the next publish slot",
    delta: "Queue",
    icon: "review",
  },
  {
    title: "Comment Reports",
    value: "17",
    note: "Moderation flags dropped compared to yesterday",
    icon: "alert",
  },
];

const activityItems = [
  {
    title: "Homepage lead updated with subsidy tracker",
    detail: "National desk pushed the morning policy explainer live.",
    time: "2 min ago",
  },
  {
    title: "Breaking alert approved for charging infra story",
    detail: "Push notification is queued for the noon audience slot.",
    time: "14 min ago",
  },
  {
    title: "Comments moderation batch completed",
    detail: "17 flagged comments were reviewed and resolved.",
    time: "31 min ago",
  },
  {
    title: "State roundup scheduled for evening publish",
    detail: "North desk finished cross-checking local input.",
    time: "1 hr ago",
  },
];

const publishingQueue = [
  {
    id: "Lead 01",
    title: "Charging tariff comparison for metro cities",
    owner: "Akshay",
    status: "Ready",
  },
  {
    id: "Story 02",
    title: "Battery recycling startup funding snapshot",
    owner: "Ishita",
    status: "Editing",
  },
  {
    id: "Wrap 03",
    title: "State EV policy roundup for homepage rail",
    owner: "Udit",
    status: "Review",
  },
];

const deskHealth = [
  { label: "Publishing target", value: 84 },
  { label: "Reader retention", value: 72 },
  { label: "Moderation backlog", value: 38 },
];

const collaborators = [
  {
    name: "Akshay",
    task: "Final headlines for policy explainer",
    status: "Writing",
  },
  {
    name: "Ishita",
    task: "Building charging station summary card",
    status: "Designing",
  },
  {
    name: "Udit",
    task: "Checking state desk figures before publish",
    status: "Reviewing",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || user.role !== "super_admin") {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="dashboard-home">
      <section className="cards">
        {summaryCards.map((card) => (
          <article key={card.title} className="card">
            <div className="dashboard-card-head">
              <div>
                <h4>{card.title}</h4>
                <p>{card.value}</p>
              </div>
            </div>
            <small>{card.note}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-overview-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <p className="section-tag">Live feed</p>
              <h2>Recent activity</h2>
              <p className="dashboard-panel-copy">
                Latest dashboard updates simple list format me dikh rahe hain.
              </p>
            </div>
          </div>
          <div className="dashboard-activity-list">
            {activityItems.map((item) => (
              <article key={item.title} className="dashboard-activity-item">
                <span className="dashboard-activity-icon" />
                <div className="dashboard-activity-copy">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <span>{item.time}</span>
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <p className="section-tag">Publishing queue</p>
              <h2>Upcoming work</h2>
            </div>
            <span className="dashboard-chip">3 items</span>
          </div>

          <div className="dashboard-task-list">
            {publishingQueue.map((item) => (
              <article key={item.id} className="dashboard-task-item">
                <div>
                  <span className="dashboard-task-id">{item.id}</span>
                  <strong>{item.title}</strong>
                  <p>Owner: {item.owner}</p>
                </div>
                <span className="dashboard-inline-chip">{item.status}</span>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-panel dashboard-performance-panel">
          <div className="dashboard-panel-head">
            <div>
              <p className="section-tag">Desk health</p>
              <h2>Performance status</h2>
              <p className="dashboard-panel-copy">
                Compact progress bars me quick summary.
              </p>
            </div>
          </div>

          <div className="dashboard-health-list">
            {deskHealth.map((item) => (
              <div key={item.label} className="dashboard-health-row">
                <div className="dashboard-health-meta">
                  <strong>{item.label}</strong>
                  <span>{item.value}%</span>
                </div>
                <div className="dashboard-progress-track">
                  <span style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <p className="section-tag">Team</p>
              <h2>Current assignments</h2>
            </div>
          </div>

          <div className="dashboard-collaboration-list">
            {collaborators.map((item) => (
              <article key={item.name} className="dashboard-collaboration-item">
                <div className="dashboard-person-cell">
                  <span className="dashboard-person-avatar">
                    {getInitials(item.name)}
                  </span>
                  <div className="dashboard-person-meta">
                    <strong className="dashboard-table-title">{item.name}</strong>
                    <p>{item.task}</p>
                  </div>
                </div>
                <span className="dashboard-inline-chip">{item.status}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
