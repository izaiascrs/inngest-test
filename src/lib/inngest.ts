import { Inngest } from "inngest";
// ℹ️ Import the middleware from the middleware sub-package:
import { realtimeMiddleware } from "@inngest/realtime/middleware";

export const inngest = new Inngest({
  id: "my-app",
  baseUrl: "https://inngest.applify.com.br",  
  middleware: [realtimeMiddleware()],
});