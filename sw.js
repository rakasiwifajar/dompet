const CACHE='dompet-app-v8';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k.startsWith('dompet-app-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return; if(/\.mp4(\?|$)/.test(e.request.url)) return; // video langsung dari jaringan
  e.respondWith(fetch(e.request).then(r=>{ if(r.ok&&r.status===200){ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{}); } return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))); });
