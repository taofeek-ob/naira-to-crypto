// import LoginButton from "@/components/LoginButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className=" flex w-full p-4 flex-col md:flex-row shadow-sm">
      <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">NairaToCrypto</span>
        </Link>
        <div className="flex items-center gap-3">
          <LoginButton />
        </div>
      </div>
    </section>
  );
}

import WalletWrapper from "./WalletWrapper";

function LoginButton() {
  return <WalletWrapper className="w-full " text="Connect Wallet" withWalletAggregator={true} />;
}
