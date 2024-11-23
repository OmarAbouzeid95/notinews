"use client";
import { motion } from "framer-motion";
import { serviceSteps } from "@/data/homepage";

import { ClipboardList, Check, Earth } from "lucide-react";

const StepsSection = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center md:flex-row lg:justify-start md:flex-wrap">
      {serviceSteps.map(({ title, description }, index) => {
        return (
          <motion.div
            key={index}
            className="relative max-w-md h-[370px] flex flex-col justify-center items-center gap-5 md:max-w-sm lg:max-w-[320px] rounded-lg bg-primary py-6 px-4"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: (index < 3 ? index : index - 3 * 2) / 10,
            }}
            viewport={{ once: true }}>
            <h3 className="absolute top-5 left-5 text-primaryCta text-6xl font-bold">
              {index + 1}.
            </h3>
            <h4 className="mt-8 font-semibold text-center text-2xl">{title}</h4>
            {index === 0 && (
              <Earth strokeWidth={2.5} size={50} color="#d07b69" />
            )}
            {index === 1 && (
              <ClipboardList strokeWidth={2.5} size={50} color="#d07b69" />
            )}
            {index === 2 && (
              <Check strokeWidth={2.5} size={50} color="#d07b69" />
            )}
            <p className="text-lg text-center">{description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StepsSection;
