import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiKey, baseURL } from "./constants";
import { Character } from "../types/types";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useCharacters = (searchtext: string) =>
  useQuery({
    queryKey: ["characters"],
    queryFn: async (): Promise<Character[]> => {
      const res = await apiClient.get(
        `/v1/public/characters?nameStartsWith=${searchtext}&limit=100&offset=0&apikey=${apiKey}`
      );
      return res.data.data.results;
    },
    refetchOnMount: false,
    enabled: false,
  });
