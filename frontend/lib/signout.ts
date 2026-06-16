import AxiosInstance from "./axios";

interface Response {

    success:boolean ,
    message:string

};

export default async function UserSignOut():Promise<Response>{

    try{

        const res = await AxiosInstance.post<Response>("/api/v1/user/signout")
        return res.data ;

    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
} ;