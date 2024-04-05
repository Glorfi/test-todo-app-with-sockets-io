import { IToDo } from '@/entities/todo/models/types';
import { useAppDispatch, useUniqueId } from '@/shared/utils/hooks';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { useDeleteToDoMutation } from '../api/deleteToDo';
import { useEffect } from 'react';
import { removeToDo } from '@/entities/todo/lib/toDoListSlice';
import { ICustomError } from '@/shared/constants/types/error';

interface IDeleteModalProps {
  todo: IToDo;
}

export const DeleteToDoModal = (props: IDeleteModalProps): JSX.Element => {
  const { todo } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteToDo, { isSuccess, isLoading, error }] = useDeleteToDoMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isSuccess ? dispatch(removeToDo(todo._id)) : null;
  }, [isSuccess]);

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
  return (
    <>
      <Button onClick={onOpen} colorScheme="red" size={'xs'}>
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Would you like to delete "{`${props.todo.name}`}" to-do?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteToDo(props.todo._id)}
              isLoading={isLoading}
            >
              Delete
            </Button>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
