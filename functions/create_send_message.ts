import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

const _TOP_MESSAGE_LIST: Map<string, string> = new Map([
  ["channel_created", "新しいチャンネルが作成されました :clap:"],
  ["channel_renamed", "チャンネル名が変更されました :pencil2:"],
  ["channel_deleted", "チャンネルが削除されました :wastebasket:"],
  ["channel_archived", "チャンネルがアーカイブされました :headstone:"],
  ["channel_unarchived", "チャンネルがアーカイブから復元されました :superhero:"],
]);

const createMessage = (
  user_id: string,
  channel_id: string,
  event_type: string,
  channel_type: string,
): string => {
  const user = `実施者: <@${user_id}>`;
  const channel_name = `チャンネル名: <#${channel_id}>`;
  const _channel_type = `チャンネル種別: ${channel_type}`;
  const base_message = [channel_name, _channel_type, user].join("\n");
  const top_message = _TOP_MESSAGE_LIST.get(event_type);
  return `${top_message}\n\n${base_message}`;
};

export const CreateSendMessageFunction = DefineFunction({
  callback_id: "create_send_message",
  title: "Create Send Message",
  description: "Create Send Message",
  source_file: "functions/create_send_message.ts",
  input_parameters: {
    properties: {
      user_id: {
        type: Schema.types.string,
        description: "User ID",
      },
      channel_id: {
        type: Schema.types.string,
        description: "Channel ID",
      },
      event_type: {
        type: Schema.types.string,
        description: "Event Type",
      },
      channel_type: {
        type: Schema.types.string,
        description: "Channel Type",
      },
    },
    required: ["user_id", "channel_id", "event_type", "channel_type"],
  },
  output_parameters: {
    properties: {
      send_message: {
        type: Schema.types.string,
        description: "Send Message",
      },
    },
    required: ["send_message"],
  },
});

export default SlackFunction(
  CreateSendMessageFunction,
  ({ inputs }) => {
    const send_message = createMessage(
      inputs.user_id,
      inputs.channel_id,
      inputs.event_type,
      inputs.channel_type,
    );
    return { outputs: { send_message } };
  },
);
