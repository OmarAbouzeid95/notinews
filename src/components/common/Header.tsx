const Header: React.FC<unknown> = () => {
  return (
    <header className="shadow-md fixed top-0 left-0 right-0 bg-primary border-b border-b-gray-800 z-50">
      <div className="flex items-center h-16 px-6 lg:px-0 max-w-5xl mx-auto">
        <h1 className="font-bold text-2xl">Notinews</h1>
      </div>
    </header>
  );
};

export default Header;
