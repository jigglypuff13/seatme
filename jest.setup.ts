// import '@testing-library/jest-dom'
// import { createRoot } from 'react-dom/client';

// // Mock the createRoot function
// global.globalWindow = global as any;
// global.globalWindow.ReactDOM = {
//   createRoot: jest.fn()
// };

/*
Ensure global.d.ts correctly extends the Window interface and includes ReactDOM.
Make sure jest.setup.ts correctly initializes globalWindow.
Update tsconfig.json to include the setup file and necessary type definitions.
Ensure your Jest configuration points to the setup file.
By following these steps, TypeScript should recognize the ReactDOM property on the Window interface, and the error should be resolved.
*/