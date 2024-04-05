import { IToDo } from '@/entities/todo/models/types';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { mainApi } from '@/shared/utils/main-api-router';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteToDo: builder.mutation<IToDo, string>({
      query: (id) => ({
        url: `${API_PATH.TO_DO}/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteToDoMutation } = mainApiEndpoint;
