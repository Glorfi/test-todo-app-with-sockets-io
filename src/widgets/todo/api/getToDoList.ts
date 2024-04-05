import { IToDo } from '@/entities/todo/models/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const getToDoList = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getToDoList: builder.query<IToDo[], void>({
      query: () => ({
        url: API_PATH.TO_DO,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetToDoListQuery } = getToDoList;
