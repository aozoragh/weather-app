// ── Domain types ───────────────────────────────────────────────────────────

export type WeatherCondition =
	| 'storm'
	| 'drizzle'
	| 'rain'
	| 'snow'
	| 'atmosphere'
	| 'clear'
	| 'clouds';

export type Unit = 'metric' | 'imperial';

/** Normalised weather snapshot returned by our /api/weather route */
export interface WeatherData {
	cityName: string;
	country: string;
	temp: number; // always in °C — formatted by UI based on unit preference
	feelsLike: number;
	humidity: number;
	lat: number;
	lon: number;
	windSpeed: number; // m/s
	visibility: number; // metres
	description: string;
	weatherId: number;
	condition: WeatherCondition;
}

/** One aggregated day returned by /api/forecast */
export interface DayForecast {
	date: Date;
	tempMin: number; // °C
	tempMax: number; // °C
	weatherId: number;
	condition: WeatherCondition;
	description: string;
}

// ── Raw OpenWeatherMap API shapes ──────────────────────────────────────────

export interface OWMWeatherResponse {
	cod: number | string;
	message?: string;
	name: string;
	sys: { country: string };
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
		temp_min: number;
		temp_max: number;
	};
	coord: { lat: number; lon: number };
	weather: Array<{
		id: number;
		main: string;
		description: string;
	}>;
	wind: { speed: number };
	visibility: number;
}

export interface OWMForecastResponse {
	cod: string;
	message?: string | number;
	list: Array<{
		dt: number;
		main: {
			temp: number;
			temp_min: number;
			temp_max: number;
			humidity: number;
		};
		weather: Array<{
			id: number;
			main: string;
			description: string;
		}>;
		dt_txt: string;
	}>;
	city: {
		name: string;
		country: string;
	};
}
