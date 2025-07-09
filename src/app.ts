import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyMongo from '@fastify/mongodb';
import {
  corsPlugin,
  rateLimiterPlugin,
  loggingPlugin,
  errorHandlerPlugin,
  sanitizerPlugin,
} from './middlewares';
import routes from './routes/index';

const app = Fastify({ logger: false });

// Register plugins
app.register(fastifyMongo, {
  forceClose: true,
  url: 'mongodb://localhost:27017/fastify_db', // Change DB name as needed
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
