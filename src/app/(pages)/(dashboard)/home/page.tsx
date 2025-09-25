"use client";
import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { useUpdateUser, useGetUser } from "@/hooks/useUpdate";
import { useDietPlan } from "@/hooks/useDietPlan";

// Example dietary options
const diets = ["vegetarian", "gluten-free"];

const Home = () => {
  const { data: user } = useGetUser();
  const updateUser = useUpdateUser();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user && !user.dietaryRestrictions) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      setSelectedDiet(user?.dietaryRestrictions || null);
    }
  }, [user]);

  const { data: mealPlanData, isLoading } = useDietPlan(selectedDiet);

  const handleDietSelect = () => {
    if (!selectedDiet) return;
    setErrorMessage(null);

    updateUser.mutate(
      { dietaryRestrictions: selectedDiet },
      {
        onSuccess: () => {
          setShowPopup(false);
        },
        onError: (err: any) => {
          if (err?.response?.data?.message) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage("Something went wrong. Please try again.");
          }
        },
      }
    );
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <Layout>
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-800 text-center">
              Select Your Diet
            </h3>

            <select
              className="border rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              value={selectedDiet || ""}
              onChange={(e) => setSelectedDiet(e.target.value)}
            >
              <option value="" disabled>
                Choose diet type
              </option>
              {diets.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>

            {errorMessage && (
              <p className="text-sm text-red-600 text-center">{errorMessage}</p>
            )}

            <button
              onClick={handleDietSelect}
              className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
          <div className="loader border-4 border-purple-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {!showPopup && !isLoading && mealPlanData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {mealPlanData.plan.map((day) => {
            const isToday =
              day.day.toLowerCase() === today.toLowerCase();

            return (
              <div
                key={day.day}
                className={`rounded-xl p-5 flex flex-col gap-3 shadow-md border transition 
                  ${
                    isToday
                      ? "bg-purple-600 text-white shadow-xl scale-105"
                      : "bg-white border-purple-100 hover:shadow-lg"
                  }`}
              >
                <h4
                  className={`font-bold text-lg ${
                    isToday ? "text-white" : "text-purple-600"
                  }`}
                >
                  {day.day}
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {day.meals.map((meal, idx) => (
                    <li key={idx}>{meal}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Home;
