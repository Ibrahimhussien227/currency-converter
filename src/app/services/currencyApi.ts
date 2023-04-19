import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ConverterResponse,
  CurrenciesResponse,
  SymbolsResponse,
} from "./currencyApi.type";

const currenciesApiParamsKey = {
  api_key: import.meta.env.VITE_FIXERAPI_KEY,
};

const baseUrl = import.meta.env.VITE_CURRENCIES_API_URL;

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<CurrenciesResponse, string>({
      query: (base) => ({
        url: `/latest?base=${base}`,
        params: currenciesApiParamsKey,
      }),
    }),
    getSymbols: builder.query<SymbolsResponse, void>({
      query: () => ({
        url: `/currencies`,
        params: currenciesApiParamsKey,
      }),
    }),
    getConverterCurrency: builder.query<
      ConverterResponse,
      { currencyOne: string; currencyTwo: string; amount: number }
    >({
      query: ({ currencyOne, currencyTwo, amount }) => ({
        url: `/convert?from=${currencyOne}&to=${currencyTwo}&amount=${amount}`,
        params: currenciesApiParamsKey,
      }),
    }),
  }),
});

export const {
  useLazyGetCurrenciesQuery,
  useGetSymbolsQuery,
  useGetConverterCurrencyQuery,
} = currencyApi;
