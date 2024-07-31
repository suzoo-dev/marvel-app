import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiKey, baseURL } from "./constants";

import { Pagination } from "../types/types";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useCharacters = (searchtext: string, pagination: Pagination) =>
  useQuery({
    queryKey: ["characters"],
    queryFn: async () =>
      await apiClient.get(
        `/v1/public/characters?nameStartsWith=${searchtext}&limit=${pagination.limit}&offset=${pagination.offset}&apikey=${apiKey}`
      ),
    enabled: !!searchtext && searchtext?.length > 1,
  });
