import Message from "./Message"
import Spinner from "./Spinner"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem";
import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export default function CountriesList() {

        const { cities, isLoading } = useContext(CitiesContext)

        if (isLoading) {
            return <Spinner />
        }

        if (!cities.length) {
            return (
                < Message message= "Add your first city by clicking on a city on the map" />
            );
        }

        const countries = cities.reduce((arr: Array<{country: string, emoji: string}>, city) => {
            if (!arr.map((el) => el.country).includes(city.country))
                return [...arr, { country: city.country, emoji: city.emoji }];
            else return arr;
        }, []);

        return (
            <ul className={styles.countryList}>
                {
                    countries.map((country) => (
                        <CountryItem key={country.country} country={country} />
                    ))
                }
            </ul>
        )
}