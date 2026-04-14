<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	transition:fade={{ duration: 200 }}
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
	role="status"
	aria-live="polite"
	aria-label="Loading weather data"
>
	<div class="flex flex-col items-center gap-6">
		<!-- Animated weather loader -->
		<div class="relative w-24 h-24">
			<!-- Outer spinning ring -->
			<div
				class="absolute inset-0 rounded-full border-2 border-white/15 border-t-white/80"
				style="animation: spin-slow 1.2s linear infinite;"
			></div>

			<!-- Inner pulsing ring -->
			<div
				class="absolute inset-3 rounded-full border border-white/20 border-t-white/50"
				style="animation: spin-slow 0.8s linear infinite reverse;"
			></div>

			<!-- Center cloud icon -->
			<div class="absolute inset-0 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="animate-pulse-glow"
					aria-hidden="true"
				>
					<path
						d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
					/>
				</svg>
			</div>
		</div>

		<!-- Animated dots text -->
		<div class="flex items-center gap-2 text-white/80 text-sm font-medium tracking-wide">
			<span>Fetching weather</span>
			<div class="flex gap-1 items-end pb-0.5">
				<span
					class="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce-dot"
					style="animation-delay: 0s;"
				></span>
				<span
					class="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce-dot"
					style="animation-delay: 0.2s;"
				></span>
				<span
					class="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce-dot"
					style="animation-delay: 0.4s;"
				></span>
			</div>
		</div>
	</div>
</div>
