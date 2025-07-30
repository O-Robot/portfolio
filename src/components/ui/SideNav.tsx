"use client";

import Link from "next/link";
import { useState } from "react";
import ContactDropdown from "./ContactDropdown";

export default function SideNav() {
  const [showContact, setShowContact] = useState(false);

  return (
    <nav className="fixed bottom-10 right-8 flex flex-col items-center space-y-4 z-20">
      <Link
        href="/about"
        className="relative bg-background text-foreground px-3 py-2 text-sm"
      >
        <span className="absolute -inset-1 border border-foreground"></span>
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            height={24}
            width={24}
            className="fill-foreground"
          >
            <path d="M222 801q63-44 125-67.5T480 710q71 0 133.5 23.5T739 801q44-54 62.5-109T820 576q0-145-97.5-242.5T480 236q-145 0-242.5 97.5T140 576q0 61 19 116t63 109Zm257.814-195Q422 606 382.5 566.314q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314 566.5q-39.686 39.5-97.5 39.5Zm.654 370Q398 976 325 944.5q-73-31.5-127.5-86t-86-127.266Q80 658.468 80 575.734T111.5 420.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5 207.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5 731q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480 916q55 0 107.5-16T691 844q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480 916Zm0-370q34 0 55.5-21.5T557 469q0-34-21.5-55.5T480 392q-34 0-55.5 21.5T403 469q0 34 21.5 55.5T480 546Zm0-77Zm0 374Z" />
          </svg>
          <span className="ml-2">About Me</span>
        </div>
      </Link>

      <Link
        href="#"
        className="relative bg-background text-foreground px-3 py-2 text-sm"
      >
        <span className="absolute -inset-1 border border-foreground"></span>
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
            height={24}
            width={24}
            className="fill-foreground"
          >
            <path d="m480 926-360-280 50-37 310 241 310-241 50 37-360 280Zm0-152L120 494l360-280 360 280-360 280Zm0-301Zm0 225 262-204-262-204-262 204 262 204Z" />
          </svg>
          <span className="ml-2">Projects (web)</span>
        </div>
      </Link>

      <div className="relative">
        <button
          onClick={() => setShowContact(!showContact)}
          className="relative bg-background text-foreground px-3 py-2 text-sm"
        >
          <span className="absolute -inset-1 border border-foreground"></span>
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
              height={24}
              width={24}
              className="fill-foreground"
            >
              <path d="M475 916q5 0 11.5-2.5T497 907l337-338q13-13 19.5-29.667Q860 522.667 860 506q0-17-6.5-34T834 442L654 262q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q540 249 527 262l-18 18 81 82q13 14 23 32.5t10 40.5q0 38-29.5 67T526 531q-25 0-41.5-7.5t-30.185-21.341L381 429 200 610q-5 5-7 10.526-2 5.527-2 11.842 0 12.632 8.5 21.132 8.5 8.5 21.167 8.5 6.333 0 11.833-3t9.5-7l138-138 42 42-137 137q-5 5-7 11t-2 12q0 12 9 21t21 9q6 0 11.5-2.5t9.5-6.5l138-138 42 42-137 137q-4 4-6.5 10.333Q361 794.667 361 801q0 12 9 21t21 9q6 0 11-2t10-7l138-138 42 42-138 138q-5 5-7 11t-2 11q0 14 8 22t22 8Zm.064 60Q442 976 416 951.5t-31-60.619Q351 886 328 863t-28-57q-34-5-56.5-28.5T216 721q-37-5-61-30t-24-60q0-17 6.724-34.049T157 567l224-224 110 110q8 8 17.333 12.5Q517.667 470 527 470q13 0 24.5-11.5t11.5-24.654q0-5.846-3.5-13.346T548 405L405 262q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q291 249 278.059 261.857L126 414q-14 14-19.5 29.5t-6.5 35q-1 19.5 7.5 38T128 550l-43 43q-20-22-32.5-53T40 477q0-30 11.5-57.5T84 371l151-151q22-22 49.793-32.5 27.794-10.5 57-10.5Q371 177 398.5 187.5T448 220l18 18 18-18q22-22 49.793-32.5 27.794-10.5 57-10.5Q620 177 647.5 187.5T697 220l179 179q22 22 33 50.033t11 57Q920 535 909 562.5T876 612L539 949q-13 13-29.532 20t-34.404 7ZM377 430Z" />
            </svg>
            <span className="ml-2">Get In Touch</span>
          </div>
        </button>

        {showContact && (
          <ContactDropdown onClose={() => setShowContact(false)} />
        )}
      </div>
    </nav>
  );
}
