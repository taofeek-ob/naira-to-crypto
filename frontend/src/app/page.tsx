import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/data/features";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="border-b border-border">
        <main className="container mx-auto">
          <div className="relative md:mt-24 mx-auto w-full max-w-4xl pt-4 text-center">
            <div className="justify-center hidden md:flex">
              <div className="flex flex-row items-center justify-center gap-5 p-1 text-xs bg-card/60 backdrop-blur-lg rounded-md border border-border">
                <Badge className="font-semibold"> 🎉 New!</Badge>
                <h5>Real-time and automated conversions between Naira and USDT</h5>
                <Link href="/" className="flex flex-row items-center">
                  View all features
                  <ArrowRightIcon className="w-6 h-6 ml-2" />
                </Link>
              </div>
            </div>
            <h1 className="md:text-7xl my-4 font-extrabold text-4xl md:leading-tight">Convert your naira to crypto through bank transfer</h1>
            <p className="mx-auto my-4 text-sm w-full max-w-xl text-center font-medium leading-relaxed tracking-wide">
              Effortlessly exchange Naira for crypto in seconds on the base sepolia network.
            </p>
            <div className="flex flex-row justify-center items-center space-x-4 my-8">
              <Button>
                <Link href="/login"> Get Started</Link>
              </Button >
              <Button variant="secondary">
                <Link href="/live-transactions">Live Transactions</Link>
              </Button>
            </div>

            <div className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
              <div className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
            </div>
          </div>
        </main>
      </div>

      {/* features */}

      <section className="border-b border-border bg-gradient-to-b from-background to-transparent via-background via-90% relative" id="features">
        <div className="container mx-auto text-center">
          <div className="my-24">
            <h5 className="text-primary">Why Naira to Crypto Stands Out?</h5>
            <h2 className="text-4xl font-extrabold my-4">Get Onboard the Onchain Economy Faster</h2>

            <div className="flex flex-col md:flex-row gap-4 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="max-w-lg mx-auto">
                  <CardHeader>
                    <div className="w-16 h-16 text-primary-foreground flex justify-center items-center border border-border rounded-xl bg-primary mx-auto">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="mt-4">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 -z-10 max-h-full w-full h-full blur-2xl">
          <div className="absolute bottom-0 left-0 w-1/2 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
        </div>
      </section>
    </>
  );
}
