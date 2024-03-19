import { Disclosure, Menu } from "@headlessui/react";
import UnitConversion from "./UnitConversion";

export default function Nav() {
  return (
    <Disclosure as="nav" className="bg-[#1e213b]">
      {() => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-auto"
                    src="/cloud-large.png"
                    alt="Your Company"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <UnitConversion />

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/graceRuby.jpg"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
