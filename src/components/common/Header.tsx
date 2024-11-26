import Link from "next/link";

const Header: React.FC<unknown> = () => {
  return (
    <header className="shadow-md fixed top-0 left-0 right-0 bg-primary z-50 opacity-95">
      <div className="flex items-center h-16 px-6 lg:px-0 max-w-5xl mx-auto">
        <Link className="font-bold text-2xl" href="/">
          Notinews
        </Link>
      </div>
    </header>
  );
};

export default Header;
