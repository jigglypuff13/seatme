import '@testing-library/jest-dom/extend-expect';
import { createRoot } from 'react-dom/client';

interface ReactDOMClient {
  createRoot: (container: Element | DocumentFragment) => any;
}

declare global {
  interface Window {
    ReactDOM: ReactDOMClient;
  }

  // Declare a new global variable to avoid conflicting with the existing `window` object
  var globalWindow: Window;
}

export {};
