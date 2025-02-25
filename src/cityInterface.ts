export interface citytype {
    cityName: string, 
    country: string, 
    emoji: string, 
    date: string, 
    notes: string, 
    position: {lat: number, lng: number}, 
    id: string
}

export type CityContextType = {
    cities: citytype[],
    currentCity: citytype,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    getCity: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    createCity: Function,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    deleteCity: Function,
    isLoading: boolean,
}