"use client";

import { Button, Navbar } from "flowbite-react";

export function Component() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <img src="./src/assets/ico.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kiraroshop
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="./src/pages/about.tsx">About</Navbar.Link>
          <Navbar.Link href="#">Products</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
