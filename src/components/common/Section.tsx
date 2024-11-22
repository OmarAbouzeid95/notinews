"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { generateMotionSpecs } from "@/config/motion";

const Section = ({
  children,
  title,
  subHeading,
  className,
  ...props
}: {
  children: ReactNode;
  title?: string;
  subHeading?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section className={`px-4 sm:px-6 py-24 ${className ?? ""}`} {...props}>
      <motion.div
        className="max-w-5xl mx-auto text-base md:text-lg"
        {...generateMotionSpecs()}>
        {title && (
          <h2 className="max-w-lg mx-auto font-bold text-4xl md:text-5xl text-center mb-4 md:mb-6">
            {title}
          </h2>
        )}
        {subHeading && (
          <h3 className="font-bold text-base lg:text-lg text-center max-w-md mx-auto text-secondary mb-12 md:mb-20">
            {subHeading}
          </h3>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
