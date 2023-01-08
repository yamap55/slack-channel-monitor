import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateSendMessageFunction } from "../functions/create_send_message.ts";

import { GetNotifyChannelFunction } from "../functions/get_notify_channel.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "channel_monitor_workflow",
  title: "Channel Monitor Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
      event_type: { type: Schema.types.string },
      channel_type: { type: Schema.types.string },
    },
    required: [
      "channel_id",
      "user_id",
      "event_type",
      "channel_type",
    ],
  },
});

const message = NotifyWorkflow.addStep(
  CreateSendMessageFunction,
  {
    user_id: NotifyWorkflow.inputs.user_id,
    channel_id: NotifyWorkflow.inputs.channel_id,
    event_type: NotifyWorkflow.inputs.event_type,
    channel_type: NotifyWorkflow.inputs.channel_type,
  },
);

const notify_channel_id = NotifyWorkflow.addStep(GetNotifyChannelFunction, {});

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: notify_channel_id.outputs.notify_channel_id,
  message: message.outputs.send_message,
});

export default NotifyWorkflow;
