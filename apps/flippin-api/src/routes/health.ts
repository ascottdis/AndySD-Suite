import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok', app: 'flippin-api', timestamp: new Date().toISOString() };
  });
};
