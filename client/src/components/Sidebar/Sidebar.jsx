import React from "react";
import "./Sidebar.css";

const projects = [
  { id: 1, name: "ERP Sistemi" },
  { id: 2, name: "CRM Sistemi" },
  { id: 3, name: "Wiky Watch Mobile" },
  { id: 4, name: "Wiky Watch Web" },
  { id: 5, name: "Just English Mobile" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Projeler</h2>
      <ul className="sidebar__list">
        {projects.map((project) => (
          <li key={project.id} className="sidebar__item" tabIndex={0}>
            <span className="sidebar__item-icon">#</span>
            <span className="sidebar__item-name">{project.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
