import { createContext, FC, ReactElement, useState, useEffect } from "react";
import io from "socket.io-client";

export interface SocketContextType {
  socket: any;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

const SocketContextProvider: FC<any> = ({
  id,
  children,
}): ReactElement => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);

  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };