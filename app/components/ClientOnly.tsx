"use client";
import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  return <div>{children}</div>;
};

export default ClientOnly;
