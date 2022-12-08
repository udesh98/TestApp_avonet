import styles from "./styles.module.css";

const TaskItems = (props) => {
    // console.log(props.details.length);
    const errorText = "No tasks have been created yet!";
    return (
        <div>
            <center><br /><br /><h2 className={styles.title}>Project : {props.projectTitle}</h2></center>
            {props.details.length===0 && <section><br /><center><h1>{errorText}</h1></center></section>}
            {props.details.length!==0 && <section>
                <center>
                    <table>
                        <tr>
                            <th align="left">Task</th>
                            <th align="left">Description</th>
                            <th align="left">Assigned user</th>
                            <th align="right">Status</th>
                        </tr>
                        {props.details.map((item) => {
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