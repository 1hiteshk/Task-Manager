import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCookie from "@/hooks/cookie/useCookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { user } from "@/redux/login/loginSlice";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  // Initialize state with empty strings for username and password
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  console.log(formData.password);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { setAuthCookie } = useCookie();
  const [show, setShow] = useState(true);

  // Handle input field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send a POST request to the login API
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      // Save the token to local storage
      localStorage.setItem("token", response.data.token);
      setAuthCookie("token", response?.data.token);
      dispatch(user()); // to update user isLogged in loginSlice
      // Redirect to the home page
      router.push("/projects");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Stack gap={"20px"} mt={"20px"}>
      <form
        style={{
          gap: "20px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          width={{ lg: "500px", sm: "250px" }}
          borderRadius={"6px"}
          borderWidth={"1px"}
          padding={"15px 20px"}
          gap={"10px"}
        />
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            width={{ lg: "500px", sm: "250px" }}
            borderRadius={"6px"}
            borderWidth={"1px"}
            padding={"15px 20px"}
            gap={"10px"}
          />
          <InputRightElement width={"4.5rem"}>
            <IconButton
              aria-label={show ? "Hide password" : "Show password"}
              icon={show ? <FaEyeSlash /> : <FaEye />}
              onClick={() => {
                setShow(!show);
              }}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>

        <Button type="submit">Login</Button>
      </form>
    </Stack>
  );
};

export default LoginForm;
