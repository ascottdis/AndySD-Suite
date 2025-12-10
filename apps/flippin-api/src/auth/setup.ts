/**
 * Local Auth Setup for Flippin API
 * 
 * Simplified auth setup that uses jsonwebtoken directly
 * to avoid workspace dependency issues during development
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import type { JWTPayload } from './types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload;
  }
}

/**
 * Create required auth middleware
 */
export function createAuthMiddleware(secret: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
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

    try {
      const payload = jwt.verify(token, secret) as JWTPayload;
      (request as any).user = payload;
    } catch (error) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }
  };
}

/**
 * Create optional auth middleware (doesn't fail if missing)
 */
export function createOptionalAuthMiddleware(secret: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return;
    }

    try {
      const payload = jwt.verify(token, secret) as JWTPayload;
      (request as any).user = payload;
    } catch {
      // Silent failure for optional auth
    }
  };
}

/**
 * Setup auth for the fastify instance
 */
export function setupAuth(fastify: FastifyInstance, jwtSecret: string) {
  const authMiddleware = createAuthMiddleware(jwtSecret);
  const optionalAuthMiddleware = createOptionalAuthMiddleware(jwtSecret);

  fastify.decorate('authenticate', authMiddleware);
  fastify.decorate('optionalAuth', optionalAuthMiddleware);
}
