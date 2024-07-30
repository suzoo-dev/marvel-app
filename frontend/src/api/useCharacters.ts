import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env["VITE_BASE_URL"],
  headers: {
    "Content-Type": "application/json",
  },
});

export const useCharacters = () =>
  useQuery({
    queryKey: ["characters"],
    queryFn: async () =>
      await apiClient.get(
        `/v1/public/characters?limit=10&apikey=${
          import.meta.env["VITE_PUBLIC_KEY"]
        }`
      ),
  });
