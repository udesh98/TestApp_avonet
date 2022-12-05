import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Todo from "./components/Todo";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
	const user = localStorage.getItem("token");
	const projectId = useSelector(state => state.id);
	const projectTitle = useSelector(state => state.title);

	return (
		<Fragment>
			{user && <Main />}
			<Routes>
			{!user && <Route path="/signup" exact element={<Signup />} />}
			{!user && <Route path="/login" exact element={<Login />} />}
			{user && <Route path="/home" exact element={<Home />} />}
			{user && <Route path="/projects" exact element={<Projects />} />}
			{user && <Route path="/projects/tasks" exact element={<Tasks projectId={projectId} projectTitle={projectTitle}/>} />}
			{user && <Route path="/todo" exact element={<Todo />} />}
			
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/home" element={<Navigate replace to="/login" />} />
			<Route path="/projects" element={<Navigate replace to="/login" />} />
			<Route path="/projects/tasks" element={<Navigate replace to="/login" />} />
			<Route path="/todo" element={<Navigate replace to="/login" />} />
			<Route path="/login" element={<Navigate replace to="/home" />} />
			<Route path="/signup" element={<Navigate replace to="/home" />} />
		</Routes>
		</Fragment>
		
	);
}

export default App;
