import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    prepareHeaders: (headers, {getState}) => {
      // getState() giúp lấy ra toàn bộ state trong store
      const token = getState().another;
      // Nếu có token thì thêm vào headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
    }),
    createPokemonByName: builder.mutation({
      query: name => ({
        url: `post-anything/${name}`,
        method: 'POST',
        body: {name},
      }),
    }),
    deletePokemonByName: builder.mutation({
      query: id => ({
        url: `delete-anything/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// When we call the mutation from the component, we only can send one parameter
// Query: Dùng để lấy dữ liệu (có thể lưu cache).
// Mutation: Dùng để cập nhật dữ liệu (validate cache).
export const {
  useGetPokemonByNameQuery,
  useCreatePokemonByNameMutation,
  useDeletePokemonByNameMutation,
} = pokemonApi;
