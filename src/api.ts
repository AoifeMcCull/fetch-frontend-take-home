import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
} from "axios";

//Interfaces
interface LoginCredentials {
    name: string;
    email: string;
}

//Axios inst
const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

//Interceptors

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            alert("Your session has expired! Please log in again.");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

//API methods
export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AxiosResponse> => {
        const { data } = await api.post<AxiosResponse>(
            "/auth/login",
            credentials
        );
        return data;
    },

    logout: async (): Promise<void> => {
        await api.post("/auth/logout");
        window.location.href = "/";
    },
};

//Raw instance just in case
export default api;
