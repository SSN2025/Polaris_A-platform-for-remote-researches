"use client";

import { useState } from "react";

const stations = [
  {
    id: "maitri",
    name: "MAITRI",
    location: "Schirmacher Oasis",
    lat: "70°45′S",
    lon: "11°44′E",
    temp: "-18°C",
    wind: "24 km/h",
    status: "ACTIVE",
    x: "38%",
    y: "43%",
  },
  {
    id: "bharati",
    name: "BHARATI",
    location: "Larsemann Hills",
    lat: "69°24′S",
    lon: "76°11′E",
    temp: "-21°C",
    wind: "31 km/h",
    status: "ACTIVE",
    x: "64%",
    y: "50%",
  },
  {
    id: "dakshin",
    name: "DAKSHIN GANGOTRI",
    location: "Queen Maud Land",
    lat: "70°05′S",
    lon: "12°00′E",
    temp: "-22°C",
    wind: "27 km/h",
    status: "ARCHIVED",
    x: "43%",
    y: "32%",
  },
  {
    id: "network",
    name: "POLAR NETWORK",
    location: "Antarctic Region",
    lat: "78°S",
    lon: "24°E",
    temp: "-26°C",
    wind: "36 km/h",
    status: "MONITORING",
    x: "51%",
    y: "67%",
  },
];

export default function StationMonitor() {
  const [activeStation, setActiveStation] = useState(stations[0]);

  return (
    <>
      <div className="station-layer">
        {stations.map((station) => (
          <button
            key={station.id}
            className={`station-node ${
              activeStation.id === station.id ? "active" : ""
            }`}
            style={{ left: station.x, top: station.y }}
            onClick={() => setActiveStation(station)}
          >
            <span className="station-pulse" />
            <span className="station-dot" />
            <span className="station-label">
              <strong>{station.name}</strong>
              <small>{station.location}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="monitoring-panel">
        <div className="panel-top">
          <span>SELECTED STATION</span>
          <span
            className={`status ${
              activeStation.status === "ARCHIVED" ? "archived" : ""
            }`}
          >
            <i />
            {activeStation.status}
          </span>
        </div>

        <h3>{activeStation.name}</h3>
        <p>{activeStation.location}</p>

        <div className="station-coordinates">
          <span>{activeStation.lat}</span>
          <span>{activeStation.lon}</span>
        </div>

        <div className="station-metrics">
          <div>
            <span>TEMP</span>
            <strong>{activeStation.temp}</strong>
          </div>
          <div>
            <span>WIND</span>
            <strong>{activeStation.wind}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
