import SignUpForm from "@/components/SignUpForm";
import Navbar from "@/components/layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="  max-w-md w-full space-y-8 relative flex items-center justify-center">
          <div className="min-w-max min-h-max">
            <SignUpForm />
          </div>

          <div className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
            <div className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
            <div className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
            <div className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
