import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown({
  className,
  stateChange,
}: {
  className: string;
  stateChange: Dispatch<SetStateAction<string>>;
}) {
  const list_items = [
    "Elementary School Student",
    "Highschool Student",
    "College Student",
    "Tech Enthusiast",
  ];
  return (
    <Menu as="div" className={className}>
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-slate-800 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:border hover:border-slate-600 hover:bg-slate-700">
          Level
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-600">
          <div className="py-1">
            {list_items.map((level) => (
              <MenuItem key={level}>
                {({ focus }) => (
                  <div className="flex">
                    <a
                      href="#"
                      className={classNames(
                        focus ? "bg-slate-400 rounded-md" : "",
                        "block px-4 py-2 text-sm text-white",
                      )}
                      onClick={() => stateChange(level)}
                    >
                      {level}
                      {focus ? " ✓" : ""}
                    </a>
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
