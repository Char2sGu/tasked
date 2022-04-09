import { EntityManager, RequestContext } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MikroFlusherInterceptor } from '@nestjs-devkit/mikro-graphql-flusher';
import { AsyncLocalStorage } from 'async_hooks';
import { Observable } from 'rxjs';

/**
 * Create a query scoped MikroORM context for each query.
 *
 * MikroORM's `context` option should be set to
 * {@link MikroQueryContextInterceptor.context} to make this interceptor work
 * properly.
 *
 * @deprecated
 * This issue is solved in a better way using
 * {@link MikroFlusherInterceptor}.
 *
 * ### MikroORM's Default Behavior
 *
 * MikroORM uses the _UnitOfWork_ and _IdentityMap_ pattern, which require the
 * {@link EntityManager} to be isolated between actions to provide a clean
 * _IdentityMap_ for each request handler.
 *
 * We can use `em.fork()` to get a new {@link EntityManager} inheriting the
 * original one's configurations but having its own _UnitOfWork_ and
 * _IdentityMap_ storage. But when we use a DI framework, like Nest's built-in
 * one, it will be hard to achieve this by simply forking one because the DI
 * framework always gives us a same {@link EntityManager} instance. So MikroORM
 * have another solution, that's the Context, which is made possible by the
 * {@link AsyncLocalStorage}.
 *
 * We can provide a context object as the first parameter of
 * {@link AsyncLocalStorage.run} and a function as the second one. Then the
 * function will be invoked inside the context, which means we can get the
 * previous context object using {@link AsyncLocalStorage.getStore}.
 *
 * So the new solution is to provide a fork of the original
 * {@link EntityManager} as the context, and run other processes inside the
 * context. We will still use the original {@link EntityManager}, but it will
 * check whether itself is inside a context and try to use the _UnitOfWork_
 * and _IdentityMap_ of the context {@link EntityManager} instead of its own
 * ones, which can be easily achieved using middlewares:
 *
 * ```ts
 * app.use((req, res, next) => {
 *   storage.run(orm.em.fork(), next);
 * });
 * ```
 *
 * MikroORM wrapped these steps into the {@link RequestContext}, and the
 * {@link MikroOrmModule} will by default apply a middleware automatically to
 * achieve the isolation, which works well in most common use cases when there
 * is only one action in one request.
 *
 * ### The Issue in GraphQL's Multi-Query Requests
 *
 * But GraphQL supports multi-query requests. The client may send multiple
 * queries or mutations using an array and get an array of results. In a
 * multi-query request, multiple resolver methods will be invoked to execute
 * multiple actions. Guards, interceptors and so on will be invoked for each
 * resolver method, but middlewares will be invoked for only once during the
 * whole request. It means in a multi-query request, all the actions will share
 * a same context, which works well in multiple queries but not in multiple
 * mutations because {@link EntityManager.flush} may be invoked when another
 * flush has not completed and cause errors.
 *
 * ### Solution: Query Scoped Contexts
 *
 * To solve this, we must create a query scoped context for each query of a
 * multi-query request. The only place we can implement this is interceptors
 * because this is the only place where we can get the `next` object of every
 * queries in the request to make them invoked in a query scoped context. We
 * should make this interceptor to be invoked before any other interceptors to
 * ensure the other interceptors are also inside the query scoped context. But
 * because interceptors are invoked after guards, so DB operations in guards
 * are still not scoped to the query scoped contexts. Therefore, we should not
 * abandon the request scoped context created by MikroORM's built-in
 * middleware, but to use both of the middleware and our interceptor to create
 * both a request scoped context and query scoped contexts, so that the DB
 * operations in guards will be scoped to the request scoped context and those
 * in other places will be scoped to query scoped contexts. Moreover, query
 * scoped contexts should be created with `clear` set to `false`, so the query
 * scoped contexts will inherit the _UnitOfWork_ and _IdentityMap_ of the
 * request scoped one and objects like `request.user` defined in guards will
 * not be cleared from the _IdentityMap_. So we cannot use the
 * {@link RequestContext} provided by MikroORM because it sets `clear` to
 * `true`. Note that because guards are still in a request scoped context, we
 * should avoid invoking {@link EntityManager.flush} for it may probably cause
 * conflicts when there are multiple mutations.
 *
 * ### Potential Issues
 *
 * There are still some potential issues. Nest applies interceptors to root
 * resolvers but not to field resolvers. It means the `Observable` returned
 * by `next.handle()` will be finished just after the root resolver is invoked.
 * Therefore, field resolvers will still be in the request scoped context
 * instead of a query scoped one. It usually doesn't matter because usually we
 * won't invoke {@link EntityManager.flush} in field resolvers and the
 * uncleared _UnitOfWork_ and _IdentityMap_ also won't have much effect. But
 * when we use {@link EntityManager.setFilterParams} in an interceptor, we must
 * make that interceptor executed before the query context interceptor, so that
 * the filter params will be defined in the request scoped context to avoid
 * `Error: No argument provided for filter ...` when field resolvers try to
 * enable the filter.
 */
@Injectable()
export class MikroQueryContextInterceptor implements NestInterceptor {
  /**
   * Make the `EntityManager` use our query scoped context if available (query
   * scoped contexts are only available after this interceptor is executed).
   * Otherwise, use the default request scoped one.
   */
  static context = () =>
    MikroQueryContextInterceptor.storage.getStore() ??
    RequestContext.getEntityManager();

  private static storage = new AsyncLocalStorage<EntityManager>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestScoped = RequestContext.getEntityManager()!;
    // Set `clear` to `false` so that the query scoped context will inherit the
    // IdentityMap of request scoped one.
    // Set `context` to `false` so that the query scoped context will use its
    // own IdentityMap instead of looking for one from another context.
    const queryScoped = requestScoped.fork({ clear: false, useContext: false });
    return new Observable((subscriber) => {
      MikroQueryContextInterceptor.storage.run(queryScoped, () =>
        next.handle().subscribe(subscriber),
      );
    });
  }
}

MikroOrmModule;
MikroFlusherInterceptor;
