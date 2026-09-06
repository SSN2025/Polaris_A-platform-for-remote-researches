"use client";

import { useEffect, useState } from "react";

const nodes = [
  {
    name: "Research Station",
    type: "MAITRI",
    x: "49%",
    y: "39%",
    active: true,
  },
  {
    name: "Satellite Link",
    type: "ORBITAL",
    x: "30%",
    y: "49%",
    active: true,
  },
  {
    name: "Sensor Node",
    type: "FIELD SENSOR",
    x: "69%",
    y: "53%",
    active: true,
  },
  {
    name: "Observation",
    type: "FIELD DATA",
    x: "51%",
    y: "69%",
    active: true,
  },
];

export default function Monitoring() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((current) => (current + 1) % nodes.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="monitoring-section" id="monitoring">

      <div className="monitoring-container">

        {/* Left vertical statement */}
        <div className="monitoring-side-text">
          <span>A</span>
          <span>CLEARER</span>
          <span>SAFER</span>
          <span>PLANET</span>
          <span>BEGINS</span>
          <span>WITH</span>
          <span>UNDERSTANDING</span>

          <div className="monitoring-side-line" />
        </div>

        {/* Antarctic visualization */}
        <div className="monitoring-map">

          <div className="map-stars" />

          <div className="monitor-ring ring-1" />
          <div className="monitor-ring ring-2" />
          <div className="monitor-ring ring-3" />

          <div className="continent-container">

            <div className="continent-light" />

            <svg
              viewBox="0 0 500 430"
              className="monitor-continent"
              aria-label="Stylized Antarctic monitoring map"
            >
              <path
                d="
                  M248 20
                  C226 36 207 48 183 70
                  C159 91 134 112 118 139
                  C101 166 79 190 73 219
                  C67 249 84 269 106 288
                  C130 308 138 335 166 353
                  C192 369 214 397 242 402
                  C268 407 287 385 311 373
                  C337 360 364 351 378 326
                  C393 299 420 279 427 251
                  C434 223 414 201 398 177
                  C383 153 373 122 348 98
                  C324 75 290 45 248 20
                  Z
                "
                fill="rgba(201, 232, 239, 0.24)"
                stroke="rgba(174, 229, 239, 0.75)"
                strokeWidth="1.5"
              />

              <path
                d="
                  M139 132
                  C190 112 266 116 343 148
                "
                fill="none"
                stroke="rgba(177, 226, 237, 0.4)"
                strokeWidth="1"
              />

              <path
                d="
                  M103 204
                  C177 181 290 188 398 221
                "
                fill="none"
                stroke="rgba(177, 226, 237, 0.35)"
                strokeWidth="1"
              />

              <path
                d="
                  M116 268
                  C193 243 300 253 389 287
                "
                fill="none"
                stroke="rgba(177, 226, 237, 0.3)"
                strokeWidth="1"
              />

              <path
                d="
                  M184 76
                  C177 143 187 220 207 298
                "
                fill="none"
                stroke="rgba(177, 226, 237, 0.22)"
                strokeWidth="1"
              />

              <path
                d="
                  M272 60
                  C261 140 270 226 292 340
                "
                fill="none"
                stroke="rgba(177, 226, 237, 0.22)"
                strokeWidth="1"
              />
            </svg>

          </div>

          {/* Data nodes */}
          {nodes.map((node, index) => (
            <button
              key={node.name}
              type="button"
              className={`monitor-node ${
                activeNode === index ? "node-active" : ""
              }`}
              style={{
                left: node.x,
                top: node.y,
              }}
              onClick={() => setActiveNode(index)}
              aria-label={`View ${node.name}`}
            >
              <span className="node-wave" />
              <span className="node-point" />

              <span className="node-info">
                <strong>{node.name}</strong>
                <small>{node.type}</small>
              </span>
            </button>
          ))}

          <div className="map-data-readout">
            <span>POLARIS NETWORK</span>
            <strong>LIVE</strong>
          </div>

        </div>

        {/* Right information panel */}
        <div className="monitoring-content">

          <div className="monitoring-kicker">
            <span />
            REAL-TIME MONITORING
          </div>

          <h2>
            A Clearer View
            <br />
            <em>of Tomorrow.</em>
          </h2>

          <p>
            Integrating satellite, sensor and human observations to deliver
            accurate local forecasts and early warnings.
          </p>

          <div className="monitoring-line" />

          <div className="monitoring-stats">

            <div>
              <strong>50+</strong>
              <span>ACTIVE SENSORS</span>
            </div>

            <div>
              <strong>3</strong>
              <span>RESEARCH STATIONS</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>LIVE DATA</span>
            </div>

          </div>

          <div className="monitoring-status">
            <span className="live-indicator" />
            <span>NETWORK OPERATIONAL</span>
          </div>

        </div>

      </div>

    </section>
  );
}