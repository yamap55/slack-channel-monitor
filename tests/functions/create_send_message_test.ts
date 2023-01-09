import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

const { createContext } = SlackFunctionTester("my-function");

import create_send_message from "../../functions/create_send_message.ts";

Deno.test("Normal Case", async () => {
  const inputs = {
    user_id: "user_id_1",
    channel_id: "channel_id_1",
    event_type: "channel_created",
    channel_type: "channel_type",
  };
  const { outputs } = await create_send_message(createContext({ inputs }));
  const actual = outputs?.send_message;
  const expected = `新しいチャンネルが作成されました :clap:

チャンネル名: <#channel_id_1>
チャンネル種別: channel_type
実施者: <@user_id_1>`;
  assertEquals(actual, expected);
});
