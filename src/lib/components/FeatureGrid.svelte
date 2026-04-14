<script lang="ts">
	import type { WeatherData, Unit } from '$lib/types/weather.js';
	import { formatTemp, formatWind, formatVisibility, formatCoord } from '$lib/utils/formatters.js';

	let { weather, unit }: { weather: WeatherData; unit: Unit } = $props();

	let items = $derived([
		{
			icon: '🌡️',
			label: 'Feels like',
			value: formatTemp(weather.feelsLike, unit)
		},
		{
			icon: '💧',
			label: 'Humidity',
			value: `${weather.humidity}%`
		},
		{
			icon: '💨',
			label: 'Wind',
			value: formatWind(weather.windSpeed, unit)
		},
		{
			icon: '👁️',
			label: 'Visibility',
			value: formatVisibility(weather.visibility)
		},
		{
			icon: '🧭',
			label: 'Latitude',
			value: formatCoord(weather.lat)
		},
		{
			icon: '🧭',
			label: 'Longitude',
			value: formatCoord(weather.lon)
		}
	]);
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
	{#each items as item}
		<div class="glass-light rounded-2xl px-4 py-3 flex flex-col gap-1">
			<span class="text-white/50 text-xs uppercase tracking-wider font-medium">
				{item.label}
			</span>
			<span class="text-white font-semibold text-base leading-tight">
				{item.value}
			</span>
		</div>
	{/each}
</div>
