// Import necessary modules
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../client/App';

// Describe the tests for the App component
describe('App component', () => {
  // Define a test case: "renders SEATME heading"
  it('renders SEATME heading', () => {
    // Render the App component
    render(<App />);
    // Find the heading element with the text "SEATME" (case insensitive)
    const headingElement = screen.getByText(/SEATME/i);
    // Assert that the heading element is present in the document
    expect(headingElement).toBeInTheDocument();
  });
});
