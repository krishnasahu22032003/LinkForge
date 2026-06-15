import AxiosInstance from "./axios";

interface UserDetails {

    username: string,
    email: string,
    password: string

};

interface SignUpResponse {

    success: boolean,
    message: string,
    data: {
        name: string,
        email: string
    }

};

export async function SignUp(UserData: UserDetails): Promise<SignUpResponse> {

    try {

        const res = await AxiosInstance.post<SignUpResponse>("/api/v1/user/signup", UserData);
        return res.data;

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");
        
    };

};

