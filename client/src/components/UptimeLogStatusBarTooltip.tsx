import React from "react";
import "./UptimeLogStatusBarTooltip.css";

export interface UptimeLogStatusBarTooltipProps {
  timestamp: number;
  status: number;
}

const formattedDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} - ${hour}:${minutes}`;
};

const classForStatus = (status: number): string => {
  if (status === 100) {
    return "status--indicator--ok";
  } else if (status > 0) {
    return "status--indicator--warn";
  }
  return "status--indicator--error";
};

export const UptimeLogStatusBarTooltip: React.FC<UptimeLogStatusBarTooltipProps> = ({
  timestamp,
  status,
}: UptimeLogStatusBarTooltipProps) => {
  return (
    <div className="container">
      <div className="pointer-container">
        <div className="pointer--large"></div>
        <div className="pointer--small"></div>
      </div>
      <div className="status-container">
        <div className={`status--indicator ${classForStatus(status)}`} />
        <div className="status--timestamp">{formattedDate(timestamp)}</div>
      </div>
    </div>
  );
};
