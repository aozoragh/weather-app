<script lang="ts">
	import type { WeatherCondition } from '$lib/types/weather.js';
	import { conditionIcon, conditionAnimation, conditionLabel } from '$lib/utils/weatherMapping.js';

	let {
		condition,
		size = 'md'
	}: {
		condition: WeatherCondition;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const sizeClass: Record<string, string> = {
		sm: 'w-10 h-10',
		md: 'w-20 h-20',
		lg: 'w-32 h-32'
	};
</script>

<div
	class="{sizeClass[size]} {conditionAnimation[condition]} drop-shadow-lg"
	aria-label={conditionLabel[condition]}
	role="img"
>
	<img
		src={conditionIcon[condition]}
		alt={conditionLabel[condition]}
		class="w-full h-full object-contain"
		draggable="false"
	/>
</div>
