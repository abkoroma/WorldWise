import { citytype } from "./cityInterface";


export interface CityState {
    cities: citytype[],
    isLoading: boolean,
    currentCity: citytype,
    error: string,
}

export enum CityActionTypes {
    LOADING = 'loading',
    LOADCITIES = 'cities/loaded',
    LOADCITY = 'city/loaded',
    CREATECITY = 'city/created',
    DELETECITY = 'city/deleted',
    ERROR = 'rejected'
}

type CityAction = 
    | { type: CityActionTypes.LOADING; isLoading: boolean }
    | { type: CityActionTypes.LOADCITIES; isLoading: boolean; payload: citytype[] }
    | { type: CityActionTypes.LOADCITY, isLoading: boolean, payload: citytype }
    | { type: CityActionTypes.CREATECITY, isLoading: boolean, payload: citytype  }
    | { type: CityActionTypes.DELETECITY, isLoading: boolean, payload: string } 
    | { type: CityActionTypes.ERROR, isLoading: boolean, payload: string }

export function reducer(state: CityState, action: CityAction) {
    switch(action.type) {
        case CityActionTypes.LOADING:
            return {
                ...state,
                isLoading: true
            };
        case CityActionTypes.LOADCITIES:
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case CityActionTypes.LOADCITY:
            return {
                ...state,
                isLoading: false,
                currencity: action.payload
            }
        case CityActionTypes.CREATECITY:
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }
        case CityActionTypes.DELETECITY:
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload)
            }
        case CityActionTypes.ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            throw new Error("Unknown action type");
    }

}