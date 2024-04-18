"use client";

import { createTask } from "@/lib";

const Create = () => {
  const handleSubmit = async () => {
    try {
      await createTask("Learn Next.js", "Goal");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Create
    </button>
  );
};

export default Create;
