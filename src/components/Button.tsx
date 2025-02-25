import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

export default function Button(props: {
    children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement> | undefined, 
    type: string}) {
  return (
    <button className={`${styles.btn} ${styles[props.type]}`} onClick={props.onClick}>
        {props.children}
    </button>
  )
}
