<script lang="ts">
import { ChevronUp } from "lucide-svelte";
import { onMount } from "svelte";

let visible = $state(false);

onMount(() => {
	const onScroll = () => {
		visible = window.scrollY > 400;
	};

	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	return () => window.removeEventListener("scroll", onScroll);
});

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<button
	onclick={scrollToTop}
	type="button"
	class="fixed bottom-6 right-6 z-40 flex cursor-pointer items-center justify-center rounded-full border border-border bg-surface p-3 shadow-lg transition-all hover:bg-accent hover:text-white {visible
		? 'opacity-100 translate-y-0'
		: 'pointer-events-none opacity-0 translate-y-4'}"
	aria-label="Back to top"
	aria-hidden={!visible}
	tabindex={visible ? 0 : -1}
>
	<ChevronUp size={20} />
</button>
