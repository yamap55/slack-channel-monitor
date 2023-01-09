import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

const { createContext } = SlackFunctionTester("my-function");

import get_notify_channel from "../../functions/get_notify_channel.ts";

Deno.test("Normal Case", async () => {
  const env = { NOTIFY_CHANNEL_ID: "notify_channel_id_a" };
  const { outputs } = await get_notify_channel(createContext({ inputs: {}, env }));
  const actual = outputs?.notify_channel_id;
  const expected = "notify_channel_id_a";
  assertEquals(actual, expected);
});
