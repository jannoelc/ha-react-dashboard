import React, { useEffect } from "react";

import { useCustomElement, useHass } from "@/hooks/hass";
import { fireEvent } from "@/helpers/hass";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as NextNavbar,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useRootElement } from "@/hooks/layout";

export const Navbar: React.FC<React.PropsWithChildren> = () => {
  const customElement = useCustomElement();
  const rootElement = useRootElement();

  const user = useHass(({ hass }) => hass?.user);
  const personState = useHass(
    ({ hass }) =>
      user &&
      Object.values(hass?.states ?? {})
        .filter(({ entity_id }) => entity_id.startsWith("person."))
        .find(({ attributes }) => attributes.user_id === user.id)
  );

  useEffect(() => {
    Promise.resolve().then(() => {
      console.log(rootElement.current, "yolo");
    });
  }, [rootElement]);

  return (
    <NextNavbar
      disableAnimation
      isMenuOpen={false}
      onMenuOpenChange={() => {
        fireEvent(customElement!, "hass-toggle-menu");
      }}
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end" portalContainer={rootElement.current!}>
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              name={personState?.attributes.friendly_name}
              size="md"
              radius="md"
              src={personState?.attributes.entity_picture}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="bordered"
            className="bg-content4"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextNavbar>
  );
};
