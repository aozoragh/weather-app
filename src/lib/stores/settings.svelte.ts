import type { Unit } from '$lib/types/weather.js';

const STORAGE_KEY = 'weather-unit';

function createSettings() {
	let unit = $state<Unit>('metric');

	// Hydrate from localStorage on the client side only
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'metric' || stored === 'imperial') {
			unit = stored;
		}
	}

	return {
		get unit(): Unit {
			return unit;
		},
		toggleUnit() {
			unit = unit === 'metric' ? 'imperial' : 'metric';
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, unit);
			}
		}
	};
}

export const settings = createSettings();
