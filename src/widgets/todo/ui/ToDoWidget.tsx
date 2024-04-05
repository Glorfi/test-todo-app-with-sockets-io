import { ToDoCard } from '@/entities/todo';
import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';
import { useParams } from 'react-router-dom';
import { Text, useToast } from '@chakra-ui/react';
import { DeleteToDoModal, UpdateToDoModal } from '@/features/todo';
import { useEffect, useState } from 'react';
import { IToDo } from '@/entities/todo/models/types';
import { useGetToDoListQuery } from '@/widgets/todo/api/getToDoList';
import { setTodosList } from '@/entities/todo/lib/toDoListSlice';
import { ICustomError } from '@/shared/constants/types/error';

export const ToDoWidget = (): JSX.Element => {
  const { id } = useParams();
  const [todo, setTodo] = useState<IToDo | null>(null);
  const { data, error } = useGetToDoListQuery();
  const todoList = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && todoList.length === 0) {
      dispatch(setTodosList(data));
    }
  }, [data, id]);

  useEffect(() => {
    if (todoList && id) {
      const currentTodo = todoList.find((todo) => todo._id === id);
      currentTodo ? setTodo(currentTodo) : null;
    }
  }, [todoList]);

  const toast = useToast();
  useEffect(() => {
    if (error) {
      const er = error as ICustomError;
      toast({
        title: er.code,
        description: er.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  return todo ? (
    <ToDoCard
      toDoData={todo}
      featuresList={[
        { component: UpdateToDoModal, props: { todo: todo } },
        { component: DeleteToDoModal, props: { todo: todo } },
      ]}
    />
  ) : (
    <Text>Todo is not found</Text>
  );
};
