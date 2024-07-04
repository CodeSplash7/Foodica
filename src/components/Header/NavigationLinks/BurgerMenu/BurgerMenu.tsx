"use client";

import "./styles.css";

import Icon from "./Icon";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Links from "./Links";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burger-menu-container flex md:hidden flex-col relative w-full">
      <Icon isOpen={isOpen} setIsOpen={setIsOpen} />
      <Links isOpen={isOpen} />
    </div>
  );
}
