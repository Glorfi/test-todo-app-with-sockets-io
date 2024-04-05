import { BaseLayout } from '@/widgets/layouts';
import { ToDoWidget } from '@/widgets/todo';

export const TodoPage = (): JSX.Element => {
  return (
    <BaseLayout>
      <ToDoWidget />
    </BaseLayout>
  );
};
