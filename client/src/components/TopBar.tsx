import { useState, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import BtnFile from "./BtnFile";
import BtnEdit from "./BtnEdit";
import BtnSprite from "./BtnSprite";
import logo from "../assets/images/logo.png";

type Tab = "file" | "edit" | "sprite" | null;

export default function TopBar() {
  const [openTab, setOpenTab] = useState<Tab>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  useClickOutside(tabRef, () => setOpenTab(null));

  function handleToggle(tab: Tab) {
    setOpenTab((prev) => (prev === tab ? null : tab));
  }

  function handleHoverOpen(tab: Tab) {
    if (openTab && openTab !== tab) setOpenTab(tab);
  }

  return (
    <div className="flex h-9 items-center bg-zinc-700 px-4">
      <img
        className="mr-4 h-5"
        style={{ imageRendering: "pixelated" }}
        src={logo}
        alt="SpriteDraw"
      />
      <div ref={tabRef} className="flex items-center">
        <BtnFile
          isOpen={openTab === "file"}
          onToggle={() => handleToggle("file")}
          onHoverOpen={() => handleHoverOpen("file")}
          onClose={() => setOpenTab(null)}
        />
        <BtnEdit
          isOpen={openTab === "edit"}
          onToggle={() => handleToggle("edit")}
          onHoverOpen={() => handleHoverOpen("edit")}
          onClose={() => setOpenTab(null)}
        />
        <BtnSprite
          isOpen={openTab === "sprite"}
          onToggle={() => handleToggle("sprite")}
          onHoverOpen={() => handleHoverOpen("sprite")}
          onClose={() => setOpenTab(null)}
        />
      </div>
    </div>
  );
}
