import styles from "./CountryItem.module.css";

export default function CountryItem(props: { country: { country: string, emoji: string, } }) {

  return (
    <li className={styles.countryItem}>
      <span>{props.country.emoji}</span>
      <span>{props.country.country}</span>
    </li>
  );
}
