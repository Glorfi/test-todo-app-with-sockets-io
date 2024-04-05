import { Header } from '@/widgets/header';
import { BaseLayout } from '@/widgets/layouts';
import { ToDoListWidget } from '@/widgets/todo/ui/ToDoListWidget';

function MainPage() {
  return (
    <BaseLayout>
      <Header />
      <ToDoListWidget />
    </BaseLayout>
  );
}

export default MainPage;
