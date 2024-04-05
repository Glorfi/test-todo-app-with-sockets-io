import { TodoPage } from '@/pages/TodoPage';
import MainPage from '../../pages/Main';

import { APP_PATHS } from '../../shared/constants/AppPaths';

interface IAppRoutes {
  path: string;
  element: () => JSX.Element;
}

export const routes: IAppRoutes[] = [
  { path: APP_PATHS.MAIN, element: MainPage },
  { path: APP_PATHS.TO_DO_PAGE, element: TodoPage },
];
