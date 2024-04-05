import { Link as ReactRouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { IToDo } from '@/entities/todo/models/types';
import { APP_PATHS } from '@/shared/constants/AppPaths';

interface IOpenTodo {
  todo: IToDo;
}

export const OpenToDo = (props: IOpenTodo): JSX.Element => {
  const { _id } = props.todo;
  return (
    <Button
      as={ReactRouterLink}
      size={'xs'}
      colorScheme="teal"
      to={`${APP_PATHS.TO_DO_PAGE.replace('/:id', '/')}${_id}`}
    >
      Open to Do
    </Button>
  );
};
