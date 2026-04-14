<script lang="ts">
	let {
		onSearch,
		onGeolocate,
		disabled = false
	}: {
		onSearch: (query: string) => void;
		onGeolocate: () => void;
		disabled?: boolean;
	} = $props();

	let query = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		const trimmed = query.trim();
		if (trimmed) onSearch(trimmed);
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-1 gap-2 min-w-0">
	<input
		type="text"
		bind:value={query}
		{disabled}
		placeholder="Search city… e.g. Tokyo, JP"
		aria-label="City search"
		class="flex-1 min-w-0 px-5 py-3 rounded-2xl glass-light text-white
		       placeholder-white/40 outline-none text-sm
		       focus:ring-2 focus:ring-white/30 transition-all duration-200
		       disabled:opacity-50 disabled:cursor-not-allowed"
	/>

	<!-- Geolocation button -->
	<button
		type="button"
		onclick={onGeolocate}
		{disabled}
		title="Use my location"
		aria-label="Use my location"
		class="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl
		       glass-light text-white hover:bg-white/15 active:scale-95
		       transition-all duration-150 cursor-pointer
		       disabled:opacity-50 disabled:cursor-not-allowed"
	>
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
			aria-hidden="true"
		>
			<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	</button>

	<!-- Search submit -->
	<button
		type="submit"
		{disabled}
		class="shrink-0 px-6 py-3 rounded-2xl glass text-white font-semibold text-sm
		       hover:bg-white/20 active:scale-95 transition-all duration-150
		       cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
	>
		Search
	</button>
</form>
