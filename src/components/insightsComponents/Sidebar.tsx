import React from "react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>BMHE Analytics</h2>
      <nav>
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/insights">Insights</a></li>
        </ul>
      </nav>
    </aside>
  );
}
