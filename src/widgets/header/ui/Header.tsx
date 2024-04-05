import { CreateToDoModal } from '@/features/todo';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';
import { APP_PATHS } from '@/shared/constants/AppPaths';

export const Header = (): JSX.Element => {
  const path = useLocation().pathname;

  console.log(path);

  return (
    <HStack justifyContent={"flex-end"}>
      {path === APP_PATHS.MAIN ? (
        <CreateToDoModal />
      ) : (
        <Button as={ReactRouterLink} to={APP_PATHS.MAIN} colorScheme="teal">
          Home
        </Button>
      )}
    </HStack>
  );
};
