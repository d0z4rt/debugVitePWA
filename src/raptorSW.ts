// https://medium.com/its-tinkoff/ssegwsw-server-sent-events-gateway-by-service-workers-6212c1c55184
// https://github.com/shoom3301/ssegwsw

import { cacheNames, clientsClaim } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute
} from 'workbox-precaching'
import {
  NavigationRoute,
  registerRoute,
  setCatchHandler,
  setDefaultHandler
} from 'workbox-routing'
import type {
  StrategyHandler,
  NetworkFirst,
  NetworkOnly,
  Strategy
} from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

// clean old assets
cleanupOutdatedCaches()

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')))

/** 
 * TODO
self.addEventListener('fetch', (event) => {
  const { headers, url } = event.request
  const isSSERequest = headers.get('Accept') === 'text/event-stream'

  // Process only SSE connections
  if (!isSSERequest) {
    // eslint-disable-next-line no-useless-return
    return
  }

  // Headers for SSE response
  const sseHeaders = {
    'content-type': 'text/event-stream',
    'Transfer-Encoding': 'chunked',
    Connection: 'keep-alive'
  }

  // Function for formatting message to SSE response
  const sseChunkData = (data: any, event: any, retry: any, id: any) =>
    Object.entries({ event, id, data, retry })
      .filter(([, value]) => ![undefined, null].includes(value))
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n') + '\n\n'

  // Map with server connections, where key - url, value - EventSource
  const serverConnections: { [key: string]: any } = {}
  // For each request opens only one server connection and use it for next requests with the same url
  const getServerConnection = (url: string) => {
    if (!serverConnections[url]) {
      serverConnections[url] = new EventSource(url)
    }

    return serverConnections[url]
  }

  // On message from server forward it to browser
  const onServerMessage = (
    controller: any,
    {
      data,
      type,
      retry,
      lastEventId
    }: { data: any; type?: any; retry?: any; lastEventId?: any }
  ) => {
    const responseText = sseChunkData(data, type, retry, lastEventId)
    const responseData = Uint8Array.from(responseText, (x) => x.charCodeAt(0))
    controller.enqueue(responseData)
  }

  const stream = new ReadableStream({
    start: (controller) => {
      onServerMessage(controller, { data: 'Hello!' })

      getServerConnection(url).onmessage = onServerMessage.bind(
        null,
        controller
      )
    }
  })
  const response = new Response(stream, { headers: sseHeaders })

  event.respondWith(response)
})*/
