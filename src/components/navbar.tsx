"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconBrandGithub,IconBrandGoogleFilled } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { title: "Home", link: "/", target: "" },
  { title: "Pricing", link: "/pricing", target: "" },
  {
    title: "Github",
    link: "https://github.com/justanuragmaurya",
    target: "__blank",
  },
];

export default function Navbar() {
  const openRef = useRef<HTMLButtonElement>(null);
  const [opened,setOpened]=useState<boolean>(false);
  return (
    <>
    <div className="sticky flex items-center justify-between py-2 px-6 w-full z-10 max-w-6xl mx-auto pt-5">
      <div>
        <Link href={"/"} className="text-xl font-medium">
          💥Bangers.
        </Link>
      </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {nav.map((e, index) => {
          return (
            <Link
              key={index}
              target={e.target}
              className="hover:cursor-pointer text-sm hover:text-red-500 transition-all duration-300"
              href={e.link}
            >
              {e.title}
            </Link>
          );
        })}
        <Button
          onClick={() => openRef.current?.click()}
          variant={"outline"}
          size={"sm"}
        >
          Login
        </Button>
      </div>

      <div className="md:hidden">
        <Button
          onClick={() => setOpened(!opened)}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          {opened ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    </div>
    {opened && (
      <div className="absolute md:hidden bg-background/80 backdrop-blur-sm z-20 border-b shadow-sm w-full">
        <div className="flex flex-col space-y-4 p-6 max-w-6xl mx-auto items-center w-full">
          {nav.map((e, index) => {
            return (
              <Link
                key={index}
                target={e.target}
                className="hover:cursor-pointer text-sm hover:text-red-500 transition-all duration-300"
                href={e.link}
                onClick={() => setOpened(false)}
              >
                {e.title}
              </Link>
            );
          })}
          <Button
            onClick={() => {
              openRef.current?.click();
              setOpened(false);
            }}
            variant={"outline"}
            size={"sm"}
            className="w-full"
          >
            Login
          </Button>
        </div>
      </div>
    )}
    
    <Dialog>
        <DialogTrigger ref={openRef} className="hidden">Open</DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center">
            <DialogTitle>Login with Google</DialogTitle>
            <DialogDescription>
              Log into the app using your google account.
            </DialogDescription>
            <div className="my-5 flex flex-col gap-2">
                <Button><IconBrandGoogleFilled/>Login with Google</Button>
                <Button><IconBrandGithub/>Login with Github</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
