'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

function Header(): React.ReactElement {
  const pathname = usePathname();
  const [showDrop, setShowDrop] = useState(false);

  return (
    <header
      className="flex justify-between px-4 py-5 bg-blue-900"
      onMouseLeave={() => setShowDrop(false)}
    >
      <div>
        <ul className="flex gap-3">
          <Link
            className={`hover:text-cyan-300 cursor-pointer ${
              pathname === '/home' && ' font-bold text-blue-700'
            }`}
            href="/home"
          >
            Home
          </Link>
          <Link
            className={`hover:text-cyan-300 cursor-pointer ${
              pathname === '/completed' && ' font-bold text-blue-700'
            }`}
            href="/completed"
          >
            Completed
          </Link>
          <Link
            className={`hover:text-cyan-300 cursor-pointer ${
              pathname === '/archive' && ' font-bold text-blue-700'
            }`}
            href="/archive"
          >
            Archive
          </Link>
        </ul>
      </div>
      <div className="relative">
        <span
          className="bg-blue-600  rounded-full  px-4 py-3 cursor-pointer"
          onMouseEnter={() => setShowDrop(true)}
        >
          P
        </span>

        <ul
          className={`bg-blue-400 absolute top-0 translate-y-10 shadow shadow-blue-900 px-6 right-0 py-4 flex flex-col gap-1 text-cyan-700 transition-all duration-300 ease-out ${
            showDrop ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
          onMouseLeave={() => setShowDrop(false)}
        >
          <Link className="hover:text-cyan-900 cursor-pointer" href="/profile">
            Profile
          </Link>
          <li className="hover:text-cyan-900 cursor-pointer" onClick={() => signOut()}>
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
