import React from "react";
import Nav from "~/components/Nav";
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <>
      <section id="landing" className="bg-red-500 mb-4">
        <Nav />
      </section>
      <div className="w-full py-2">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <SignIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
