importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST )
workbox.loadModule('workbox-background-sync')

const { registerRoute } = workbox.routing
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies
const { BackgroundSyncPlugin } = workbox.backgroundSync

const bgSyncPlugin = new BackgroundSyncPlugin('eventsOfflineQueue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  });

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
]




registerRoute(
    ({ request, url}) => {

        if(cacheNetworkFirst.includes(url.pathname)) return true

        return false;
    },
    new NetworkFirst()
)

const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]

registerRoute(
    ({ request, url}) => {

        if(cacheFirstNetwork.includes(url.href)) return true

        return false;
    },
    new CacheFirst()
)
  
// Referencias

// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )


// Posts Offline
registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
)
// Put Offline
registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PUT'
)
// Posts Offline
registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'DELETE'
)


