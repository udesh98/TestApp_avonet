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
        result: []
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

    // const viewProjects1 = () => {
    //     try {
    //         const url = "http://localhost:8080/api/projects/";
    //         // console.log(data.user);
    //         const { data: res } = axios.get(url);
    //         // navigate("/home");
    //         console.log(res);
    //     } catch (error) {
    //         if (
    //             error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //         ) {
    //             setError(error.response.data.message);
    //         }
    //     }
    // };

    const viewProjects = async () => {
        try {
            const url = "http://localhost:8080/api/projects/";
            await axios.get(url, { params: { token: data.user } }).then((response) => {
                const arr = response.data;
                console.log(arr);
                // let projectDetails = [];
                if (data.result !== arr) {
                    arr.map((item) => {
                        data.result.push({
                            title: item.title,
                            description: item.description,
                            date: item.date,
                            id: item._id
                        })

                        // setData((prevState) => {
                        //     return {
                        //         ...prevState,
                        //         result: prevState.result + projectDetails,
                        //     }
                        // })
                    });
                }

                // console.log(data);
                // setData((prevState) => {
                //     return {
                //         ...prevState,
                //         result: prevState.result + projectDetails,
                //     }
                // })
                console.log(data);
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    useEffect(() => {
        viewProjects();
    }, [data.result]);

    return (
        <div>
            {/* <h1>Projects</h1> */}
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
                
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                    Create Project
                </button>
            </form>

            <ProjectItems details={data.result}/>
        </div>


    );
}

export default Projects;