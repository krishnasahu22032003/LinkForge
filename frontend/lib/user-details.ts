import AxiosInstance from "./axios";

interface User {

    id:string ,
    username:string ,
    email:string,
    avatar:string 
};

interface Response {

    success:boolean,
    message:string,
    data:User
};

export default async function GetUserDetail():Promise<Response>{

    try{

        const res = await AxiosInstance.get("api/v1/user/me");
        return res.data ;

    }catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
};
