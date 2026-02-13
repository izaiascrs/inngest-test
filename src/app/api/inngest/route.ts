import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { functions } from "@/lib/functions";

// Create an API that serves the functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [...functions],  
  serveHost: "https://inngest.applify.com.br",
});