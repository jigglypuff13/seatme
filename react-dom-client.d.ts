interface ReactDOMClient {
  // Define the shape of ReactDOMClient if necessary
  // For example:
  createRoot: (container: Element | DocumentFragment) => any;
}

interface Window {
  ReactDOM: ReactDOMClient;
}
