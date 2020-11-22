import React, { useState, useRef, useEffect } from "react";
import { UptimeLogStatusBarTooltip } from "./UptimeLogStatusBarTooltip";
import "./UptimeLog.css";

export interface UptimeDataPoint {
  timestamp: number;
  status: number;
}

export interface UptimeLogProps {
  displayName: string;
  data: UptimeDataPoint[];
}

const STATUS_BAR_WIDTH = 10;
const STATUS_BAR_PAD = 5;
const STATUS_BAR_STRIDE = STATUS_BAR_WIDTH + STATUS_BAR_PAD;
const STATUS_BAR_HEIGHT = 75;

const svgViewBox = (numDataPoints: number): string => {
  const width = STATUS_BAR_STRIDE * numDataPoints;
  const height = STATUS_BAR_HEIGHT;

  return `0 0 ${width} ${height}`;
};

const classForStatus = (status: number): string => {
  if (status === 100) {
    return "status-bar--ok";
  } else if (status > 0) {
    return "status-bar--warn";
  }
  return "status-bar--error";
};

export const UptimeLog: React.FC<UptimeLogProps> = ({
  displayName,
  data,
}: UptimeLogProps) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<number | null>(
    null
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const rectRefs = data.map(() => useRef<SVGRectElement>(null));

  useEffect(() => {
    rectRefs.forEach((rectRef, index) => {
      const onMouseOver = () => setSelectedDataPoint(index);
      const onMouseOut = () => setSelectedDataPoint(null);

      const node = rectRef.current;
      if (node) {
        node.addEventListener("mouseover", onMouseOver);
        node.addEventListener("mouseout", onMouseOut);

        return () => {
          node.removeEventListener("mouseover", onMouseOver);
          node.removeEventListener("mouseout", onMouseOut);
        };
      }
    });
  });

  let offset = 0;
  if (selectedDataPoint !== null) {
    const svgElement = svgRef.current;
    const rectElement = rectRefs[selectedDataPoint].current;
    if (svgElement && rectElement) {
      const svgDimensions = svgElement.getBoundingClientRect();
      const rectDimensions = rectElement.getBoundingClientRect();

      offset = rectDimensions.x + rectDimensions.width / 2 - svgDimensions.x;
    }
  }

  return (
    <div>
      <div className="header">
        <div className="header--name">{displayName}</div>
        <div className="header--status header--status--ok">Operational</div>
      </div>
      <div className="status-bars-container">
        <svg ref={svgRef} viewBox={svgViewBox(data.length)}>
          {data.map(({ timestamp, status }, index) => (
            <rect
              ref={rectRefs[index]}
              key={timestamp}
              className={classForStatus(status)}
              x={index * STATUS_BAR_STRIDE}
              y="0"
              width={STATUS_BAR_WIDTH}
              height={STATUS_BAR_HEIGHT}
            />
          ))}
        </svg>
        {selectedDataPoint !== null && (
          <div className="tooltip-container" style={{ left: offset }}>
            <UptimeLogStatusBarTooltip {...data[selectedDataPoint]} />
          </div>
        )}
      </div>
      <div className="status-meta">
        <div>8 hours</div>
        <div className="status-meta--line" />
        <div>Now</div>
        <div className="status-meta--uptime">100 % uptime</div>
      </div>
    </div>
  );
};
