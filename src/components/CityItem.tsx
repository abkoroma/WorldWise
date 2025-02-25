import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { citytype } from '../cityInterface';
import { useContext } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));


export default function CityItem(props: {city: citytype}) {

    const { currentCity, deleteCity } = useContext(CitiesContext);
    const { cityName, emoji, date, id, position } = props.city;

    function handleDelete(e: { preventDefault: () => void; }) {
        e.preventDefault();
        deleteCity(id);
    }
 
    return (
        <li>
            <Link 
                className={`${styles.cityItem} ${id === currentCity?.id ? 
                    styles['cityItem--active'] : ""}`} 
                to={`${props.city.id}?lat=${position.lat}
                    &lng=${position.lng}`}
                >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
            </Link>
        </li>
    )
}
