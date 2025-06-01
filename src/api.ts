import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
} from "axios";

import {
    type Dog,
    type Match,
    type DogSearchParams,
    type LocationSearchParams,
    type LocationSearchResponse,
    type Location,
    type DogSearchResponse,
} from "./types";

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

const handleError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
};

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

export const fetchBreeds = async (): Promise<string[]> => {
    try {
        const response = await api.get<string[]>("/dogs/breeds");
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const fetchDogs = async (dogIds: string[]): Promise<Dog[]> => {
    try {
        const response = await api.post<Dog[]>("/dogs", dogIds);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const fetchMatch = async (dogIds: string[]): Promise<Match> => {
    try {
        const response = await api.post<Match>("/dogs/match", dogIds);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const searchLocations = async (
    params: LocationSearchParams
): Promise<LocationSearchResponse> => {
    try {
        const response = await api.post<LocationSearchResponse>(
            "/locations/search",
            params
        );
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const fetchLocations = async (
    zipCodes: string[]
): Promise<Location[]> => {
    try {
        const response = await api.post<Location[]>("/locations", zipCodes);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const searchDogs = async (
    params: DogSearchParams
): Promise<DogSearchResponse> => {
    // Convert arrays to comma-separated strings for URL params
    const processedParams = {
        ...params,
        breeds: params.breeds?.join(","),
        zipCodes: params.zipCodes?.join(","),
    };

    const response = await api.get<DogSearchResponse>("/dogs/search", {
        params: processedParams,
    });
    return response.data;
};
