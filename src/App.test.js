import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// let's start by testing if the onSubmit function was correctly called
// we'll test against two cases: one with valid inputs and one without
describe('App', () => {
  describe('with valid inputs', () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn();
      const { getByText, getByRole } = render(
        <App onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        fireEvent.change(screen.getByText('name'), {
          target: { value: 'mike' },
        });
        fireEvent.change(screen.getByText('telephone'), {
          target: { value: '07932441232' },
        });
        fireEvent.change(screen.getByText('email address'), {
          target: { value: 'email@test.com' },
        });

      // I decided not to include textArea and acceptTerms as they this is strictly a valid
      // inputs test, not a validations test

      //   fireEvent.change(screen.getByText('textArea'), {
      //     // checking the min character length of 20
      //     target: { value: '11111111111111111111' },
      //   });
      //   fireEvent.change(screen.getByText('acceptTerms'), {
      //     target: { value: true },
      //   });
      // });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  // and now to test with invalid inputs
  describe('with invalid name', () => {
    it('renders the name validation error', async () => {
      const { getByText, container } = render(<App />);

      await act(async () => {
        const nameInput = screen.getByText('name');
        fireEvent.change(nameInput, { target: { value: 'invalid name' } });
        fireEvent.blur(nameInput);
      });

      expect(container.innerHTML).toMatch('Name must only include alphabetic characters', 'Your name must be at least 3 characters', 'Your name must not exceed 20 characters');
    });
  });

  describe('with invalid telephone', () => {
    it('renders the telephone validation error', async () => {
      const { getByText, container } = render(<App />);

      await act(async () => {
        const telephoneInput = screen.getByText('telephone');
        fireEvent.change(telephoneInput, { target: { value: 'invalid telephone' } });
        fireEvent.blur(telephoneInput);
      });

      expect(container.innerHTML).toMatch('Telephone number must be a U.K based number');
    });
  });

  describe('with invalid email', () => {
    it('renders the email validation error', async () => {
      const { getByText, container } = render(<SignIn />);

      await act(async () => {
        const emailInput = screen.getByText('email');
        fireEvent.change(emailInput, { target: { value: 'invalid email' } });
        fireEvent.blur(emailInput);
      });

      expect(container.innerHTML).toMatch('Enter a valid email');
    });
  });
});

// I hadn't done much TDD outside of Ruby so this is my first whack at it with JS
