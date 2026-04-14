<script lang="ts">
	import type { DayForecast, Unit } from '$lib/types/weather.js';
	import { formatTemp, formatDay } from '$lib/utils/formatters.js';
	import WeatherIcon from './WeatherIcon.svelte';

	let { forecast, unit }: { forecast: DayForecast[]; unit: Unit } = $props();
</script>

<div class="glass rounded-3xl p-5 w-full">
	<p class="text-white/50 text-xs uppercase tracking-widest font-medium mb-4">5-Day Forecast</p>

	<div class="grid grid-cols-5 gap-2">
		{#each forecast as day}
			<div
				class="flex flex-col items-center gap-2 glass-light rounded-2xl px-2 py-3"
			>
				<!-- Day name -->
				<span class="text-white/70 text-xs font-semibold uppercase tracking-wide">
					{formatDay(day.date)}
				</span>

				<!-- Icon -->
				<WeatherIcon condition={day.condition} size="sm" />

				<!-- High / Low -->
				<div class="flex flex-col items-center leading-tight">
					<span class="text-white font-bold text-sm">
						{formatTemp(day.tempMax, unit)}
					</span>
					<span class="text-white/50 text-xs">
						{formatTemp(day.tempMin, unit)}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
