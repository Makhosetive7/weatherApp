import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/data/2.5" }),
   endpoints:(builder) => ({
    GetWeatherByLocation: builder.query({
        query: ({ lat, lon }) => `weather?lat=${lat}&lon=${lon}&units=metric&appid=d4463f8c41ffced9143ae123e17aa7fd`,
    }),
    GetWeatherByCity: builder.query({
        query: (city) => `weather?q=${city}&units=metric&appid=d4463f8c41ffced9143ae123e17aa7fd`,
      }),
   })
})



export const { useGetWeatherByLocationQuery, useGetWeatherByCityQuery } = weatherApi;
export default weatherApi;