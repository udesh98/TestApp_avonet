import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/store";

ReactDOM.render(
	// <React.StrictMode>
	// 	<BrowserRouter>
	// 		<App />
	// 	</BrowserRouter>
	// </React.StrictMode>,

	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
