import React from "react";

export interface UptimeLogProps {
  displayName: string;
}

export const UptimeLog: React.FC<UptimeLogProps> = ({
  displayName,
}: UptimeLogProps) => {
  return <div>{displayName}</div>;
};
