import { createContext, ReactNode, useCallback, useEffect, useReducer } from "react";
import { CityContextType, citytype } from "../cityInterface";
import { CityActionTypes, CityState, reducer } from "../reducer";


export const CitiesContext = createContext<CityContextType>({
    cities: [],
    currentCity: {
        cityName: "",
        country: "",
        emoji: "",
        date: "",
        notes: "",
        position: {
            lat: 0,
            lng: 0
        },
        id: ""
    },
    isLoading: false,
    getCity: Function,
    createCity: Function,
    deleteCity: Function,
});

const BASE_URL = 'http://localhost:5000';

const initialState: CityState = {
    cities: [],
    isLoading: false,
    currentCity: {
        cityName: "", country: "", emoji: "", date: "", notes: "",
        position: {lat: 0, lng: 0}, id: ""
    },
    error: "There was an error loading data"
}

export function CitiesContextProvider(props: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {cities, isLoading, currentCity, error} = state;
    
    useEffect(() => {
        const fetchCities = async () => {
          dispatch({
            type: CityActionTypes.LOADING,
            isLoading: false
          });
          
          const citiesRes = await fetch(`${BASE_URL}/cities`);
          const citiesJson = await citiesRes.json();
          dispatch({
            type: CityActionTypes.LOADCITIES,
            payload: citiesJson,
            isLoading: false
          })
        }
    
        fetchCities().catch(() => {
            dispatch({
                type: CityActionTypes.ERROR,
                payload: error,
                isLoading: false
            });
        });

    }, [error]);

    const getCity = useCallback(async function getCity(id: string) {
        if (id === currentCity.id) return;

        const fetchCities = async () => {
            dispatch({
                type: CityActionTypes.LOADING,
                isLoading: false
            });

            const citiesRes = await fetch(`${BASE_URL}/cities/${id}`);
            const citiesJson = await citiesRes.json();
            dispatch({
                type: CityActionTypes.LOADCITY,
                payload: citiesJson,
                isLoading: false
            });
        }
      
        fetchCities().catch(() => {
            dispatch({
                type: CityActionTypes.ERROR,
                payload: "There was an error loading city",
                isLoading: false
            });
        });

    }, [currentCity.id]);

    async function createCity(newCity: citytype) {
        const fetchCities = async () => {
            dispatch({
                type: CityActionTypes.LOADING,
                isLoading: false
            });

            const citiesRes = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const citiesJson = await citiesRes.json();
            dispatch({
                type: CityActionTypes.CREATECITY,
                payload: citiesJson,
                isLoading: false
            });
        }
      
        fetchCities().catch(() => {
            dispatch({
                type: CityActionTypes.ERROR,
                payload: "There was an error adding city",
                isLoading: false
            });
        });

    }

    async function deleteCity(id: string) {
        const fetchCities = async () => {
            dispatch({
                type: CityActionTypes.LOADING,
                isLoading: false
            });
            
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({
                type: CityActionTypes.DELETECITY,
                payload: id,
                isLoading: false
            });
        }
      
        fetchCities().catch(() => {
            dispatch({
                type: CityActionTypes.ERROR,
                payload: "Error deleting city",
                isLoading: false
            });
        });

    }


    return (
        <CitiesContext.Provider value={
            {
                cities, currentCity, 
                getCity, isLoading, createCity, deleteCity 
            }}>
            {props.children}
        </CitiesContext.Provider>
    )

}