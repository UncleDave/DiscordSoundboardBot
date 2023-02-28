import React, { FC, createContext, useContext, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

interface WebSocketsContextProps {
  webSocket: WebSocket | null;
}

const WebSocketsContext = createContext<WebSocketsContextProps | null>(null);

export const useWebSockets = () => {
  const webSocketsContext = useContext(WebSocketsContext);

  if (!webSocketsContext)
    throw new Error(
      'useWebSockets has to be used within <WebSocketsProvider>',
    );

  return webSocketsContext;
};

interface WebSocketsProviderProps {
  children: ReactNode;
}

const WebSocketsProvider: FC<WebSocketsProviderProps> = ({ children }) => {
  const webSocket = useRef<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    webSocket.current = new WebSocket(`ws://${ window.location.hostname }:8000`);
    const setReady = () => setIsReady(true);
    webSocket.current.addEventListener('open', setReady, { passive: true });

    return () => {
      webSocket.current?.removeEventListener('open', setReady);
    };
  }, [webSocket]);

  const context = useMemo(() => ({ webSocket: webSocket.current }), [isReady]);

  return (
    <WebSocketsContext.Provider value={ context }>
      { children }
    </WebSocketsContext.Provider>
  );
};

export default WebSocketsProvider;
