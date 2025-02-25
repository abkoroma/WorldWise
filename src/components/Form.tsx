// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { CitiesContext } from "../contexts/CitiesContext";

/*export function convertToEmoji(props: { countryCode: string }) {
  const codePoints = props.countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}*/

const BASEURL = "https://api.bigdatacloud.net/data/reverse-geocode-client";


export default function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useContext(CitiesContext);

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");


  //<string | Date | null>

  useEffect(() => {
    if (!lat && !lng) return ;

    const fetchCities = async () => {
      setGeocodingError("");
      const cityRes = await fetch(`${BASEURL}?latitude=${lat}&longitude=${lng}`);
      const cityResJson = await cityRes.json();

      if (!cityResJson.countryCode) {
        throw new Error("Location is not a valid city or country. Click somewhere else");
      }

      setCityName(cityResJson.city || cityResJson.locality || "");
      setCountry(cityResJson.countryName)
    }

    fetchCities().catch((err) => {
      setIsLoadingGeocoding(false);
      setGeocodingError(err.message);
    })
  }, [lat, lng]);

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    
    if (!cityName) return;

    const newCity = {
      cityName, country, date, notes, position: {lat, lng}
    }

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng) return <Message message="Click in the map" />

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form 
      className={`${styles.form} ${isLoading ? styles.loading : ""}`} 
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker 
          onChange={(startDate) => setDate(startDate)} 
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date" 
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button children="Add" onClick={undefined} type="primary" />
        <Button 
          children="&larr; Back" 
          onClick={(e) => {
            e.preventDefault();
            navigate(-1)}
          } 
          type="back" 
        />
      </div>
    </form>
  );
}

