import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import TaskItems from "../TaskItems";

const Tasks = (props) => {
    const user = localStorage.getItem("token");
    const date = new Date();

    const [data, setData] = useState({
        projectId: props.projectId,
        assignedUserEmail: "",
        title: "",
        description: "",
        userId: user,
        status: "pending",
        date: date.getTime(),
        result: []
    });

    // const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const showForm = (e) => {
        setVisible(!visible);
        if (data.title !== "" || data.description !== "" || data.assignedUserEmail !== "") {
            setData(prevData => {
                return {
                    ...prevData,
                    title: "",
                    description: "",
                    assignedUserEmail: ""
                }
            });
        }
    };

    const handleChange = ({ currentTarget: input, currentTarget: select }) => {
        setData(prevData => {
            return {
                ...prevData,
                [input.name]: input.value,
                assignedUserEmail: select.value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/projects/tasks/create-task";
            await axios.post(url, data).then((res) => {
                console.log(res.data);
            });
            setVisible(!visible);
            setData(prevData => {
                return {
                    ...prevData,
                    title: "",
                    description: "",
                    assignedUserEmail: ""
                }
            });
            navigate("/projects/tasks");
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    const selectAllUsers = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users/getAll";
            await axios.get(url, { params: { token: user } }).then((response) => {
                const arr = response.data;
                // console.log(arr);
                setData((prevData) => {
                    return {
                        ...prevData,
                        result: arr,
                    }
                });
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    // console.log(data);

    return (
        <div>
            <section>
                <br /><br /><hr /><center><h1>Tasks</h1></center><hr />
                {/* <address>{props.projectId}</address> */}
            </section>
            <center>{!visible && <button className={styles.createProject_btn} onClick={showForm} type="button">Create Task</button>}</center>

            {visible && <section>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    {visible && <button className={styles.cancel_btn} onClick={showForm} type="reset">x</button>}
                    <h1>Create A New Task</h1>
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
                    <select className={styles.select} required onChange={handleChange} onClick={selectAllUsers}>
                        <option value="" disabled selected>Select Employee</option>
                        {data.result.map((item) => {
                            return (
                                <option type="text" name="assignedUserEmail" value={item.email} className={styles.select} key={item._id}>{item.firstName}&nbsp;{item.lastName}</option>
                            )
                        })}
                    </select>

                    <button type="submit" className={styles.green_btn}>
                        Create Task
                    </button>
                </form>
            </section>}

            <section>
                <TaskItems details={data} projectTitle={props.projectTitle}/>
            </section>
        </div>
    );
}

export default Tasks;