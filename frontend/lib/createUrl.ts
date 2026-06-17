import AxiosInstance from "./axios";

interface UrlData {

    url: string,

};

export interface ShortUrlData {
    id: string;
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
    createdAt: Date;
    ownedByUser: boolean;
};

export interface CreateShortUrlResponse {
    success: boolean;
    message: string;
    data: ShortUrlData;
};

export default async function CreateUrl(url: UrlData): Promise<CreateShortUrlResponse> {

    try {

        const res = await AxiosInstance.post<CreateShortUrlResponse>("/api/v1/url/create", url);
        return res.data;

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };

};