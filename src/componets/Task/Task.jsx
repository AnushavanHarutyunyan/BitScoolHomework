import styles from './Task.module.css';

const Task = ({ tasks, active, onClick }) => {
    const click = (e) => {
        onClick(e.target);
    };
    return (
        <div className={active ? styles.p : styles.task} onClick={click}>
            <p>Task - {tasks}</p>
        </div>
    );
};

export default Task;
