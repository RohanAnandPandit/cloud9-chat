import { fetchWeather } from "@/utils";


fetchWeather({query: "London"}).then(res => console.log(res));