// Technically this could be a server component using a server action for the redirect
// but decided to wait until Server Actions are out of beta for now.
// It's a tiny client component anyway :)

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/SearchIcon";

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    router.push(`/search?s=${searchTerm}`);
  };

  const handleIconClick = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-end mr-6">
        <button onClick={handleIconClick} className={"mr-2"}>
          <SearchIcon />
        </button>
        {isOpen && (
          <form onSubmit={handleSubmit} className="my-auto hidden md:block">
            <input
              placeholder="Search..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2 p-1"
            />
            <button type="submit" disabled={searchTerm.length === 0}>
              Go
            </button>
          </form>
        )}
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} className="my-auto flex flex-row col-span-4 md:hidden">
          <input
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-4 mr-2 w-5/6 p-1"
          />
          <button type="submit" disabled={searchTerm.length === 0}>
            Go
          </button>
        </form>
      )}
    </>
  );
};

export default SearchBar;
