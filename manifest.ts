import { Manifest } from "deno-slack-sdk/mod.ts";
import { workflow as ExampleWorkflow } from "./example.ts";

export default Manifest({
  name: "slack-channel-monitor",
  description: "slack channel notify",
  icon: "assets/default_new_app_icon.png",
  workflows: [ExampleWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "channels:read", "chat:write", "chat:write.public"],
});
