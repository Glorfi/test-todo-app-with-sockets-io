import { ToDoCard } from '@/entities/todo';
import { CreateToDoModal } from '@/features/todo/ui/CreateToDoModal';
import { ToDoListWidget } from '@/widgets/todo/ui/ToDoListWidget';
import { HStack, Text, VStack } from '@chakra-ui/react';

function MainPage() {
  return (
    <VStack
      minH={'100vh'}
      margin={'0 auto'}
      padding={'20px 0 0'}
      maxW={'800px'}
      alignItems={'stretch'}
    >
      <HStack justifyContent={'flex-end'}>
        <CreateToDoModal />
      </HStack>
      <ToDoListWidget />
    </VStack>
  );
}

export default MainPage;
