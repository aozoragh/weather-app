<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { WeatherData, DayForecast } from '$lib/types/weather.js';
	import { settings } from '$lib/stores/settings.svelte.js';
	import { conditionBackground } from '$lib/utils/weatherMapping.js';

	import SearchBar from '$lib/components/SearchBar.svelte';
	import UnitToggle from '$lib/components/UnitToggle.svelte';
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import ForecastStrip from '$lib/components/ForecastStrip.svelte';
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';
	import ErrorBanner from '$lib/components/ErrorBanner.svelte';

	// ── State ─────────────────────────────────────────────────────────────
	let weather = $state<WeatherData | null>(null);
	let forecast = $state<DayForecast[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	let backgroundSrc = $derived(weather ? conditionBackground[weather.condition] : null);

	// ── Data fetching ──────────────────────────────────────────────────────
	async function fetchAll(params: URLSearchParams) {
		loading = true;
		error = null;

		try {
			const [weatherRes, forecastRes] = await Promise.all([
				fetch(`/api/weather?${params}`),
				fetch(`/api/forecast?${params}`)
			]);

			const [weatherJson, forecastJson] = await Promise.all([
				weatherRes.json(),
				forecastRes.json()
			]);

			if (!weatherRes.ok) {
				error = weatherJson.error ?? 'Failed to fetch weather data.';
				return;
			}

			weather = weatherJson as WeatherData;
			forecast = forecastRes.ok
				? (forecastJson as DayForecast[]).map((d) => ({ ...d, date: new Date(d.date) }))
				: [];
		} catch {
			error = 'Network error — please check your connection and try again.';
		} finally {
			loading = false;
		}
	}

	function handleSearch(query: string) {
		const params = new URLSearchParams({ q: query });
		fetchAll(params);
	}

	function handleGeolocate() {
		if (!navigator.geolocation) {
			error = 'Geolocation is not supported by your browser.';
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				const params = new URLSearchParams({
					lat: String(coords.latitude),
					lon: String(coords.longitude)
				});
				fetchAll(params);
			},
			() => {
				error = 'Location access denied. Please allow it in your browser and try again.';
			}
		);
	}
</script>

<svelte:head>
	<title>Weather</title>
</svelte:head>

<!-- ── Dynamic background with crossfade ──────────────────────────── -->
{#key backgroundSrc}
	<div
		transition:fade={{ duration: 1000 }}
		class="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
		style={backgroundSrc
			? `background-image: url('${backgroundSrc}')`
			: 'background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)'}
		aria-hidden="true"
	></div>
{/key}

<!-- Permanent dark overlay for text legibility -->
<div class="fixed inset-0 -z-10 bg-black/30" aria-hidden="true"></div>

<!-- ── Loading overlay ─────────────────────────────────────────────── -->
{#if loading}
	<LoadingOverlay />
{/if}

<!-- ── Error banner ────────────────────────────────────────────────── -->
{#if error}
	<ErrorBanner message={error} onDismiss={() => (error = null)} />
{/if}

<!-- ── Main content ────────────────────────────────────────────────── -->
<main class="min-h-screen flex flex-col items-center px-4 py-10 gap-5">

	<!-- Search row -->
	<div class="flex items-center gap-2 w-full max-w-2xl">
		<SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} disabled={loading} />
		<UnitToggle unit={settings.unit} onToggle={() => settings.toggleUnit()} />
	</div>

	<!-- Weather content -->
	{#if weather}
		<div class="flex flex-col items-center gap-4 w-full max-w-2xl" in:fade={{ duration: 400 }}>
			<WeatherCard {weather} unit={settings.unit} />

			{#if forecast.length > 0}
				<ForecastStrip {forecast} unit={settings.unit} />
			{/if}
		</div>

	<!-- Empty state -->
	{:else if !loading}
		<div
			class="flex flex-col items-center justify-center text-white/50 mt-32 gap-4 select-none"
			in:fade={{ duration: 400 }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="64"
				height="64"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="opacity-40"
				aria-hidden="true"
			>
				<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
				<path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
			</svg>
			<p class="text-xl font-light">Search a city to see the weather</p>
			<p class="text-sm opacity-60">Try "London" or "Tokyo, JP"</p>
		</div>
	{/if}

</main>

<!-- ── Footer ─────────────────────────────────────────────────────── -->
<footer class="fixed bottom-4 right-5 flex items-center gap-2 text-black text-xs font-display select-none pointer-events-none bg-white p-1 pr-3 rounded-full">
	<img src="/aozora.png" alt="" class="h-6 w-6 opacity-80 rounded-full" />
	SvelteKit + Tauri
</footer>
