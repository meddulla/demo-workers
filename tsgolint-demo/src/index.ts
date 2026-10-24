import { prewarm } from "./prewarm";
import { readVisits, recordVisit } from "./visits";

interface Env {
  VISITS: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/prewarm") {
      prewarm(env.VISITS, ["/", "/about"]);
      return new Response("prewarming\n");
    }
    ctx.waitUntil(recordVisit(env.VISITS, pathname));
    const visits = await readVisits(env.VISITS, pathname);
    return Response.json({ path: pathname, visits });
  },
} satisfies ExportedHandler<Env>;
