<script>
    export let words = []; 
    import { onMount } from 'svelte';
  
    let currentWord = '';
    let index = 0;
    let typingSpeed = 150;
    let deletingSpeed = 50;

    async function typeEffect() {
        const word = words[index % words.length];
        for (let i = 0; i <= word.length; i++) {
            currentWord = word.slice(0, i); 
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        for (let i = word.length; i >= 0; i--) {
            currentWord = word.slice(0, i);
            await new Promise(resolve => setTimeout(resolve, deletingSpeed));
        }
        index++;
        typeEffect(); 
    }

    onMount(() => {
        typeEffect();
    });
</script>


<span>{currentWord}</span>
