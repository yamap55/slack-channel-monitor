// -------------------------
// ワークフロー定義
// -------------------------
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

export const workflow = DefineWorkflow({
  callback_id: "example-workflow",
  title: "Example Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      channel_name: { type: Schema.types.string },
      channel_type: { type: Schema.types.string },
      creator_id: { type: Schema.slack.types.user_id },
      created: { type: Schema.types.string },
    },
    required: [
      "channel_id",
      "channel_name",
      "channel_type",
      "creator_id",
      "created",
    ],
  },
});

const convertStringFromDate = (unixtime) => {
  console.log(parseInt(unixtime, 10));
  const date = new Date(parseInt(unixtime, 10) * 1000);
  const zeroPadding = (s: number) => (`0${s}`).slice(-2);
  const year_str = date.getFullYear();
  //月だけ+1すること
  const month_str = zeroPadding(1 + date.getMonth());
  const day_str = zeroPadding(date.getDate());
  const hour_str = zeroPadding(date.getHours());
  const minute_str = zeroPadding(date.getMinutes());
  const second_str = zeroPadding(date.getSeconds());
  return `${year_str}/${month_str}/${day_str} ${hour_str}:${minute_str}:${second_str}`;
};
const createMessage = (inputs): string => {
  const creator = `作成者: <@${inputs.creator_id}>`;
  const channel_name = `チャンネル名: #${inputs.channel_name}`;
  const channel_type = `チャンネル種別: ${inputs.channel_type}`;
  // 作成日は「workflow.inputs.created」で文字列のunixtimeが取得可能だが、変換できなかったため割愛
  // 技術力不足かAPIのバグか
  // convertStringFromDate(inputs.created)
  return [creator, channel_name, channel_type].join("\n");
};
workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C04H8294NUB", // 既定のチャンネルに投稿する
  message: createMessage(workflow.inputs),
});
// -------------------------
// トリガー定義
// -------------------------
import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: "event",
  name: "Trigger the example workflow",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: { event_type: "slack#/events/channel_created" },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    channel_name: { value: "{{data.channel_name}}" },
    channel_type: { value: "{{data.channel_type}}" },
    creator_id: { value: "{{data.creator_id}}" },
    created: { value: "{{data.created}}" },
  },
};

export default trigger;
