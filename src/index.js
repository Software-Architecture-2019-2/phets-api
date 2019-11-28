import Koa from "koa";
import koaLogger from "koa-logger";
import koaBody from "koa-bodyparser";
import koaCors from "@koa/cors";

import { ApolloServer } from "apollo-server-koa";
import { createTestClient } from "apollo-server-testing";
import graphQLSchema from "./graphQLSchema";

import { formatErr, validateToken } from "./utilities";

const server = new ApolloServer({
  schema: graphQLSchema,
  formatError: formatErr
});
const app = new Koa();
const PORT = process.env.PORT || 4000;

app.use(koaLogger());
app.use(koaBody());
app.use(koaCors());

// use the test server to create a query function
const { query } = createTestClient(server);

app.use(async (ctx, next) => {
  // read token from header
  if (ctx.header.authorization) {
    const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9._-]+)/);
    if (token && token[1]) {
      ctx.state.token = token[1];
    }
  }
  
  // validate token when needed
  if (ctx.request.body && ctx.request.body.query) {
    const body = ctx.request.body.query.split('{')[1].split('(')[0].trim();
    const publicOperations = ["register", "login", "validateSession", "__schema"];
    if (!publicOperations.some(op => body === op)) {
      const res = await validateToken(query, ctx.state.token);
      if (!ctx.state.token || res.data && !res.data.validateSession.valid || !res.data) {
        ctx.response.status = 403;
        return;
      }
    }
  }
  await next();
});

app.use(server.getMiddleware());

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
