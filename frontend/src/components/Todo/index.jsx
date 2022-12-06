import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";

const Todo = (props) => {
    const user = localStorage.getItem("token");
    const [todo, setTodo] = useState({
        result: []
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const dispatch = useDispatch();

    const viewTodo = async () => {
        try {
            const url = "http://localhost:8080/api/todo/";
            await axios.get(url, { params: { token: user } }).then((response) => {
                const arr = response.data;
                // console.log(arr);
                
                dispatch({ type: 'setTodo', payload: {arr} });

                if (arr.length === 0) {
                    setError(true);
                    setErrorText("You haven't been assigned for any task!");
                };
                setTodo((prevTodo) => {
                    return {
                        ...prevTodo,
                        result: arr,
                    }
                });
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    const handleComplete = async (status, taskId) => {
        try {
            const url = "http://localhost:8080/api/todo/update-task";
            await axios.put(url, { taskId: taskId, status: status }).then((response) => {
                const arr = response.data;
                console.log(arr);
            }
            );
        } catch (error) {
            console.log(error.response.statusText);
        }
    };

    // useEffect(() => {
    //     viewTodo();
    // }, []);

    useEffect(() => {
        viewTodo();
    }, [todo]);

    return (
        <div>
            {error && <section><br /><br /><br /><br /><center><h1>{errorText}</h1></center></section>}
            {!error && <section>
                <center>
                    <br /><br /><br />
                    <table>
                        <tr>
                            <th align="left">Task</th>
                            <th align="left">Description</th>
                            <th align="left">Assigned user</th>
                            <th align="left">Status</th>
                            <th align="right">Mark as complete</th>
                        </tr>
                        {todo.result.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td align="left">{item.title}</td>
                                    <td align="left">{item.description}</td>
                                    <td align="left">{item.assignedUserEmail}</td>
                                    <td align="left">{item.status}</td>
                                    <td align="right">
                                        <button
                                            className={styles.green_btn}
                                            onClick={() => handleComplete("completed", item._id)}
                                            style={{ backgroundColor: item.status === "pending" ? '#3CB371' : 'transparent' }}
                                            disabled={item.status === "completed" ? true : false}>
                                            {item.status === "pending" ? "Complete" : "Successfully completed"}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </center>
            </section>}
        </div>
    )
}

export default Todo;