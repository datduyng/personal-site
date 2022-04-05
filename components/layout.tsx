import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl h-full xs:px-1 overflow-y">{children}</div>;
}
