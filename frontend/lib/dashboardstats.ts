import AxiosInstance from "./axios";

interface Response {

    success:false ,
    data:{
         totalUrls:number ,
         totalClicks:number
    }
};

export default async function GetDashboardStats():Promise<Response>{

    try{

        const res = await AxiosInstance.get("/api/v1/url/dashboard/stats");
        return res.data ;

    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
};