import AxiosInstance from "./axios";

interface Response {

    success:boolean ,
    message:string ,

};

export default async function DeleteUrl(id:string):Promise<Response>{

    try{

        const res = await AxiosInstance.delete<Response>(`/api/v1/url/${id}`) ;
        return res.data ;
    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
};