import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { UptimeLog, UptimeLogProps } from "./UptimeLog";

export default {
  title: "components/UptimeLog",
  component: UptimeLog,
  args: {
    displayName: "Weather display",
  },
} as Meta;

const Template: Story<UptimeLogProps> = (args) => <UptimeLog {...args} />;

export const Default = Template.bind({});
