import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENWEATHER_API_KEY } from '$env/static/private';
import { getWeatherCondition } from '$lib/utils/weatherMapping.js';
import type { OWMWeatherResponse, WeatherData } from '$lib/types/weather.js';

const OWM_BASE = 'https://api.openweathermap.org/data/2.5/weather';

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q');
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

	// Always fetch in metric — the client converts for display
	const params = new URLSearchParams({
		units: 'metric',
		lang: 'en',
		appid: OPENWEATHER_API_KEY
	});

	if (lat && lon) {
		params.set('lat', lat);
		params.set('lon', lon);
	} else if (q) {
		params.set('q', q);
	} else {
		return json({ error: 'Provide a city name or coordinates.' }, { status: 400 });
	}

	let raw: OWMWeatherResponse;

	try {
		const res = await fetch(`${OWM_BASE}?${params}`);
		raw = (await res.json()) as OWMWeatherResponse;
	} catch {
		return json({ error: 'Could not reach the weather service. Try again.' }, { status: 502 });
	}

	if (raw.cod !== 200) {
		const status = typeof raw.cod === 'number' ? raw.cod : 500;
		const message =
			raw.cod === 404
				? 'City not found. Check the spelling and try again.'
				: raw.cod === 401
					? 'Invalid API key.'
					: (raw.message ?? 'Something went wrong.');
		return json({ error: message }, { status });
	}

	const weatherId = raw.weather[0].id;

	const data: WeatherData = {
		cityName: raw.name,
		country: raw.sys.country,
		temp: raw.main.temp,
		feelsLike: raw.main.feels_like,
		humidity: raw.main.humidity,
		lat: raw.coord.lat,
		lon: raw.coord.lon,
		windSpeed: raw.wind.speed,
		visibility: raw.visibility,
		description: raw.weather[0].description,
		weatherId,
		condition: getWeatherCondition(weatherId)
	};

	return json(data);
};
