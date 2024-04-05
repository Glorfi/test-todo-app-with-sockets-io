import { ToDoCard } from '@/entities/todo';
import { Text, useToast } from '@chakra-ui/react';
import { useGetToDoListQuery } from '../api/getToDoList';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { useEffect } from 'react';
import { setTodosList } from '@/entities/todo/lib/toDoListSlice';
import { DeleteToDoModal, UpdateToDoModal } from '@/features/todo';
import { OpenToDo } from '@/features/todo/ui/OpenToDo';

export const ToDoListWidget = (): JSX.Element => {
  const { data, isLoading, error } = useGetToDoListQuery();

  const toDoList = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    if (data && toDoList.length === 0) {
      dispatch(setTodosList(data));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'No connection with the server',
        description: 'Please start the server or try to refresh the page',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  return (
    <>
      {toDoList.length > 0 ? (
        toDoList.map((todo) => {
          const todoFeatures = [
            { component: OpenToDo, props: { todo: todo } },
            { component: UpdateToDoModal, props: { todo: todo } },
            { component: DeleteToDoModal, props: { todo: todo } },
            // Другие фичи и их пропсы
          ];
          return (
            <ToDoCard
              key={todo._id}
              toDoData={todo}
              featuresList={todoFeatures}
            />
          );
        })
      ) : (
        <Text textAlign={'center'}>It's time to create some To-dos!</Text>
      )}
    </>
  );
};
