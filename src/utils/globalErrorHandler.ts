import { toast } from "sonner";


export interface TErrorSourse {
    path: string | number;
    message: string;
}

export interface TGenericErrorResponse {
    statusCode: number;
    success: boolean;
    message: string;
    errorSources: TErrorSourse[];
    stack?: string | null;
}

export const globalErrorHandler = (error: unknown) => {
    console.log(error);
    const typeError = error as { data: TGenericErrorResponse };

    if (typeError?.data?.errorSources?.length > 0) {
        toast.error(typeError.data?.errorSources[0]?.message);
    } else {
        toast.error(typeError?.data?.message||"An unknown error occurred");
    }
};