import { useState, useEffect } from 'react';
import { socket } from './socket';
import { useAppDispatch } from '@/shared/utils/hooks';
import { ISocketResponse } from '@/entities/todo/models/types';
import { updateToDo } from '@/entities/todo/lib/toDoListSlice';
import { useToast } from '@chakra-ui/react';

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      toast({
        title: 'No connection with the server',
        description: 'Please start the server or try to refresh the page',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }

    function onUpdate(data: ISocketResponse) {
      console.log(data);

      dispatch(updateToDo(data));
    }

    function onFooEvent(value: any) {
      setFooEvents((previous: any) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('update-todo-progress', (data) => onUpdate(data));

    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('update-todo-progress', (data) => onUpdate(data));
      socket.off('foo', onFooEvent);
    };
  }, []);

  return <>{children}</>;
};
