
"use client"
import TrFileUploader from "@/components/Form/inputs/TrFileUploader";
import TrForm from "@/components/Form/TrForm";
import SingUpComp from "@/components/login/SingUpComp";
import React from "react";
import { useForm } from "react-hook-form";
type FormData = {
  uploadedFile: FileList;
};
const SingupPage = () => {
  // const { control, handleSubmit } = useForm<FormData>();

  const handles = (data: FormData) => {
    console.log(data.uploadedFile);
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen h-auto">
      {/* <SingUpComp /> */}
      <TrForm onSubmit={handles} className="space-y-4">
      <TrFileUploader
        name="uploadedFile"
        label="Upload File"
        accept="image/*, .pdf"
       
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        Submit
      </button>
    </TrForm>
    </div>
  );
};

export default SingupPage;
