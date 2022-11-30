import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Projects = () => {
    const user = localStorage.getItem("token");
    const date = new Date();
    
    const [data, setData] = useState({
        title: "",
        description: "",
        user: user,
        status: "pending",
        date: date.getTime(),
        // email: "",
        // password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/projects/create-project";
            const { data: res } = await axios.post(url, data);
            navigate("/home");
            console.log(res);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <div>
            <h1>Projects</h1>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create A New Project</h1>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={data.title}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                    required
                    className={styles.input}
                />
                {/* <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/> */}
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Create Project
                </button>
            </form>

            <div>
                {user}
            </div>
        </div>
    );
}

export default Projects;