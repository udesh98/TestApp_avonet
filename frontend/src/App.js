import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Projects from "./components/Projects";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			{user && <Route path="/home" exact element={<Home />} />}
			{user && <Route path="/projects" exact element={<Projects />} />}
			
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/home" element={<Navigate replace to="/login" />} />
			<Route path="/projects" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
