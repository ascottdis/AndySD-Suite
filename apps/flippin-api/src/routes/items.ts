import type { FastifyInstance } from "fastify";
import { db } from "../db/client";
import { items } from "../db/schema";
import { requireAuth } from "../plugins/auth";
import { eq, and } from "drizzle-orm";

export async function itemRoutes(app: FastifyInstance) {
  app.get("/items", async (req, reply) => {
    requireAuth(req);

    const workspaceId = (req.headers["x-workspace-id"] as string) || "";
    if (!workspaceId) return reply.code(400).send({ error: "x-workspace-id required" });

    const rows = await db.select().from(items).where(eq(items.workspaceId, workspaceId));
    return reply.send({ items: rows });
  });

  app.post("/items", async (req, reply) => {
    requireAuth(req);

    const workspaceId = (req.headers["x-workspace-id"] as string) || "";
    if (!workspaceId) return reply.code(400).send({ error: "x-workspace-id required" });

    const body = req.body as { title: string; condition?: string; costCents?: number };
    const title = body.title || "";
    if (!title) return reply.code(400).send({ error: "title required" });

    const inserted = await db
      .insert(items)
      .values({
        workspaceId,
        title,
        condition: body.condition ?? "unknown",
        costCents: body.costCents ?? 0,
      })
      .returning();

    return reply.code(201).send({ item: inserted[0] });
  });
}