import { IToDo } from '@/entities/todo/models/types';
import { useAppDispatch } from '@/shared/utils/hooks';
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
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateToDoMutation } from '../api/updateToDo';
import { setTodosList, updateToDo } from '@/entities/todo/lib/toDoListSlice';
import { ICustomError } from '@/shared/constants/types/error';

interface IUpdateToDoModal {
  todo: IToDo;
}

export const UpdateToDoModal = (props: IUpdateToDoModal): JSX.Element => {
  const { todo } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState<IToDo>(todo);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [editToDo, { data, isLoading, error }] = useUpdateToDoMutation();
  const dispatch = useAppDispatch();

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSlider(value: number) {
    setFormValues({ ...formValues, progress: value });
  }

  function handleFormValidity() {
    return formValues.name.length !== 0 && formValues.description.length !== 0;
  }

  function handleSubmit() {
    editToDo(formValues);
  }

  useEffect(() => {
    setIsFormValid(handleFormValidity());
  }, [formValues]);

  useEffect(() => {
    if (data) {
      dispatch(setTodosList(data));
      onClose();
    }
  }, [data]);

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
      <Button onClick={onOpen} colorScheme="teal" size={'xs'}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit "{todo.name}" to-do</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                type="text"
                onChange={handleFormChange}
                defaultValue={todo.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                onChange={handleFormChange}
                defaultValue={todo.description}
              />
            </FormControl>
            <FormLabel as={'p'}>Progress</FormLabel>
            <Slider
              id="slider"
              name="progress"
              aria-label="slider-ex-1"
              defaultValue={todo.progress}
              colorScheme="teal"
              onChangeEnd={handleSlider}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSubmit}
              isDisabled={!isFormValid}
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
