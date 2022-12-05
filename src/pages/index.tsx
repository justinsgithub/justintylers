import { NextPage } from "next";
import { Layout } from "@/components/layout";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from '@/components/button'

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Home - Justin T. Angeles</title>
        <meta name="description" content="Justin Angeles personal site, writings, software, content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-white">Hello</h1>
          <div className="flex-1 flex relative">
    <div className="flex-1 flex">
      <section className="flex-1 flex my-5 mb-15">
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-center drop-shadow-xl text-5xl block">
              Justin Angeles
          </h1>
          <img className="w-40 h-40 mt-9 rounded-full" src="/images/profile.jpg" alt="Picture of Justin Angeles" />

          <div className="flex space-x-4 mx-4 my-10 justify-center">
              Thank you for taking the time to visit my site. Here you can find links to my various accounts and activities on the web. 😊
              {/* Also feel free to checkout my writings, please enjoy and any feedback is always appreciated 😊. */}
          </div>

          <div className="p-4 my-9 pb-20px shadow-xl max-w-lg">
            <div className="flex-col justify-center items-center flex-wrap w-full box-border">
              <div className="mb-9">
                <img src='/images/writings.png'/>
              </div>
              <div className="my-9">
                 I find writing very therapeutic and a great way to prevent building up too much negative energy.
              </div>
              <div className="mb-1">
                <Button text="View Project" size="xs" classes="font-extrabold capitalize" to="/writings" type="primary"/>
              </div>
            </div>
          </div>

          <div className="p-4 my-9 pb-20px shadow-xl max-w-lg">
            <div className="flex-col justify-center items-center flex-wrap w-full box-border">
              <div className="mb-9">
                <img src='/images/learning-docs-cover.png' />
              </div>
              <div className="my-9">
                  I created study docs to help learn and document things I learn about. It is pretty much entirely tech subjects.
              </div>
              <div className="mb-1">
                <Button text="View Project" size="xs" classes="font-extrabold capitalize" href="https://docs.justintylers.com" type='primary'/>
              </div>
            </div>
          </div>

          <div className="p-4 my-9 pb-20px shadow-xl max-w-lg">
            <div className="flex-col justify-center items-center flex-wrap w-full box-border">
              <div className="mb-9">
                <img src='/images/portfolio-cover.png' />
              </div>
              <div className="my-9">
                My software development portfolio
              </div>
              <div className="mb-1">
              <Button text="View Project" size="xs" classes="font-extrabold capitalize" href="https://docs.justintylers.com" type='primary'/>
              </div>
            </div>
          </div>


        </div>

      </section>
    </div>
  </div>

      </Layout>

    </>
  );
};

export default Home
