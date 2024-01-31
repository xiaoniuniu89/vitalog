import React from "react";
import Logo from "../../public/vitalog_loading_logo.svg";
import Image from "next/image";

function Loader() {
  return (
    <div className="flex justify-center md:h-[50vh] loader">
      <div className=" pt-[20vh]">
        <Image
          className="fade-in-out mx-auto"
          src={Logo}
          width={150}
          height={150}
          alt="Loading"
        />
      </div>
    </div>
  );
}

export default Loader;
