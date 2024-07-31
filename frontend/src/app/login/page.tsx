"use client";
import LoginForm from "@/components/pages/auth/LoginForm";
import SignUpForm from "@/components/pages/auth/SignUpForm";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  return (
    <Box
      bgColor={"#D8DEF3"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"start"}
      pt={"100px"}
      alignItems={"center"}
      w={"full"}
      height={"100vh"}
    >
      <Box>
        <h1 className="font-bold text-3xl py-4 justify-center text-center">
          {isLoginMode ? "Sign In" : "Sign Up"}
        </h1>
        <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            width={{ lg: "500px", base: "100% !important" }}
          >
            <Button
              w={{ base: "100%", md: "50%" }}
              bgColor={!isLoginMode ? "#a8bbf0" : ""}
              onClick={() => setIsLoginMode(false)}
            >
              Sign up
            </Button>
            <Button
              w={{ base: "100%", md: "50%" }}
              bgColor={isLoginMode ? "#a8bbf0" : ""}
              onClick={() => setIsLoginMode(true)}
            >
              Login
            </Button>
          </Flex>

          {isLoginMode && <LoginForm />}
          {!isLoginMode && <SignUpForm />}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
