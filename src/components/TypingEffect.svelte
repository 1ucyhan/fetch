<script lang="ts">
    // Have the user of this component input the words they want to use for typing.
    export let words: string[] = []; 
    // Importing onMount feature from svelte.
    import { onMount } from 'svelte';
    // Input for current word.
    let currentWord = '';
    // Getting the current index of the list of words.
    let index = 0;
    // Speed animations for typing and deleting.
    let typingSpeed = 150;
    let deletingSpeed = 50;

    // Function for the typing effect.
    async function typeEffect() {
        // Iterate through each word infinitely.
        // The mod of words.length allows the typed word to circulate through the list.
        const word = words[index % words.length];
        // Adding every character of each word.
        for (let i = 0; i <= word.length; i++) {
            // currentWord is updated to the first i characters of the word.
            currentWord = word.slice(0, i); 
            // Slowly adding each character at a time...
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
        // Slowly adding each word at a time...
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        // Deleting every character of each word.
        for (let i = word.length; i >= 0; i--) {
            // Removing the characters.
            currentWord = word.slice(0, i);
            // Slowly removing each character at a time...
            await new Promise(resolve => setTimeout(resolve, deletingSpeed));
        }
        // Move onto the next word.
        index++;
        // Recursive. Call this again.
        typeEffect(); 
    }

    onMount(() => {
        typeEffect();
    });
</script>

<!-- Allows the typed word to appear. -->
<span>{currentWord}</span>
