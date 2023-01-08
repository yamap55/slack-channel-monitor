import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const GetNotifyChannelFunction = DefineFunction({
  callback_id: "get_notify_channel",
  title: "Get Notify Channel",
  description: "Get Notify Channel",
  source_file: "functions/get_notify_channel.ts",
  output_parameters: {
    properties: { notify_channel_id: { type: Schema.types.string, description: "Channel ID" } },
    required: ["notify_channel_id"],
  },
});
export default SlackFunction(
  GetNotifyChannelFunction,
  ({ env }) => {
    return { outputs: { notify_channel_id: env.NOTIFY_CHANNEL_ID } };
  },
);
