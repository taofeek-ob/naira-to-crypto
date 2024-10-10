import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/components/LoginForm";

export default async function Page() {
  return (
    <>
      <Navbar />
      <div className="">
        <main className="container mx-auto">
          <div className="relative md:mt-24 mx-auto w-full max-w-4xl pt-4 text-center">
            <div className="justify-center hidden md:flex"></div>
            <div className="  p-8 rounded-lg">
              <LoginForm />
            </div>
            <div className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
              <div className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
              <div className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
