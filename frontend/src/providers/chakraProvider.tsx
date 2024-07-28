'use client';

import { ChakraProvider as Provider } from "@chakra-ui/react";
import { ReactNode } from "react";

const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ChakraProvider;
