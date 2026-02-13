"use server";

import { inngest } from "@/lib/inngest";
// See the "Typed channels (recommended)" section above for more details:
import { userChannel } from "@/lib/realtime-channels";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";

export type UserChannelToken = Realtime.Token<typeof userChannel, ["ai"]>;

export async function fetchRealtimeSubscriptionToken(userId: string): Promise<UserChannelToken> {
  // This creates a token using the Inngest API that is bound to the channel and topic:
  const token = await getSubscriptionToken(inngest, {
    channel: `user:${userId}`,
    topics: ["ai"],
  });

  return token as UserChannelToken;
}
