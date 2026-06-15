import AxiosInstance from "./axios";

interface Response {

    success: boolean,
    message: string,
    user: {
        id: string,
        email: string,
        username: string
    }
};

export default async function GoogleAuth(credential: string): Promise<Response> {

    try {

        const res = await AxiosInstance.post<Response>("/api/v1/user/google",
            {
                credential,
            });
        return res.data;

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };

};