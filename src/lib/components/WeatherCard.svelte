<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { WeatherData, Unit } from '$lib/types/weather.js';
	import { formatTemp } from '$lib/utils/formatters.js';
	import WeatherIcon from './WeatherIcon.svelte';
	import FeatureGrid from './FeatureGrid.svelte';

	let { weather, unit }: { weather: WeatherData; unit: Unit } = $props();

	let displayTemp = $derived(formatTemp(weather.temp, unit));
</script>

<div
	in:fly={{ y: 32, duration: 500, opacity: 0 }}
	class="glass rounded-3xl p-8 w-full"
>
	<!-- Top row: location + icon -->
	<div class="flex items-start justify-between gap-4 mb-6">
		<div class="min-w-0">
			<h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight truncate">
				{weather.cityName}
			</h1>
			<p class="text-white/55 text-base mt-0.5 uppercase tracking-widest font-medium">
				{weather.country}
			</p>
		</div>

		<WeatherIcon condition={weather.condition} size="lg" />
	</div>

	<!-- Temperature -->
	<div class="mb-1">
		<span class="text-7xl sm:text-8xl font-thin text-white tabular-nums leading-none">
			{displayTemp}
		</span>
	</div>

	<!-- Description -->
	<p class="text-white/75 text-lg capitalize mb-8">
		{weather.description}
	</p>

	<!-- Feature grid -->
	<FeatureGrid {weather} {unit} />
</div>
