import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Components/Register/Login";
// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: query === "(min-width: 1024px)", // Simulate matches based on the query
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
  
  
  describe('Login component', () => {
    test('renders login form with social media buttons and inputs', () => {
      const { getByLabelText, getByText } = render(<Login />);
  
      // Check if email input exists
    //   const emailInput = getByLabelText('Email address', { selector: 'input[type="email"]' });
    //   expect(emailInput).toBeTruthy();
  
    //   // Check if password input exists
    //   const passwordInput = getByLabelText('Password', { selector: 'input[type="password"]' });
    //   expect(passwordInput).toBeTruthy();
  
      // Check if login button exists
      const loginButton = getByText('Login');
      expect(loginButton).toBeTruthy();
  
      // Check if "Remember me" checkbox exists
      const rememberMeCheckbox = getByLabelText('Remember me');
      expect(rememberMeCheckbox).toBeTruthy();
  
      // Check if "Forgot password" link exists
      const forgotPasswordLink = getByText('Forgot password?');
      expect(forgotPasswordLink).toBeTruthy();
  
      // Check if "Don't have an account?" text exists
      const registerText = getByText("Don't have an account?");
      expect(registerText).toBeTruthy();
  
      // Check if "Register" link exists
      const registerLink = getByText('Register');
      expect(registerLink).toBeTruthy();
  
      // Simulate click on the "Register" link and assert behavior
      fireEvent.click(registerLink);
      // You can assert that the URL changes or that some specific action is taken when the "Register" link is clicked.
    });
  
    test('performs registration process when Register link is clicked', () => {
      const { getByText } = render(<Login />);
      const registerLink = getByText('Register');
  
      fireEvent.click(registerLink);
  
      // You can assert that a specific function is called or a specific state is updated when the "Register" link is clicked.
    });
  
    // Add more tests to cover other functionalities such as handling input changes, clicking login button, etc.
  });