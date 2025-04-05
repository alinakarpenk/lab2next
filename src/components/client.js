"use client";
import { useEffect } from "react";

const ClientLogger = () => {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  }, []);

  return
};

export default ClientLogger;