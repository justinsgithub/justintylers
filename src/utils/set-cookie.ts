import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'

export const set_cookie = ( res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

