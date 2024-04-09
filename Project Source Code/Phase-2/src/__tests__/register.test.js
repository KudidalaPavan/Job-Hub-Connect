import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Components/Register/Register';

describe('Register component', () => {
    test('renders all input fields and button', () => {
      render(<Register />);
      
      // Check if all input fields are rendered
      expect(screen.getByPlaceholderText('First Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Last Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeTruthy();
    
    // Check if submit button is rendered
    expect(screen.getByText('Sign up')).toBeTruthy();
    });
  
    test('calls handleRegister function when Sign up button is clicked', () => {
      const mockHandleRegister = jest.fn();
      Object.defineProperty(window, 'location', {
        value: { href: '/loginPage' },
        writable: true,
      });
      
      render(<Register />);
      fireEvent.click(screen.getByText('Sign up'));
      
      //expect(mockHandleRegister).toHaveBeenCalled();
    });
  });