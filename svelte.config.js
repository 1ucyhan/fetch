import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto'; // or your specific adapter

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: preprocess({
        typescript: true,
      }),
    kit: {
        adapter: adapter(),
        prerender: {
        handleHttpError: ({ path, referrer, message }) => {
            // Ignore 404s for missing files like global.css and favicon.png
            if (path === '/global.css' || path === '/favicon.png') {
            return;
            }

            console.error(`Error: ${message} on ${path} from ${referrer}`);
        }
        }
   }
};
