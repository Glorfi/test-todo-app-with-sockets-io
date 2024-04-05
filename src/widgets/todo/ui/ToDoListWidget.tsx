import { ToDoCard } from '@/entities/todo';
import { Text } from '@chakra-ui/react';
import { useGetToDoListQuery } from '../api/getToDoList';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { useEffect } from 'react';
import { setTodosList } from '@/entities/todo/lib/toDoListSlice';
import { DeleteToDoModal, UpdateToDoModal } from '@/features/todo';
import { OpenToDo } from '@/features/todo/ui/OpenToDo';

export const ToDoListWidget = (): JSX.Element => {
  const { data, isLoading, isSuccess } = useGetToDoListQuery();

  const toDoList = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setTodosList(data));
    }
  }, [data]);

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
