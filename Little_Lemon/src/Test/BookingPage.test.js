// FILEPATH: /C:/Users/Asus/Desktop/Little Lemon/Resturant-Reservation/Little_Lemon/src/pages/BookingPage.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';

jest.mock('../api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

test('renders BookingPage', () => {
  render(
    <Router>
      <BookingPage />
    </Router>
  );
  const bookingFormElement = screen.getByTestId('booking-form');
  expect(bookingFormElement).toBeInTheDocument();
});

test('submits form and navigates to confirmation page', async () => {
  const { fetchAPI, submitAPI } = require('../api');
  fetchAPI.mockResolvedValue([]);
  submitAPI.mockResolvedValue(true);

  render(
    <Router>
      <BookingPage />
    </Router>
  );

  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  await screen.findByText(/confirmed/i);

  expect(submitAPI).toHaveBeenCalled();
});