// Service Worker SMIRT - Gestione Robustezza
const CACHE_NAME = 'smirt-cache-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Ignora le richieste non HTTP (come estensioni browser)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      
      if (cachedResponse) return cachedResponse;
      
      // Se siamo offline e cerchiamo di navigare, restituiamo la pagina principale
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
      
      return new Response('Offline: Risorsa non disponibile', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
