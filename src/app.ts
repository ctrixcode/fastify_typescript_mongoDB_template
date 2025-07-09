import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyMongo from '@fastify/mongodb';
import dotenv from 'dotenv';
import {
  corsPlugin,
  rateLimiterPlugin,
  loggingPlugin,
  errorHandlerPlugin,
  sanitizerPlugin,
} from './middlewares';
import routes from './routes/index';

dotenv.config();

const app = Fastify({ logger: false });

// Register plugins
app.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/fastify_db',
});
app.register(helmet);
app.register(multipart);
app.register(loggingPlugin);
app.register(corsPlugin);
app.register(rateLimiterPlugin);
app.register(sanitizerPlugin);
app.register(errorHandlerPlugin);

// Register routes
app.register(routes, { prefix: '/api' });

export default app;
