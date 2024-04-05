import { IToDo } from '@/entities/todo/models/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createToDo: builder.mutation<IToDo, IToDo>({
      query: (body) => ({
        url: API_PATH.TO_DO,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateToDoMutation } = mainApiEndpoint;
