import { VStack } from '@chakra-ui/react';

export const BaseLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <VStack
      minH={'100vh'}
      margin={'0 auto'}
      padding={'20px 0 0'}
      maxW={'800px'}
      alignItems={'stretch'}
    >
      {children}
    </VStack>
  );
};
