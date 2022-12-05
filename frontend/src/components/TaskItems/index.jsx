import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const TaskItems = (props) => {
    const [tasks, setTasks] = useState({
        result: []
    });

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const viewTasks = async () => {
        try {
            const url = "http://localhost:8080/api/projects/tasks/";
            await axios.get(url, { params: { projectId: props.details.projectId } }).then((response) => {
                const arr = response.data;
                // console.log(arr.length);
                if (arr.length === 0) {
                    setError(true);
                    setErrorText("No tasks have been assigned for this project!");
                };
                // console.log(arr);
                setTasks((prevTasks) => {
                    return {
                        ...prevTasks,
                        result: arr,
                    }
                });
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    useEffect(() => {
        viewTasks();
    }, []);

    return (
        <div>
            <center><br /><br /><h2 className={styles.title}>Project : {props.projectTitle}</h2></center>
            {error && <section><br /><br /><center><h1>{errorText}</h1></center></section>}
            {!error && <section>
                <center>
                    <table>
                        <tr>
                            <th align="left">Task</th>
                            <th align="left">Description</th>
                            <th align="left">Assigned user</th>
                            <th align="right">Status</th>
                        </tr>
                        {tasks.result.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td align="left">{item.title}</td>
                                    <td align="left">{item.description}</td>
                                    <td align="left">{item.assignedUserEmail}</td>
                                    <td align="right">{item.status}</td>
                                </tr>
                            )
                        })}
                    </table>
                </center>
            </section>}
        </div>
    )
}

export default TaskItems;