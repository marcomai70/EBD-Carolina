const CACHE_NAME = 'ebd-app-v3.1';
const BASE_PATH = '/EBD-Carolina/';

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'style.css',
  BASE_PATH + 'script.js',
  BASE_PATH + 'alunos.json',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'Imagens/icon4EBD192x192.png',
  BASE_PATH + 'Imagens/icon4EBD512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta requisições
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Só cachear requisições do nosso domínio
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});