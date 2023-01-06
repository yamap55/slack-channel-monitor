import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateSendMessageFunction } from "../functions/create_send_message.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "channel_monitor_workflow",
  title: "Channel Monitor Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
      event_type: { type: Schema.types.string },
    },
    required: [
      "channel_id",
      "user_id",
      "event_type",
    ],
  },
});

const message = NotifyWorkflow.addStep(
  CreateSendMessageFunction,
  {
    user_id: NotifyWorkflow.inputs.user_id,
    channel_id: NotifyWorkflow.inputs.channel_id,
    event_type: NotifyWorkflow.inputs.event_type,
  },
);

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C04H8294NUB", // 既定のチャンネルに投稿する
  message: message.outputs.send_message,
});

export default NotifyWorkflow;
