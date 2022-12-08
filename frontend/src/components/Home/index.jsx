import React, { useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./styles.module.css";

const Home = (props) => {
    const [dimension, setDimension] = useState(false);

    const pending = props.todoDetails.filter(item => item.status === "pending");
    const completed = props.todoDetails.filter(item => item.status === "completed");

    const data = [
        ["Task", "Hours per Day"],
        ["Pending", pending.length],
        ["Completed", completed.length] // CSS-style declaration
    ];

    const options = {
        title: "Todo Tasks",
        pieHole: 0.3,
        is3D: dimension,
    };

    const handleClick3D = () => {
        setDimension(true);
    }

    const handleClick2D = () => {
        setDimension(false);
    }

    return (
        <div>
            <center>
                <br /><br /><hr /><h1>Dashboard</h1><hr /><br /><br />
            </center>
            {(pending.length || completed.length) === 0 && <center><h2>You haven't been assigned for any tasks!</h2></center>}
            {(pending.length || completed.length) !== 0 && <section>
                <div>
                    <section className={styles.cards}>
                        <div className={styles.card_items}>
                            <h1>{pending.length}</h1><br />
                            <address style={{ color: 'green' }}>
                                Pending Tasks
                            </address>
                        </div>
                        <div className={styles.pie_chart}>
                            <Chart
                                chartType="PieChart"
                                width="600px"
                                height="400px"
                                data={data}
                                options={options}
                            />
                            <br /><br />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <button onClick={handleClick3D}>3D</button>
                                    <button onClick={handleClick2D}>2D</button>
                                </div>
                                <h1>Tasks Chart</h1>
                            </div>
                        </div>
                        <div className={styles.card_items}>
                            <h1>{completed.length}</h1><br />
                            <address style={{ color: 'green' }}>
                                Completed Tasks
                            </address>
                        </div>
                    </section>
                </div>
            </section>}
        </div>
    );
}

export default Home;