import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCookie from "@/hooks/cookie/useCookie";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { user } from "@/redux/login/loginSlice";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  FormControl,
  FormErrorMessage,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { isUserLoggedIn , validateEmail} from "@/utils/helpers";
import { FormData } from "@/utils/type";
import { API_URL_SIGNUP } from "@/config/constantMaps";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [authError, setAuthError] = useState<string | null>(null); // State variable for auth error
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { setAuthCookie } = useCookie();
 
  const validate = (name: keyof FormData, value: string): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (name === "username" && !value) {
      newErrors.username = "Please enter your username";
    }

    if (name === "email") {
      if (!value) {
        newErrors.email = "Please enter your email";
      } else if (!validateEmail(value)) {
        newErrors.email = "Email address is not correct";
      }
    }

    if (name === "password" && !value) {
      newErrors.password = "Please enter your password";
    }

    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setAuthError(null); // Clear auth error when user starts typing

    const fieldName = name as keyof FormData;
    const newErrors = validate(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: newErrors[fieldName],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameErrors = validate("username", formData.username);
    const emailErrors = validate("email", formData.email);
    const passwordErrors = validate("password", formData.password);

    if (
      Object.keys(usernameErrors).length > 0 ||
      Object.keys(emailErrors).length > 0 ||
      Object.keys(passwordErrors).length > 0
    ) {
      setErrors({ ...usernameErrors, ...emailErrors, ...passwordErrors });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        API_URL_SIGNUP,
        formData
      );
      localStorage.setItem("token", response.data.token);
      setAuthCookie("token", response.data.token);
      dispatch(user());
      isUserLoggedIn();
      router.push("/projects");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setAuthError(error.response.data.message);
      } else {
        console.error("Sign up failed:", error);
      }
    } finally {
      setIsLoading(false);
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
        <FormControl isInvalid={!!errors.username}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            width={{ lg: "500px", sm: "250px" }}
            borderRadius={"6px"}
            borderWidth={"1px"}
            borderColor={"gray.500"}
            padding={"15px 20px"}
            gap={"10px"}
          />
          {errors.username && (
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email || !!authError}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            width={{ lg: "500px", sm: "250px" }}
            borderRadius={"6px"}
            borderWidth={"1px"}
            borderColor={"gray.500"}
            padding={"15px 20px"}
            gap={"10px"}
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
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
              borderColor={"gray.500"}
              padding={"15px 20px"}
              gap={"10px"}
            />
            <InputRightElement width={"4.5rem"}>
              <IconButton
                aria-label={show ? "Hide password" : "Show password"}
                icon={
                  show ? (
                    <FaEyeSlash color="gray.500" />
                  ) : (
                    <FaEye color="gray.500" />
                  )
                }
                onClick={() => setShow(!show)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          borderRadius="6px"
          padding="10px 80px"
          disabled={isLoading}
          colorScheme="blue"
        >
          {isLoading && <Spinner mr="10px" size="sm" />}
          <Text>Sign up</Text>
        </Button>
      </form>
    </Stack>
  );
};

export default SignUpForm;
