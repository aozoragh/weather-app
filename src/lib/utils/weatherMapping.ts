import type { WeatherCondition } from '$lib/types/weather.js';

/**
 * Maps an OpenWeatherMap weather condition ID to our internal condition key.
 *
 * OWM ID ranges:
 *   2xx → Thunderstorm
 *   3xx → Drizzle
 *   5xx → Rain
 *   6xx → Snow
 *   7xx → Atmosphere (fog, mist, haze, dust …)
 *   800 → Clear
 *   80x → Clouds
 */
export function getWeatherCondition(id: number): WeatherCondition {
	if (id >= 200 && id < 300) return 'storm';
	if (id >= 300 && id < 400) return 'drizzle';
	if (id >= 500 && id < 600) return 'rain';
	if (id >= 600 && id < 700) return 'snow';
	if (id >= 700 && id < 800) return 'atmosphere';
	if (id === 800) return 'clear';
	return 'clouds';
}

/** Path to each weather icon SVG in /static/icons/ */
export const conditionIcon: Record<WeatherCondition, string> = {
	storm: '/icons/storm.svg',
	drizzle: '/icons/drizzle.svg',
	rain: '/icons/rain.svg',
	snow: '/icons/snow.svg',
	atmosphere: '/icons/atmosphere.svg',
	clear: '/icons/clear.svg',
	clouds: '/icons/clouds.svg'
};

/** Path to each dynamic background image in /static/backgrounds/ */
export const conditionBackground: Record<WeatherCondition, string> = {
	storm: '/backgrounds/storm.webp',
	drizzle: '/backgrounds/drizzle.webp',
	rain: '/backgrounds/rain.webp',
	snow: '/backgrounds/snow.webp',
	atmosphere: '/backgrounds/atmosphere.webp',
	clear: '/backgrounds/clear.webp',
	clouds: '/backgrounds/clouds.webp'
};

/** Human-friendly label for each condition (used in empty / aria contexts) */
export const conditionLabel: Record<WeatherCondition, string> = {
	storm: 'Thunderstorm',
	drizzle: 'Drizzle',
	rain: 'Rain',
	snow: 'Snow',
	atmosphere: 'Fog / Mist',
	clear: 'Clear Sky',
	clouds: 'Cloudy'
};

/** Which CSS animation class to apply to the weather icon per condition */
export const conditionAnimation: Record<WeatherCondition, string> = {
	storm: 'animate-pulse-glow',
	drizzle: 'animate-float',
	rain: 'animate-float',
	snow: 'animate-float',
	atmosphere: 'animate-pulse-glow',
	clear: 'animate-spin-slow',
	clouds: 'animate-float'
};
