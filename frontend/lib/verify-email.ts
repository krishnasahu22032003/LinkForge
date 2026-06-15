import AxiosInstance from "./axios";

interface UserData {

    token: string,

};

interface Response {

    success: boolean,
    message: string

};

export async function VerifyEmail(token: UserData): Promise<Response> {

    try {

        const res = await AxiosInstance.post<Response>("/api/v1/user/verifyEmail", token);
        return res.data;

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };

};




