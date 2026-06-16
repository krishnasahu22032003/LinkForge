import AxiosInstance from "./axios";

interface UserData {

username : string ,
currentPassword:string,
newPassword:string,

} ;

interface updatedUser {
    
    id:string ,
    username:string ,
    email:string ,
    updatedAt:Date

};

interface Response {

success:boolean ,
message:string ,
data:updatedUser

};

export default async function updateUserDetails(data:UserData):Promise<Response>{

    try{

        const res = await AxiosInstance.patch("api/v1/user/update" , data);
        return res.data ;
        
    }catch(error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };
} ;