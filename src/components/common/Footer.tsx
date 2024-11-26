const Footer: React.FC<unknown> = () => {
  return (
    <footer className="bg-extraDark py-10">
      <div className="max-w-5xl mx-auto p-6 md:px-0">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl">Notinews</h2>
        </div>
        {/* <div className="flex flex-col md:flex-row md:gap-6 items-start gap-2 pb-6 border-b border-b-gray-600">
          {navLinks.map(({ name, href }, index) => {
            return (
              <Link
                href={href}
                key={index}
                className={`block text-xl text-secondary w-fit hover:text-primary ${transitionAll}`}>
                {name}
              </Link>
            );
          })}
        </div> */}
        <p className="text-sm pt-8 md:text-center">
          Copyright © {new Date().getFullYear()} Notinews.com{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
