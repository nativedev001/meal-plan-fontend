
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {protectedApi} from "@/axios/insentence";

interface UserData {
  name?: string;
  email?: string;
  dietaryRestrictions?: string;
}

export const useGetUser = () => {
  return useQuery<UserData, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await protectedApi.get<UserData>("/users/me");
      return data;
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<UserData, Error, Partial<UserData>>({
    mutationFn: async (updatedData: Partial<UserData>) => {
      const { data } = await protectedApi.patch<UserData>("/users/me", updatedData);
      return data;
    },
  });
};
