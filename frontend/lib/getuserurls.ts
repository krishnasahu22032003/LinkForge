import AxiosInstance from "./axios";

export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetUserUrlsResponse {
  success: boolean;
  pagination: Pagination;
  data: Url[];
}

export default async function GetUserUrls(
  page = 1,
  limit = 10
): Promise<GetUserUrlsResponse> {
  try {
    const res =
      await AxiosInstance.get<GetUserUrlsResponse>(
        `/api/v1/url/me?page=${page}&limit=${limit}`
      );

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch urls"
    );
  }
}