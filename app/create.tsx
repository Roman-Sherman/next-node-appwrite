"use client";

import { signUpWithEmail } from "@/lib";
import { createEmailSession, getAccount } from "@/lib/fetch";
import { useEffect } from "react";

const Create = () => {
  useEffect(() => {
    getAccount()
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async () => {
    try {
      const user = {
        email: "johndoe10@gmail.com",
        password: "1234567890",
        name: "John Doe 12",
      };

      await signUpWithEmail(user.email, user.password, user.name);

      await createEmailSession(user.email, user.password);
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
