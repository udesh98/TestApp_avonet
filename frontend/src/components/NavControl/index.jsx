import styles from "./styles.module.css";

const Main = () => {

	return (
		<section className={styles.menu}>
				<button className={styles.menu_item}>
					Home
				</button>
				<button className={styles.menu_item}>
					Tasks
				</button>
				<button className={styles.menu_item}>
					About
				</button>
		</section>
	);
};

export default Main;
