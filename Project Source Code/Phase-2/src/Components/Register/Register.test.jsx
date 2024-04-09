// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Register/>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const { getByText } = render(<Register></Register>);
    const button = getByText('Click me');
    fireEvent.click(button);
   // expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
