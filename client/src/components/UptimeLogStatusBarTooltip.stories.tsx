import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  UptimeLogStatusBarTooltip,
  UptimeLogStatusBarTooltipProps,
} from "./UptimeLogStatusBarTooltip";

export default {
  title: "components/UptimeLogStatusBarTooltip",
  component: UptimeLogStatusBarTooltip,
  args: {
    timestamp: Date.parse("2020-05-06"),
    status: 100,
  },
} as Meta;

const Template: Story<UptimeLogStatusBarTooltipProps> = (args) => (
  <UptimeLogStatusBarTooltip {...args} />
);

export const Default = Template.bind({});
