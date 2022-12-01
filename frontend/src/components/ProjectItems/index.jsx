import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Swal from 'sweetalert2';

const ProjectItems = (props) => {
    const navigate = useNavigate();

    // const deleteProject = async (id) => {
    //     // console.log(id);
    //     try {
    //         const url = "http://localhost:8080/api/projects/deleteProject/";
    //         await axios.delete(url, { params: { id: id } }).then((response) => {
    //             console.log(response.statusText);
    //         })
    //         navigate("/home");
    //     } catch (error) {
    //         console.log(error.response.statusText);
    //     }
    // };

    const deleteProject = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const url = "http://localhost:8080/api/projects/deleteProject/";
                    await axios.delete(url, { params: { id: id } }).then((response) => {
                        console.log(response.statusText);
                    })
                    setTimeout(5000);
                    navigate("/home");
                } catch (error) {
                    console.log(error.response.statusText);
                }
                Swal.fire(
                    'Deleted!',
                    'Project has been deleted.',
                    'success'
                )
            }
        })
    };

    return (
        <section style={{
            display: 'flex',
            gridGap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            // gridTemplateColumns: 'repeat(3, calc(33.33% - 20px))',
            flexWrap: 'wrap',
            marginTop: '100px',
        }}>
            {props.details.map((item) => {
                return (
                    <div key={item.id} style={{
                        width: '300px',
                        padding: '100px 50px 50px 50px',
                        margin: 'auto',
                        borderRadius: '10px',
                        textAlign: 'center',
                        marginBottom: '50px',
                        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.4)',
                        overflowWrap: 'break-word'
                    }}>
                        <h2>{item.title}</h2><br />
                        <address>{item.date}</address><br />
                        <p style={{ fontSize: '18px' }}>{item.description}</p>
                        <button type="submit" className={styles.green_btn} value={item.id} onClick={(e) => deleteProject(e.target.value)}>
                            Delete
                        </button>
                    </div>
                )
            })}
        </section>
    );
}

export default ProjectItems;