import { channel, topic } from "@inngest/realtime";
import { z } from "zod";

// Use the "channel" and "topic" functions to create helpers to
// add type-safety when using realtime:

// The "channel" builder function can accept a string as a channel name,
// or a function that returns a string. Here we create a channel for all logs:
const logsChannel = channel("logs").addTopic(topic("info").type<string>());

// Here we create a channel using the function pattern, which allows us to pass
// a parameter to the channel name. Here we create a channel for each user:
// The "topic" builder function can accept a schema or a type
const userChannel = channel((userId: string) => `user:${userId}`)
  // Add a specific topic, eg. "ai" for all AI data within the user's channel
  .addTopic(
    topic("ai").schema(
      z.object({
        response: z.string(),
        // Transforms are supported for realtime data
        success: z.number().transform(Boolean),
        timestamp: z.string().optional(),
      })
    )
  );

export { logsChannel, userChannel };
