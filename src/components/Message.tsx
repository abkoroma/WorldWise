import styles from "./Message.module.css";

function Message(props: { message: string }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {props.message}
    </p>
  );
}

export default Message;
