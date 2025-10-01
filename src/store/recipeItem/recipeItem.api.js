import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipeItemApi = createApi({
  reducerPath: "recipeItemApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["RecipeItemList", "RecipeList"],
  endpoints: (builder) => ({
    getRecipeItem: builder.query({
      query: (prescriptionId) => ({
        url: `/recipe-item`,
        method: "GET",
        params: prescriptionId,
      }),
      providesTags: ["RecipeItemList"],
    }),
    getRecipe: builder.query({
      query: (patientId) => ({
        url: "/recipe",
        method: "GET",
        params: patientId,
      }),
      providesTags: ["RecipeList"],
    }),
    addRecipeItem: builder.mutation({
      query: (newRecipeItem) => ({
        url: "/recipe-item",
        method: "POST",
        body: newRecipeItem,
      }),
      invalidatesTags: ["RecipeItemList", "RecipeList"],
    }),
    updateRecipeStatus: builder.mutation({
      query: (recipe) => ({
        url: "/update-recipe-status",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["RecipeItemList", "RecipeList"],
    }),
  }),
});

export const {
  useGetRecipeItemQuery,
  useAddRecipeItemMutation,
  useGetRecipeQuery,
  useUpdateRecipeStatusMutation,
} = recipeItemApi;
