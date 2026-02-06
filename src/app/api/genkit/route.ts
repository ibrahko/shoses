export const dynamic = "force-dynamic";

import createApp from "@genkit-ai/next";

// Import flows so that they are registered with Genkit
import '@/ai/ai-shoe-recommendation';

const handler = createApp();

export { handler as GET, handler as POST };
