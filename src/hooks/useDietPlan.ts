import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/axios/insentence";

export interface MealPlan {
  day: string;
  meals: string[];
}

export interface DietPlanResponse {
  dietType: string;
  plan: MealPlan[];
}

export const useDietPlan = (dietType: string | null) => {
  return useQuery<DietPlanResponse, Error>({
    queryKey: ["dietPlan", dietType],
    queryFn: async () => {
      const { data } = await publicApi.get<DietPlanResponse>(
        `/dietary/${dietType}`
      );
      return data;
    },
    enabled: !!dietType, 
  });
};
