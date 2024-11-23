"use client";
import { motion } from "framer-motion";
import { generateMotionSpecs } from "@/config/motion";
import { transitionAll } from "@/config/styles";
import Link from "next/link";
import clsx from "clsx";

const Hero = () => {
  return (
    <section
      className={clsx("relative w-screen h-screen overflow-hidden bg-primary")}>
      <div
        className={clsx(
          "absolute z-20 top-0 right-0 left-0 h-16 bg-gradient-to-b to-transparent from-[#28161C]"
        )}></div>
      <div
        className={clsx(
          "absolute z-20 bottom-0 right-0 left-0 h-16 bg-gradient-to-t to-transparent from-[#28161C]"
        )}></div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <motion.h1
          className="text-secondary text-4xl md:px-0 md:text-6xl max-w-sm md:max-w-xl lg:text-7xl lg:max-w-2xl mx-auto text-center font-semibold mb-4"
          {...generateMotionSpecs()}>
          Your Favorite News
        </motion.h1>
        <motion.h3
          className="text-secondary text-4xl md:px-0 md:text-6xl max-w-sm md:max-w-xl lg:text-7xl lg:max-w-2xl mx-auto text-center font-semibold mb-12"
          {...generateMotionSpecs({
            transition: { duration: 0.5, delay: 0.25 },
          })}>
          At Your Door Step
        </motion.h3>
        <motion.div
          {...generateMotionSpecs({
            transition: { duration: 0.5, delay: 0.5 },
          })}>
          <Link
            href={"https://www.notificationapi.com/"}
            target="_blank"
            className={clsx(
              "inline-block px-6 py-4 rounded-full bg-notificationApiGradient",
              transitionAll
            )}>
            Powered by the NotificationAPI
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
