import AxiosInstance from "./axios";

interface Response {

    success:boolean ,
    message:string ,

};

export default async function GetUserUrls():Promise<Response>{

    try{

        const res = await AxiosInstance.get<Response>("/api/v1/url/me");
        return res.data ; 

    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
};