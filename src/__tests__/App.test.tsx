// // // string in input, add string into students state array
// // // pull from myles grid for this test
// // ______________
// // App.test.tsx
// // import React from 'react';
// // import { render, screen } from '@testing-library/react';
// // import  App from '../client/App';

// // describe('App', () => {
// //   test('renders the SEATME heading', () => {
// //     render(<App />);
// //     const headingElement = screen.getByText('SEATME');
// //     expect(headingElement).toBeInTheDocument();
// //   });

// //   test('renders the StudentInput component', () => {
// //     render(<App />);
// //     const studentInputElement = screen.getByRole('textbox');
// //     expect(studentInputElement).toBeInTheDocument();
// //   });

// //   // Add more tests as needed
// // });

// // App.test.tsx
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import App from '../client/App';

// describe('App', () => {
//   test('renders the SEATME heading', () => {
//     // Create a mock DOM container
//     const container = document.createElement('div');
//     render(<App />, { container });
//     const headingElement = screen.getByText('SEATME');
//     expect(headingElement).toBeInTheDocument();
//   });

//   test('renders the StudentInput component', () => {
//     const container = document.createElement('div');
//     render(<App />, { container });
//     const studentInputElement = screen.getByRole('textbox');
//     expect(studentInputElement).toBeInTheDocument();
//   });

//   // Add more tests as needed
// });

// // import React from 'react';
// // import { render, screen } from '@testing-library/react';
// // import App from '../client/App';

// // describe('App', () => {
// //   test('renders the SEATME heading', () => {
// //     // Create a mock DOM container
// //     const container = document.createElement('div');
// //     render(<App />, { container });
// //     const headingElement = screen.getByText('SEATME');
// //     expect(headingElement).toBeInTheDocument();
// //   });

// //   test('renders the StudentInput component', () => {
// //     const container = document.createElement('div');
// //     render(<App />, { container });
// //     const studentInputElement = screen.getByRole('textbox');
// //     expect(studentInputElement).toBeInTheDocument();
// //   });
// });
