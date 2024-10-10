import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl">NairaCrypto</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Convert Naira to Crypto Instantly</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Send Naira to your personalized bank account and receive USDT automatically. Fast, secure, and convenient.
                </p>
              </div>

              <Link href="/dashboard">
                <Button className="bg-green-500 border-4 border-green-400 hover:border-green-800 hover:bg-transparent mt-5 rounded-lg py-2 px-4">
                  Get Started
                </Button>
              </Link>
              {/* 
              {address ? (
                <Button>
                  <a href="/dashboard">Go to Dashboard</a>
                </Button>
              ) : (
                <WalletWrapper className=" " text="Sign in" />
              )} */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                <p className="text-gray-500 dark:text-gray-400">Create your account and get a personalized bank account number.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Send Naira</h3>
                <p className="text-gray-500 dark:text-gray-400">Transfer Naira to your personalized account from any bank.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Receive USDT</h3>
                <p className="text-gray-500 dark:text-gray-400">Get USDT automatically credited to your crypto wallet.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 NairaCrypto. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
