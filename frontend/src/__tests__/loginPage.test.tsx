import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // No need to import 'extend-expect'
import LoginPage from "@/app/login/LoginPage"; // Adjust the import path as necessary

describe("Page component", () => {
  test("renders sign up button and login button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders Sign Up heading by default", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("renders Sign In heading when login button is clicked", () => {
    render(<LoginPage />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("renders Sign Up heading when sign up button is clicked", () => {
    render(<LoginPage />);
    const loginButton = screen.getByText("Login");
    const signUpButton = screen.getByText("Sign up");

    // Switch to login mode first
    fireEvent.click(loginButton);
    expect(screen.getByText("Sign In")).toBeInTheDocument();

    // Switch back to sign up mode
    fireEvent.click(signUpButton);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("renders SignUpForm by default", () => {
    render(<LoginPage />);
    // Adjust this based on your SignUpForm content
    expect(
      screen.getByText("Sign Up Form Component Placeholder")
    ).toBeInTheDocument();
  });

  test("renders LoginForm when login button is clicked", () => {
    render(<LoginPage />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    // Adjust this based on your LoginForm content
    expect(
      screen.getByText("Login Form Component Placeholder")
    ).toBeInTheDocument();
  });

  test("renders SignUpForm when sign up button is clicked", () => {
    render(<LoginPage />);
    const loginButton = screen.getByText("Login");
    const signUpButton = screen.getByText("Sign up");

    // Switch to login mode first
    fireEvent.click(loginButton);
    // Adjust this based on your LoginForm content
    expect(
      screen.getByText("Login Form Component Placeholder")
    ).toBeInTheDocument();

    // Switch back to sign up mode
    fireEvent.click(signUpButton);
    // Adjust this based on your SignUpForm content
    expect(
      screen.getByText("Sign Up Form Component Placeholder")
    ).toBeInTheDocument();
  });
});
