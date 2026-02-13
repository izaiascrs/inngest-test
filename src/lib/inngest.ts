import { Inngest } from "inngest";
// ℹ️ Import the middleware from the middleware sub-package:
import { realtimeMiddleware } from "@inngest/realtime/middleware";

export const inngest = new Inngest({
  id: "my-app",
  middleware: [realtimeMiddleware()],
  // Novas chaves geradas
  // eventKey: "9889489ec29dd62712352dd4c2ee774d6549a681cbeab0c878833b2ee841934d",
  // signingKey: "cbc66c604463ae57daf5b771c55da1f68ce31012d2c3435cdfc25f769b0ffd75",
  // baseURL: "https://inngest.applify.com.br/",
  // isDev: true,
});