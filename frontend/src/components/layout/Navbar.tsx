import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/navLinks";


const Navbar = () => {
  return (
    <nav className="py-4 bg-background/30 backdrop-blur-sm">
      <div className="container flex flex-row justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl">NairaToCrypto</h1>
        </Link>
        <ul className="md:flex flex-row justify-between gap-8 hidden">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-row justify-end space-x-2">
          <Button>
            <Link href="/login"> Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
