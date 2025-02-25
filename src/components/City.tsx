import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useContext, useEffect } from "react";
import { CitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import Button from "./Button";


/*const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
}).format(new Date(date));*/

export default function City() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useContext(CitiesContext);
  
  useEffect(() => {
    getCity(id)
  }, [id, getCity]);

  //const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        {/*<p>{formatDate(currentCity?.date)}</p>*/}
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button 
          children="&larr; Back" 
          onClick={(e) => {
            e.preventDefault();
            navigate(-1)}
          } 
          type="back" 
        />
      </div>
    </div>
  );
}
