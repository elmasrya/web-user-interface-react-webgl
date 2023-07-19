import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/index";
import packageJson from "../package.json";
import PMDataProvider from "./hooks/PMDataProvider";

// The Bootstrap CSS files need to be imported before the App Import
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App/App";

// import reportWebVitals from './reportWebVitals';

console.log(`App Version: ${packageJson.version}`);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    // <React.StrictMode>
        <PMDataProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </PMDataProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
// reportWebVitals();
