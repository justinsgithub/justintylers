import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { setCookie } from "cookies-next";


type CreateContextOptions = {
  session: Session | null;
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
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  let user_id: string

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  if (session?.user?.id) {
    user_id = session.user.id
  } else {
    const gid = req.cookies['g']
    if (gid) {
      user_id = gid
    } else {
      const new_guest = await prisma.guest.create({data:{}})
      user_id = new_guest.id
      setCookie('g', user_id, {req: req, res: res, maxAge: 3600 * 24 * 365})
    }
  }

  const inner_context = await createContextInner({session})

  // make request and response available to procedures for setting cookies and such
  return {...inner_context, req, res, user_id}
};

export type Context = inferAsyncReturnType<typeof createContext>;
