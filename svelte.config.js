import adapter from '@sveltejs/adapter-auto'; // or your specific adapter

export default {
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
