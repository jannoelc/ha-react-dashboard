import { useHass } from "@/hooks/hass";
import { Divider } from "@nextui-org/react";
import React from "react";

export const WelcomeBanner: React.FC = () => {
  const userName = useHass(({ hass }) => hass?.user?.name);

  return (
    <div className="max-w-md">
      <div className="space-y">
        <h1 className="text-lg">Welcome {userName}</h1>
        <p className="text-small text-default-400">
          Beautiful, fast and modern React UI library.
        </p>
      </div>
      <Divider className="my-4" orientation="vertical" />
      <div className="flex h-5 items-center space-x-4 text-small">
        <div>Blog</div>
        <Divider orientation="vertical" />
        <div>Docs</div>
        <Divider orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
};
