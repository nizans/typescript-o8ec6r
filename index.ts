import { z } from 'zod';

export const createRequestZSchema = <
  TBody extends z.ZodType<object> | z.ZodType<never> = z.ZodType<never>,
  TParams extends z.ZodType<object> | z.ZodType<never> = z.ZodType<never>,
  TQuery extends z.ZodType<object> | z.ZodType<never> = z.ZodType<never>
>({
  /**
   * Getting:
   * Type 'ZodNever' is not assignable to type 'TBody'.
   * 'ZodNever' is assignable to the constraint of type 'TBody',
   * but 'TBody' could be instantiated with a different subtype of constraint 'ZodType<object, ZodTypeDef, object> | ZodType<never, ZodTypeDef, never>'
   * How can I get rid of those ?
   */
  body = z.never(),
  params = z.never(),
  query = z.never(),
}: {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
}) =>
  z.object({
    body,
    params,
    query,
  });

const ZReq = createRequestZSchema({
  body: z.object({ hello: z.string() }),
});

const someObj = {};

const parsedObj = ZReq.parse(someObj);

const { body, params, query } = parsedObj;

const BODY_DEFINED_CORRECTLY: { hello: string } = body;

// Those are correctly typed as never, so should'nt it error when destructuring?
const PARAMS_DEFINED_CORRECTLY: never = params;
const QUERY_DEFINED_CORRECTLY: never = query;
