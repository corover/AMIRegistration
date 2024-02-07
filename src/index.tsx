import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre style={{ color: "red" }}>{error.message}</pre>
//       <button onClick={resetErrorBoundary}> onreset </button>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        console.log(details);
      }}
    > */}
    <App />
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
