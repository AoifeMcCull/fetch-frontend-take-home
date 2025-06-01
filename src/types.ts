export interface Dog {
    id: string;
    name: string;
    breed: string;
    age: number;
    img: string;
    zip_code: string;
}

export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface Match {
    match: string;
}

export interface DogSearchParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: string;
    sort?: string;
}

export interface LocationSearchParams {
    city?: string;
    states?: string[];
    geoBoundingBox?: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
        bottom_left?: Coordinates;
        top_left?: Coordinates;
    };
    size?: number;
    from?: number;
}

export interface DogSearchResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

export interface LocationSearchResponse {
    results: Location[];
    total: number;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface SortOption {
    field: "breed" | "name" | "age";
    direction: "asc" | "desc";
}
