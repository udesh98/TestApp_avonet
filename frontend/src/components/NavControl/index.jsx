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
			
			<button className={styles.menu_item}>
				About
			</button>
		</section>
	);
};

export default Main;
