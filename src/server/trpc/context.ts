import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'


import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "../db/client";

const setCookie = ( res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

type CreateContextOptions = {
  session: Session | null;
  req: NextApiRequest | null
  res: NextApiResponse | null
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    req: opts.req,
    res: opts.res
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  /* setCookie(opts.res, 'Next.js', 'api-middleware!', { path: '/', maxAge: 2592000 }) */
  /* console.log('COOKIES', opts.req.cookies) */
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
    req,
    res
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
