/**
 * Authentication Middleware for Flippin API
 * 
 * Provides JWT-based auth for protected routes
 * - Required auth: User-specific operations (save listing, get saved items)
 * - Optional auth: Public feeds (allows returning user context if authenticated)
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { setupAuth } from './setup';

/**
 * Type-safe fastify instance with auth decorators
 */
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    optionalAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Re-export setupAuth from setup.ts
export { setupAuth };

