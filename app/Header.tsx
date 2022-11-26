import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 bg-blue-500">
      <div className="">
        <Link href="/" className="p-2 bg-white text-blue-500 rounded-lg">
          Home
        </Link>
        <Link href="/todos" className="p-2 bg-white text-blue-500 rounded-lg">
          Todos
        </Link>
        <Link href="/search" className="p-2 bg-white text-blue-500 rounded-lg">
          Search
        </Link>
      </div>
    </div>
  );
};

export default Header;
