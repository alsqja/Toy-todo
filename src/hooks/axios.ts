// import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useRecoilValue } from "recoil";
// import { userSelector } from "../store/user";

export interface UseAxiosResponse {
  called: boolean;
  data: any;
  loading: boolean;
  error: any;
}
// export type UseAxiosPromise = Promise<AxiosResponse<any>>;
// export type UseAxiosType = [
//   (config?: AxiosRequestConfig) => UseAxiosPromise,
//   UseAxiosResponse
// ];

// const apiAxios = Axios.create({ baseURL: "http://localhost:4000" });

// export const useAxios = (): UseAxiosType => {
//   const userInfo = useRecoilValue(userSelector);

//   const [data, setData] = useState<any>();
//   const [error, setError] = useState<any>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [called, setCalled] = useState<boolean>(false);
//   const [response, setResponse] = useState<UseAxiosResponse>({
//     error,
//     loading,
//     called,
//     data,
//   });

//   const request = useCallback(
//     async (config?: AxiosRequestConfig) => {
//       setCalled(false);
//       setLoading(false);
//       setData(false);
//       setError(undefined);

//       config = {
//         ...config,
//         headers: {
//           ...config?.headers,
//         },
//       };

//       try {
//         const res = await apiAxios(config);
//         setData(res?.data);

//         return res;
//       } catch (e) {
//         const error = e?.response?.data ? e?.response?.data : e;
//         setError(error);
//         throw error;
//       } finally {
//         setCalled(true);
//         setLoading(false);
//       }
//     },
//     [setCalled, setLoading, setData, setError]
//   );

//   useEffect(() => {
//     setResponse({
//       error,
//       loading,
//       called,
//       data,
//     });
//   }, [called, data, error, loading]);

//   return [request, response];
// };
