import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addUser } from "../slices";

export const pharmacyApi = createApi({
  reducerPath: "pharmacyApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MAIN_URL }),
  tagTypes: ["PharmacyList"],
  endpoints: (builder) => ({
    getPharmacy: builder.query({
      query: () => ({
        url: "/pharmacy",
        method: "GET",
      }),
      providesTags: ["PharmacyList"],
    }),
    addPharmacy: builder.mutation({
      query: (newPharmacy) => ({
        url: "/pharmacy",
        method: "POST",
        body: newPharmacy,
      }),
      invalidatesTags: ["PharmacyList"],
    }),
    updatePharmacy: builder.mutation({
      query: (pharmacy) => ({
        url: "/pharmacy",
        method: "POST",
        body: pharmacy,
      }),
      invalidatesTags: ["PharmacyList"],
    }),
    loginPharmacists: builder.mutation({
      query: (doc) => ({
        url: "/login-pharmacists",
        method: "POST",
        body: doc,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addUser(data?.data));
        } catch (err) {
          console.error("Login failed", err);
        }
      },
      invalidatesTags: ["DoctorList"],
    }),
  }),
});

export const {
  useGetPharmacyQuery,
  useAddPharmacyMutation,
  useUpdatePharmacyMutation,
  useLoginPharmacistsMutation,
} = pharmacyApi;
