import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/channel_monitor.ts";

const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Channel Archived Trigger",
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  event: { event_type: "slack#/events/channel_archived" },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    user_id: { value: "{{data.user_id}}" },
    event_type: { value: "channel_archived" },
    channel_type: { value: "{{data.channel_type}}" },
  },
};

export default trigger;
