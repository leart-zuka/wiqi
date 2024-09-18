"use client";
import DropDown from "@/app/components/DropDownSelect";
import Example from "@/app/components/FlyoutLink";
import { useState } from "react";

export default function QTLayout({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState("");
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-center text-2xl font-bold underline grow my-8">
          Quantum Tuesdays
        </h1>
        <Example className="right-10" />
      </div>
      <div className="p-20">{children}</div>
    </div>
  );
}
