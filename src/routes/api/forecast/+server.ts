import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENWEATHER_API_KEY } from '$env/static/private';
import { getWeatherCondition } from '$lib/utils/weatherMapping.js';
import type { OWMForecastResponse, DayForecast } from '$lib/types/weather.js';

const OWM_BASE = 'https://api.openweathermap.org/data/2.5/forecast';

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q');
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

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

	let raw: OWMForecastResponse;

	try {
		const res = await fetch(`${OWM_BASE}?${params}`);
		raw = (await res.json()) as OWMForecastResponse;
	} catch {
		return json({ error: 'Could not reach the weather service. Try again.' }, { status: 502 });
	}

	if (raw.cod !== '200') {
		return json({ error: raw.message ?? 'Something went wrong.' }, { status: 500 });
	}

	// Aggregate OWM's 3-hour slots into daily summaries
	const dayMap = new Map<
		string,
		{ tempMin: number; tempMax: number; ids: number[]; descriptions: string[] }
	>();

	for (const slot of raw.list) {
		// Use UTC date string as the map key so we group by calendar day
		const key = new Date(slot.dt * 1000).toISOString().slice(0, 10);
		const entry = dayMap.get(key);

		if (entry) {
			entry.tempMin = Math.min(entry.tempMin, slot.main.temp_min);
			entry.tempMax = Math.max(entry.tempMax, slot.main.temp_max);
			entry.ids.push(slot.weather[0].id);
			entry.descriptions.push(slot.weather[0].description);
		} else {
			dayMap.set(key, {
				tempMin: slot.main.temp_min,
				tempMax: slot.main.temp_max,
				ids: [slot.weather[0].id],
				descriptions: [slot.weather[0].description]
			});
		}
	}

	// Skip today (index 0), take next 5 days
	const entries = [...dayMap.entries()].slice(1, 6);

	const forecast: DayForecast[] = entries.map(([dateStr, day]) => {
		// Pick the most frequent weather ID as the representative condition
		const idFreq = day.ids.reduce<Record<number, number>>((acc, id) => {
			acc[id] = (acc[id] ?? 0) + 1;
			return acc;
		}, {});
		const weatherId = Number(
			Object.entries(idFreq).sort(([, a], [, b]) => b - a)[0][0]
		);

		return {
			date: new Date(dateStr),
			tempMin: day.tempMin,
			tempMax: day.tempMax,
			weatherId,
			condition: getWeatherCondition(weatherId),
			description: day.descriptions[0]
		};
	});

	return json(forecast);
};
