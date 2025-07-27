"use client";
import { animate } from "motion";
import { Button } from "./ui/button";
import { motion, scale } from "motion/react";

export default function LandingPage() {
  const description = ["Transform", "your", "favorite", "YouTube", "videos", "into", "compelling", "tweets", "with", "just", "one", "click.", "Boosts", "your", "social", "media", "presence."]
  return (
    <div className="max-w-5xl mx-auto mt-12 md:mt-16 flex flex-col text-center items-center ">
      <motion.h2
        className="text-3xl md:text-5xl font-medium tracking-tight"
        initial={{ y: 10 , opacity:0 }}
        animate={{ y: 0 , opacity:1}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        Youtube to Banger tweets.
      </motion.h2>
      <div className="text-sm md:text-lg font-extralight text-primary/80 mt-2 max-w-xl md:max-w-2xl">
        {description.map((word, i) => (
          <motion.span
        key={i}
        className="inline-block mr-1"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut",
          delay: 0.1 + (i * 0.04) 
        }}
          >
        {word}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ y: 20 , opacity:0 }}
        animate={{ y: 0 , opacity:1}}
        transition={{ duration: 0.3, ease: "easeInOut" ,delay:0.7}}
      >
        <Button
          size={"lg"}
          className="mt-5 hover:scale-103 hover:-translate-y-1"
        >
          🚀 Get started{" "}
        </Button>
      </motion.div>
    </div>
  );
}
