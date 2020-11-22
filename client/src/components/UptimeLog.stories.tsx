import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { UptimeLog, UptimeLogProps, UptimeDataPoint } from "./UptimeLog";

function getFakeData(numDataPoints: number, status = 100): UptimeDataPoint[] {
  function addMinutes(date: Date, minutes: number) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + minutes
    ).getTime();
  }

  const date = new Date(2020, 10, 1);

  return [...Array(numDataPoints).keys()].map((index) => ({
    timestamp: addMinutes(date, 15 * index),
    status,
  }));
}

export default {
  title: "components/UptimeLog",
  component: UptimeLog,
  args: {
    displayName: "Weather display",
    data: getFakeData(30),
  },
} as Meta;

const Template: Story<UptimeLogProps> = (args) => <UptimeLog {...args} />;

export const Default = Template.bind({});

export const WithWarningsAndErrors = Template.bind({});
WithWarningsAndErrors.args = {
  data: [...getFakeData(10, 0), ...getFakeData(10, 80), ...getFakeData(10)],
};
