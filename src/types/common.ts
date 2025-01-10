type TPagination = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };

export type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    pagination?: TPagination;
    data: T;
  };