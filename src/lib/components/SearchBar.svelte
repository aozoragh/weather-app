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
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
			<path d="m4.93 4.93 2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" />
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
