import { IToDo } from '@/entities/todo/models/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    updateToDo: builder.mutation<IToDo[], IToDo>({
      query: (body) => ({
        url: API_PATH.TO_DO,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useUpdateToDoMutation } = mainApiEndpoint;
