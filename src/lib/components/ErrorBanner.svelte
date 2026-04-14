<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let {
		message,
		onDismiss
	}: {
		message: string;
		onDismiss: () => void;
	} = $props();

	// Auto-dismiss after 5 seconds
	onMount(() => {
		const timer = setTimeout(onDismiss, 5000);
		return () => clearTimeout(timer);
	});
</script>

<div
	in:fly={{ y: -16, duration: 300 }}
	out:fly={{ y: -16, duration: 200 }}
	class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
	role="alert"
	aria-live="assertive"
>
	<div
		class="flex items-center gap-3 px-5 py-3.5 rounded-2xl
		       bg-red-500/85 backdrop-blur-md border border-red-400/30
		       text-white shadow-lg shadow-black/30"
	>
		<!-- Warning icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="shrink-0"
			aria-hidden="true"
		>
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>

		<p class="flex-1 text-sm font-medium leading-snug">{message}</p>

		<!-- Dismiss button -->
		<button
			onclick={onDismiss}
			aria-label="Dismiss error"
			class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full
			       hover:bg-white/20 transition-colors cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M18 6 6 18M6 6l12 12" />
			</svg>
		</button>
	</div>
</div>
