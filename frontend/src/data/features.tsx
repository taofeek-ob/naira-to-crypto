import { HandIcon, Pencil1Icon, Pencil2Icon, RocketIcon } from "@radix-ui/react-icons";
import { Handshake } from "lucide-react";

export const features = [
  {
    title: "Create an Account",
    description: "Sign up in just a few clicks and start your journey in seconds.",
    icon: <HandIcon className="w-6 h-6" />,
  },
  {
    title: "Transfer Funds",
    description: "Transfer Naira to your unique bank account.",
    icon: <Pencil1Icon className="w-6 h-6" />,
  },
  {
    title: "Get Your Crypto",
    description: "Receive your crypto in your registered wallet.",
    icon: <RocketIcon className="w-6 h-6" />,
  },
];
