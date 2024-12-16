"use client";

import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import icoImage from '../assets/ico.svg'
import scrollToSection from "./scrollSection";

export function Foot() {
  return (
    <Footer container className="bg-gray-50">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="https://jonastino21.github.io/kiraroshop-front/"
              src={icoImage}
              alt="Logo"
              name="Kiraroshop"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://jonastino21.github.io/kiraroshop-front/">Kiraroshop</Footer.Link>
                <Footer.Link href="https://jonastino21.github.io/kiraroshop-front/">Kiraro</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Jonastino21">Github</Footer.Link>
                <Footer.Link href="https://www.facebook.com/profile.php?id=100088673478688">Facebook</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://jonastino21.github.io/kiraroshop-front/">Privacy Policy</Footer.Link>
                <Footer.Link href="https://jonastino21.github.io/kiraroshop-front/">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright onClick={() => scrollToSection("home")} by="TheFuture" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon onClick={() => scrollToSection("home")} icon={BsFacebook} />
            <Footer.Icon onClick={() => scrollToSection("home")} icon={BsInstagram} />
            <Footer.Icon onClick={() => scrollToSection("home")} icon={BsTwitter} />
            <Footer.Icon onClick={() => scrollToSection("home")} icon={BsGithub} />
            <Footer.Icon onClick={() => scrollToSection("home")} icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
