<script lang="ts">
	import type { Unit } from '$lib/types/weather.js';

	let {
		unit,
		onToggle
	}: {
		unit: Unit;
		onToggle: () => void;
	} = $props();

	let isCelsius = $derived(unit === 'metric');
</script>

<button
	onclick={onToggle}
	aria-label={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
	title={`Switch to °${isCelsius ? 'F' : 'C'}`}
	class="shrink-0 h-12 flex items-center gap-1 px-4 rounded-2xl glass-light
	       text-white text-sm font-semibold hover:bg-white/15 active:scale-95
	       transition-all duration-150 cursor-pointer select-none"
>
	<span class={isCelsius ? 'opacity-100' : 'opacity-40 transition-opacity'}>°C</span>
	<span class="text-white/30 mx-0.5">/</span>
	<span class={!isCelsius ? 'opacity-100' : 'opacity-40 transition-opacity'}>°F</span>
</button>
