"use client";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useCookie from "@/hooks/cookie/useCookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import { userLogout } from "@/redux/login/loginSlice";
import { isUserLoggedIn } from "@/utils/helpers";
import { RootState } from "@/redux/store";
import { setUserInfo } from "@/redux/user/userInfoSlice";

interface Option {
  name: string;
  icon: any;
  url: string;
}

const options: Option[] = [
  {
    name: "Logout",
    icon: RiLogoutCircleRLine,
    url: "/",
  },
];

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { removeCookie, getCookie } = useCookie();
  const userId = useSelector((state: RootState) => state.userDetails);
  const pathname = usePathname();
  /* const isLogin = useSelector((state: RootState) => state.user.isLoggedIn) || userId;
  const isLoggedIn = isUserLoggedIn() ; */
  console.log({ isLoggedIn });
  // console.log(!isLoggedIn);
  //console.log(!!isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(options[0].name);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookie("token");
    dispatch(userLogout());
    dispatch(setUserInfo(null));
    setIsLoggedIn(false);
    router.push("/login");
    console.log("logged out");
  };

  const handleClick = () => {
    if(!isLoggedIn){
     // console.log({isLoggedIn})
      router.push("/login");
    }
  };

  const handleSelectChange = (opt: string) => {
    setSelectedOption(opt);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative" ref={dropdownRef} bgColor="transparent">
      <Box
        onClick={toggleDropdown}
        justifyContent="center"
        alignItems="center"
        padding="8px 4px"
        cursor="pointer"
      >
        <Flex
          cursor={isLoggedIn ? "" : "pointer"}
          onClick={handleClick}
          title={isLoggedIn ? "" : "login"}
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <Image
            src={"/images/userLogo.svg"}
            alt="project"
            width={40}
            height={40}
          />
          {isLoggedIn && <FaAngleDown />}
        </Flex>
      </Box>

      {isOpen && isLoggedIn && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="max-content"
          borderRadius="6px"
          marginTop="4px"
          zIndex="1"
          boxShadow="0 4px 8px rgba(0,0,0,0.1)"
          bgColor="#0c8ce9"
          color={"#fff"}
        >
          {options.map((opt, i) => (
            <Box
              key={i}
              onClick={() => {
                handleSelectChange(opt.name);
                if (opt.name === "Logout") {
                  handleLogout();
                } else {
                  router.push(opt.url);
                }
                setIsOpen(false);
              }}
              cursor="pointer"
              _hover={{
                bgColor: "#71c9fb",
                color: "#0a487e",
                borderRadius: "6px",
              }}
              padding="8px 10px"
              width="full"
              display="flex"
              justifyContent="start"
              alignItems="center"
              gap="6px"
            >
              <Icon fontWeight={700} as={opt.icon} />
              <Text fontWeight={600}>{opt.name}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserDropdown;
