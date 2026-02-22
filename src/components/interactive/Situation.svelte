<script lang="ts">
import type { Situation } from "@/lib/schemas";

interface Props {
	data: Situation;
	onComplete?: (choseBiased: boolean) => void;
}

let { data, onComplete }: Props = $props();
let selectedIndex: number | null = $state(null);
let revealed = $state(false);

const handleChoice = (index: number) => {
	if (revealed) return;
	selectedIndex = index;
	revealed = true;
	onComplete?.(data.choices[index].bias);
};
</script>

<section class="situation">
  <p class="scenario">{data.scenario}</p>

  <div class="choices">
    {#each data.choices as choice, i}
      <button
        class="choice"
        class:selected={selectedIndex === i}
        class:biased={revealed && choice.bias && selectedIndex === i}
        class:correct={revealed && !choice.bias && selectedIndex === i}
        disabled={revealed}
        onclick={() => handleChoice(i)}
      >
        {choice.label}
      </button>
    {/each}
  </div>

  {#if revealed}
    <div class="reveal">
      <p>{data.reveal}</p>
    </div>
  {/if}
</section>

<style>
  .situation {
    padding: var(--space-lg);
    background: var(--color-surface);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
  }

  .scenario {
    font-size: 1.125rem;
    margin-block-end: var(--space-lg);
  }

  .choices {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .choice {
    padding: var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: 0.5rem;
    background: var(--color-surface);
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .choice:hover:not(:disabled) {
    border-color: var(--color-accent);
  }

  .choice:disabled {
    cursor: default;
    opacity: 0.7;
  }

  .biased {
    border-color: #ef4444;
    background: #fef2f2;
  }

  .correct {
    border-color: #10b981;
    background: #f0fdf4;
  }

  .reveal {
    margin-block-start: var(--space-lg);
    padding: var(--space-md);
    background: #fffbeb;
    border-left: 4px solid #f59e0b;
    border-radius: 0 0.5rem 0.5rem 0;
  }
</style>
