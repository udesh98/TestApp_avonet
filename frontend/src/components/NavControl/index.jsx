import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {

	return (
		<section className={styles.menu}>
			<NavLink to="/home">
				<button className={styles.menu_item}>
					Home
				</button>
			</NavLink>
			<NavLink to="/projects">
				<button className={styles.menu_item}>
					Projects
				</button>
			</NavLink>
			<NavLink to="/todo">
				<button className={styles.menu_item}>
					ToDo
				</button>
			</NavLink>
		</section>
	);
};

export default Main;
