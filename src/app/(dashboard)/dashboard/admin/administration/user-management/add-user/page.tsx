import { SingUpForm } from "@/components/login/SingUpForm";
import React from "react";

const AddUserPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className="w-[90%] mx-auto  p-6 h-auto rounded-lg
       "
      >
        <SingUpForm />
      </div>
    </div>
  );
};

export default AddUserPage;
