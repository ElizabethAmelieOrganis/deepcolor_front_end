export const config = {
  apiBaseUrl: 'http://127.0.0.1:5000',
  socketUrl: 'http://127.0.0.1:5000',
  socketOptions: {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 20000
  }
}; 