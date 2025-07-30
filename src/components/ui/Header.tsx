"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center p-2 z-20">
      <Link href="/" className="mr-auto">
        <img
          src="/images/logo.png"
          width={70}
          height={70}
          alt="Logo"
          className="dark:invert"
        />
      </Link>

      <nav className="ml-auto">
        <ul className="flex">
          <li>
            <Link
              href="https://wa.me/2347015038977"
              target="_blank"
              className="flex items-center px-4 py-2 text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={24}
                height={24}
              >
                <path
                  fill="#25D366"
                  d="M380.9 97.1C339 55.2 285.3 32 228.8 32 102.6 32 0 134.6 0 260.8c0 45.6 11.8 89.7 34.1 128.9L0 480l93.4-32.9c37.7 20.8 80.2 31.8 123.4 31.8 126.1 0 228.8-102.6 228.8-228.8 0-56.5-23.1-110.2-65-152.1zM228.8 438.5c-39.2 0-77.5-11-110.6-31.7l-7.9-4.8-55.5 19.5 18.7-54.3-5.2-8C47.7 319.6 36 291.2 36 260.8 36 153.1 121.1 68 228.8 68c44.8 0 86.9 17.5 118.7 49.3 31.8 31.8 49.3 73.9 49.3 118.7 0 107.7-85.1 192.8-192.8 192.8z"
                />
              </svg>
              <span className="ml-2">Chat</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
