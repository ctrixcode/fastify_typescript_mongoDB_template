import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { MongoClient, Db, ObjectId } from 'mongodb';

const mongoPlugin: FastifyPluginAsync = async (fastify, _opts) => {
  const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/fastify_db';
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  // Decorate Fastify instance
  fastify.decorate('mongo', { client, db, ObjectId });

  fastify.addHook('onClose', async instance => {
    await client.close();
  });
};

// export { mongoPlugin };
export default mongoPlugin;
