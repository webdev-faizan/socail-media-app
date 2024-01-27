"use client";
import React, { useState } from "react";
import ResponsiveTopBar from "./ResponsiveTopbar";
import NavigratioNav from "./NavigationNav";

const ResponsiveLayoutWithSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <NavigratioNav showSidebar={showSidebar} dispatch={setShowSidebar} />
      <ResponsiveTopBar dispatch={setShowSidebar} />
    </div>
  );
};

export default ResponsiveLayoutWithSidebar;
