import React from "react";

export default function VehicleCard({ icon, label, onClick }) {
  return (
    <button className="vehicle-card" onClick={onClick}>
      <div className="vehicle-card-icon">{icon}</div>
      <div className="vehicle-card-label">{label}</div>
    </button>
  );
}
