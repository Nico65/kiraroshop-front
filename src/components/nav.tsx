"use client";

import icoImage from '../assets/ico.svg';
import { Button, Navbar } from "flowbite-react";
import scrollToSection from './scrollSection';

export function Component() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <img src={icoImage} className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kiraroshop
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button>Log in</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link  onClick={() => scrollToSection("home")}>
            Home
          </Navbar.Link>
          <Navbar.Link onClick={() => scrollToSection("about")}>About</Navbar.Link>
          <Navbar.Link onClick={() => scrollToSection("products")}>Products</Navbar.Link>
          <Navbar.Link onClick={() => scrollToSection("contact")}>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
