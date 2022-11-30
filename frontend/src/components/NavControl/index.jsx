import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {

	return (
		<section className={styles.menu}>
			<Link to="/home">
				<button className={styles.menu_item}>
					Home
				</button>
			</Link>
			<Link to="/projects">
				<button className={styles.menu_item}>
					Projects
				</button>
			</Link>
			
			<button className={styles.menu_item}>
				About
			</button>
		</section>
	);
};

export default Main;
