import AxiosInstance from "./axios";

interface UserData {

    email: string,
    password: string

};

interface Response {

    success: boolean,
    message: string,
    user: {
        id: string,
        username: string,
        email: string
    }
};

export default async function SignIn(data: UserData): Promise<Response> {

    try {

        const res = await AxiosInstance.post<Response>("/api/v1/user/signin", data);
        return res.data;

    } catch (error: any) {

        throw new Error(error.response?.data?.message || "Registration failed");

    };

}; 