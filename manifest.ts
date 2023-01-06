import { Manifest } from "deno-slack-sdk/mod.ts";
import NotifyWorkflow from "./workflows/channel_monitor.ts";

export default Manifest({
  name: "slack-channel-monitor",
  description: "slack channel notify",
  icon: "assets/default_new_app_icon.png",
  workflows: [NotifyWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "channels:read", "chat:write", "chat:write.public"],
});
