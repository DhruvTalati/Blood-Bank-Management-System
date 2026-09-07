import { render, screen } from '@testing-library/react';
import FormInput from '../FormInput';

test('renders a reusable form input with label and placeholder', () => {
  render(
    <FormInput
      label="Full Name"
      name="fullName"
      value=""
      onChange={() => {}}
      placeholder="Enter full name"
    />
  );

  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter full name/i)).toBeInTheDocument();
});
