import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  // POST /api/items — Create item
  fastify.post<{ Body: any }>('/', async (request, reply) => {
    const body = request.body as any;
    return { id: '1', ...body, status: 'draft' };
  });

  // GET /api/items — List items
  fastify.get('/', async (request, reply) => {
    return { items: [], total: 0 };
  });

  // GET /api/items/:id — Get item
  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    return { id, title: 'Sample Item', status: 'draft' };
  });

  // PATCH /api/items/:id — Update item
  fastify.patch<{ Params: { id: string }; Body: any }>('/:id', async (request, reply) => {
    const { id } = request.params;
    return { id, updated: true };
  });

  // DELETE /api/items/:id — Delete item
  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const { id } = request.params;
    return { id, deleted: true };
  });
};
