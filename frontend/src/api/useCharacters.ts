import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Pagination } from "../components/Characters";

const apiClient = axios.create({
  baseURL: import.meta.env["VITE_BASE_URL"],
  headers: {
    "Content-Type": "application/json",
  },
});

export const useCharacters = (searchtext: string, pagination: Pagination) =>
  useQuery({
    queryKey: ["characters"],
    queryFn: async () =>
      await apiClient.get(
        `/v1/public/characters?nameStartsWith=${searchtext}&limit=${
          pagination.limit
        }&offset=${pagination.offset}&apikey=${
          import.meta.env["VITE_PUBLIC_KEY"]
        }`
      ),
    enabled: !!searchtext && searchtext?.length > 1,
  });
