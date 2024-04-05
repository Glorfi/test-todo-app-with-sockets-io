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
import { useCreateToDoMutation } from '../api/createToDo';
import { useGetToDoListQuery } from '@/widgets/todo/api/getToDoList';
import { addToDo } from '@/entities/todo/lib/toDoListSlice';
import { ICustomError } from '@/shared/constants/types/error';

export const CreateToDoModal = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState<IToDo>({
    name: '',
    _id: '',
    description: '',
    progress: 30,
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const toast = useToast();

  const [createToDo, { data, isLoading, error }] = useCreateToDoMutation();
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
    createToDo(formValues);
  }

  useEffect(() => {
    isOpen ? setFormValues({ ...formValues, _id: useUniqueId() }) : null;
  }, [isOpen]);

  useEffect(() => {
    setIsFormValid(handleFormValidity());
  }, [formValues]);

  useEffect(() => {
    if (data) {
      dispatch(addToDo(data));
      onClose();
    }
  }, [data]);

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
      <Button onClick={onOpen} colorScheme="teal">
        Create To-Do
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New To-Do</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" type="text" onChange={handleFormChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                onChange={handleFormChange}
              />
            </FormControl>
            <FormLabel as={'p'}>Progress</FormLabel>
            <Slider
              id="slider"
              name="progress"
              aria-label="slider-ex-1"
              defaultValue={30}
              colorScheme="teal"
              onChangeEnd={handleSlider}
              min={0}
              max={100}
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
            >
              Create To Do
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
