"use client";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export default function LandingPage() {
  const description = ["Transform", "your", "favorite", "YouTube", "videos", "into", "compelling", "tweets", "with", "just", "one", "click.", "Boosts", "your", "social", "media", "presence."]
  
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered",
      description: "Advanced AI analyzes your YouTube content and creates engaging tweets"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Generate compelling tweets in seconds with just one click"
    },
    {
      icon: "📈",
      title: "Boost Engagement",
      description: "Optimized for social media algorithms to maximize your reach"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Paste YouTube URL",
      description: "Simply paste your YouTube video link"
    },
    {
      step: "02", 
      title: "AI Magic Happens",
      description: "Our AI analyzes and creates engaging tweets"
    },
    {
      step: "03",
      title: "Share & Engage",
      description: "Copy your perfect tweet and watch engagement soar"
    }
  ];

  return (
    <>
      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-medium mb-4">Why Choose Bangers?</h3>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Transform your video content into viral tweets with our powerful AI-driven platform
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
              <p className="text-sm text-primary/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-32 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-medium mb-4">How It Works</h3>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Get viral tweets from your YouTube videos in three simple steps
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                {step.step}
              </div>
              <h4 className="text-lg font-medium mb-2">{step.title}</h4>
              <p className="text-sm text-primary/70">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform translate-x-6"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-24 md:mt-32 px-6 text-center mb-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-lg p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-medium mb-4">Ready to Create Viral Tweets?</h3>
          <p className="text-primary/70 mb-6 max-w-xl mx-auto">
            Join thousands of content creators who are already boosting their social media engagement
          </p>
          <Button size="lg" className="hover:scale-105 transition-all duration-300">
            🚀 Start Creating Now
          </Button>
        </motion.div>
      </div>
    </>
  );
}
