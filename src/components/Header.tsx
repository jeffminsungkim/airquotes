import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-5 flex w-full items-center justify-between border-b-2 px-2 pb-7">
      <Link href="/" className="flex space-x-3">
        <h1 className="ml-2 text-2xl font-bold tracking-tight text-app sm:text-4xl">
          AirQuotes.ai
        </h1>
      </Link>
    </header>
  );
};

export default Header;
