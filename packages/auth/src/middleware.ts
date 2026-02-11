import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "./jwt";

export type AuthMiddlewareConfig = {
  getToken?: (req: FastifyRequest) => string | null;
};

function defaultGetBearerToken(req: FastifyRequest): string | null {
  const h = req.headers.authorization;
  if (!h) return null;
  const [type, token] = h.split(" ");
  if (type?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string; email?: string };
  }
  interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
    optionalAuth: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export function createAuthMiddleware(config?: AuthMiddlewareConfig) {
  const getToken = config?.getToken ?? defaultGetBearerToken;

  return async (req: FastifyRequest, reply: FastifyReply) => {
    const token = getToken(req);
    if (!token) return reply.code(401).send({ error: "Missing bearer token" });

    try {
      const decoded = verifyToken<{ id?: string; userId?: string; email?: string }>(token);
      const id = decoded.id ?? decoded.userId;
      if (!id) return reply.code(401).send({ error: "Invalid token payload" });
      req.user = { id, email: decoded.email };
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  };
}

export function createOptionalAuthMiddleware(config?: AuthMiddlewareConfig) {
  const getToken = config?.getToken ?? defaultGetBearerToken;

  return async (req: FastifyRequest, _reply: FastifyReply) => {
    const token = getToken(req);
    if (!token) return;

    try {
      const decoded = verifyToken<{ id?: string; userId?: string; email?: string }>(token);
      const id = decoded.id ?? decoded.userId;
      if (id) req.user = { id, email: decoded.email };
    } catch {
      // ignore
    }
  };
}

export function registerAuthDecorators(fastify: FastifyInstance, config?: AuthMiddlewareConfig) {
  fastify.decorate("authenticate", createAuthMiddleware(config));
  fastify.decorate("optionalAuth", createOptionalAuthMiddleware(config));
}
