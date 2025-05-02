"use client";
import TrInput from "@/components/Form/inputs/TrInput";
import TrForm from "@/components/Form/TrForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateNPMutation } from "@/redux/api/npApi/npApi";
import { globalErrorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
const npSchema = z.object({
  np: z.string({ message: "Np is Required" }),
});

function UpdateNpPage() {
  const params = useParams();
  const search = useSearchParams();
  const np = search.get("np");
  const npId: string = Array.isArray(params?.npId)
    ? params.npId[0]
    : params?.npId || "";
  console.log(npId);
  const [updateNP, { isLoading }] = useUpdateNPMutation();

  const router = useRouter();

  const submitLogic = async (data: { np: any }) => {
    try {
      const res = await updateNP({ data, npId }).unwrap();
      if (res) {
        toast.success(res.message);
        router.push("/dashboard/admin/administration/np-management/all-np");
      }
    } catch (error) {
      globalErrorHandler(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Card className="mx-auto w-full  md:w-6/12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create NP</CardTitle>
          <CardDescription>
            Create National percentage from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrForm
            onSubmit={submitLogic}
            defaultValues={{ np: np }}
            resolver={zodResolver(npSchema)}
          >
            <TrInput
              name="np"
              placeholder="Type your NP "
              label="NP"
              type="number"
            />

            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />} Update
            </Button>
          </TrForm>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateNpPage;
