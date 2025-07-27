import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto mt-12 md:mt-16 flex flex-col text-center items-center ">
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
        Youtube to Banger tweets.
      </h2>
      <p className="text-sm md:text-lg font-extralight text-primary/80 mt-2 max-w-xl md:max-w-2xl">
        Transform your favorite YouTube videos into compelling tweets with just
        one click. Boosts your social media presence.
      </p>
      <Button size={"lg"} className="mt-5 hover:scale-103 hover:-translate-y-1">
        🚀 Get started{" "}
      </Button>
    </div>
  );
}
