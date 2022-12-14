import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import ProjectItems from "../ProjectItems";

const Projects = () => {
    const user = localStorage.getItem("token");
    const date = new Date();

    const [data, setData] = useState({
        title: "",
        description: "",
        user: user,
        status: "pending",
        date: date.getTime(),
    });
    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const navigate = useNavigate();

    const showForm = (e) => {
        setVisible(!visible);
        if (data.title !== "" || data.description !== "") {
            setData(prevData => {
                return {
                    ...prevData,
                    title: "",
                    description: ""
                }
            });
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        setData(prevData => {
            return {
                ...prevData,
                [input.name]: input.value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/projects/create-project";
            await axios.post(url, data).then((res) => {
                console.log(res.data);
            });
            setVisible(!visible);
            setData({
                    title: "",
                    description: ""
                }
            );
            viewProjects();
            navigate("/projects");
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    const viewProjects = async () => {
        try {
            const url = "http://localhost:8080/api/projects/";
            await axios.get(url, { params: { token: user } }).then((response) => {
                const arr = response.data;
                // console.log(arr);
                if (arr.length === 0) {
                    setError(true);
                    setErrorText("You haven't created any project!");
                };
                setProjects(arr);
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };
    // console.log("outside render");

    useEffect(() => {
        viewProjects();
        // console.log("render projects");
    }, []);

    return (
        <div>
            <br />
            <center>{!visible && <button className={styles.createProject_btn} onClick={showForm} type="button">Create Project</button>}</center>
            {error && <section><br /><br /><center><h1>{errorText}</h1></center></section>}
            {visible && <section>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    {visible && <button className={styles.cancel_btn} onClick={showForm} type="reset">x</button>}
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

                    <button type="submit" className={styles.green_btn}>
                        Create Project
                    </button>
                </form>
            </section>}

            <section>
                <ProjectItems details={projects} viewProjects={viewProjects}/>
            </section>
        </div>
    );
}

export default Projects;