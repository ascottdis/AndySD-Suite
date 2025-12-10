import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from './jwt';
import type { JWTPayload } from './types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}

export interface AuthMiddlewareConfig {
  jwtSecret: string;
}

/**
 * Create auth middleware for Fastify
 */
export function createAuthMiddleware(config: AuthMiddlewareConfig) {
  return async function authMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Missing authorization header',
      });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid authorization format. Use: Bearer <token>',
      });
    }

    const payload = verifyToken(token, config.jwtSecret);

    if (!payload) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }

    request.user = payload;
  };
}

/**
 * Optional auth - attaches user if token present
 */
export function createOptionalAuthMiddleware(config: AuthMiddlewareConfig) {
  return async function optionalAuthMiddleware(
    request: FastifyRequest,
    _reply: FastifyReply
  ) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return;
    }

    const payload = verifyToken(token, config.jwtSecret);

    if (payload) {
      request.user = payload;
    }
  };
}
