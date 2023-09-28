import React, { useEffect } from "react";

let websocket: WebSocket | null = null;
let lockReconnect = false;
let handleEvent: ((event: MessageEvent) => void) | null = null;

export const createWebSocket = (
  url: string,
  handleEvent: (event: MessageEvent) => void
) => {
  websocket = new WebSocket(url);
  websocket.onopen = () => {
    heartCheck.reset().start();
  };
  websocket.onerror = () => {
    reconnect(url);
  };
  websocket.onclose = (e: CloseEvent) => {
    console.log(
      "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
    );
  };
  websocket.onmessage = (event: MessageEvent) => {
    lockReconnect = true;
    handleEvent(event);
  };
};

export const reconnect = (url: string) => {
  if (lockReconnect) return;
  setTimeout(() => {
    createWebSocket(url, handleEvent!);
    lockReconnect = false;
  }, 4000);
};

const heartCheck = {
  timeout: 60000,
  timeoutObj: null as NodeJS.Timeout | null,
  reset: function () {
    if (this.timeoutObj) {
      clearInterval(this.timeoutObj);
    }
    return this;
  },
  start: function () {
    this.timeoutObj = setInterval(() => {
      if (websocket) {
        websocket.send("HeartBeat");
      }
    }, this.timeout);
  },
};

export const closeWebSocket = () => {
  if (websocket) {
    websocket.close();
  }
};

// 使用示例
const WebSocketComponent: React.FC = () => {
  useEffect(() => {
    // 在组件加载时创建 WebSocket 连接
    createWebSocket("wss://example.com/socket", (event) => {
      // 处理 WebSocket 事件
      console.log("Received message:", event.data);
    });

    return () => {
      // 在组件卸载时关闭 WebSocket 连接
      closeWebSocket();
    };
  }, []);

  return <div>WebSocket Component</div>;
};
