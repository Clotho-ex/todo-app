import React from "react";

function LandingPage() {
  return (
    <>
      <div className="container-root h-screen bg-neutral-200 dark:bg-neutral-900">
        <h1 className="font-semibold text-neutral-800 dark:text-neutral-200 text-5xl pt-20 mb-4 font-geist">
          Just Do It
        </h1>
        <p className="text-neutral-500 text-xl font-geist mt-4 leading-relaxed">
          Time to get things done. <br /> Fast and easy.
        </p>

        <button className="btn mt-20">Get Started</button>
        <p className="text-neutral-500 text-sm font-geist mt-4 leading-relaxed">
          View on{" "}
          <a
            href="https://github.com/Clotho-ex/todo-app"
            target="_blank"
            className="text-blue-500">
            GitHub
          </a>
        </p>
      </div>
    </>
  );
}

export default LandingPage;
