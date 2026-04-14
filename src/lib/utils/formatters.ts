import type { Unit } from '$lib/types/weather.js';

/** Convert Celsius to Fahrenheit and format with unit symbol. */
export function formatTemp(celsius: number, unit: Unit): string {
	if (unit === 'imperial') {
		return `${Math.round((celsius * 9) / 5 + 32)}°F`;
	}
	return `${Math.round(celsius)}°C`;
}

/** Short weekday name, e.g. "Mon", "Tue". Accepts Date or ISO string (JSON deserialises dates as strings). */
export function formatDay(date: Date | string): string {
	return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
}

/** Format a decimal coordinate with 4 dp, e.g. "35.6762". */
export function formatCoord(value: number): string {
	return value.toFixed(4);
}

/** Wind speed with unit label. OWM always returns m/s regardless of units param. */
export function formatWind(ms: number, unit: Unit): string {
	if (unit === 'imperial') {
		return `${Math.round(ms * 2.237)} mph`;
	}
	return `${Math.round(ms)} m/s`;
}

/** Convert visibility metres to a readable string. */
export function formatVisibility(metres: number): string {
	if (metres >= 1000) {
		return `${(metres / 1000).toFixed(1)} km`;
	}
	return `${metres} m`;
}
