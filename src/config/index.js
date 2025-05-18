export const config = {
  apiBaseUrl: "https://xidfvznrxshn.sealoshzh.site",
  socketUrl: "https://xidfvznrxshn.sealoshzh.site",
  socketOptions: {
    transports: ["websocket", "polling"],
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 20000,
  },
};
