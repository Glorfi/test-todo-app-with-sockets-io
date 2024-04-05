import { Header } from '@/widgets/header';
import { BaseLayout } from '@/widgets/layouts';
import { ToDoWidget } from '@/widgets/todo';

export const TodoPage = (): JSX.Element => {
  return (
    <BaseLayout>
      <Header />
      <ToDoWidget />
    </BaseLayout>
  );
};
