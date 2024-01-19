
import Link from "next/link";
import Auth from "./Auth";
import Image from "next/image";

const Navbar = async () => {
  return (
    <nav className="shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link className="flex-shrink-0" href="/">
            <Image
              src="vitalog_logo.svg"
              alt="Vita Log Logo"
              width={40}
              height={40}
            />
          </Link>

          <div className="flex items-center">
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
