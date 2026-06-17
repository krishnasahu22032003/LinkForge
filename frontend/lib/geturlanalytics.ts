import AxiosInstance from "./axios";

export interface Visit {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  visitedAt: string;
};

export interface UrlAnalyticsData {
  urlId: string;
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  totalVisits: number;
  uniqueVisitors: number;
  lastVisited: string | null;
  visits: Visit[];
};

export interface GetUrlAnalyticsResponse {
  success: boolean;
  data: UrlAnalyticsData;
};

export default async function GetUrlAnalytics(id:string):Promise<GetUrlAnalyticsResponse>{

    try{

        const res = await AxiosInstance.get<GetUrlAnalyticsResponse>(`/api/v1/url/${id}/analytics`);
        return res.data ; 

    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
};