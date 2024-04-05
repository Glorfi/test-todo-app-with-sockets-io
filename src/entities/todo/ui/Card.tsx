import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  CardProps,
  ButtonGroup,
} from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { IToDo } from '../models/types';

interface IToDoCard extends CardProps {
  toDoData: IToDo;
  featuresList: { component: React.ComponentType<any>; props: any }[];
}

export const ToDoCard = (props: IToDoCard): JSX.Element => {
  const { toDoData, featuresList } = props;
  return (
    <Card>
      <CardHeader ml={'auto'}>
        <ButtonGroup>
          {featuresList.map((feature, index) => {
            const FeatureComponent = feature.component;
            return <FeatureComponent key={index} {...feature.props} />;
          })}
        </ButtonGroup>
      </CardHeader>
      <CardBody p={'0 20px'}>
        <Text fontWeight={500}>Name: {toDoData.name}</Text>
        <Text>Description: {toDoData.description}</Text>
        <Text>Progress: {toDoData.progress}</Text>
      </CardBody>
      <CardFooter>
        <Progress
          colorScheme="teal"
          size="sm"
          value={toDoData.progress}
          w={'100%'}
          min={0}
          max={100}
        />
      </CardFooter>
    </Card>
  );
};
