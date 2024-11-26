"use client";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Section from "@/components/common/Section";

const SignupSuccessPage = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);
  return (
    <>
      <Confetti width={width} height={height} />
      <Section title="" className="mt-16">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          <h1 className="mb-4 text-center font-semibold text-3xl">
            You&apos;re all set!
          </h1>
          <p className="text-center">
            Welcome aboard! You&apos;ve successfully joined the community. Keep
            an eye on your inbox for personalized updates tailored just for you.
          </p>
          <p className="text-center">
            Feel free to update your preferences anytime to ensure you only get
            the content you love.
          </p>
        </div>
      </Section>
    </>
  );
};

export default SignupSuccessPage;
