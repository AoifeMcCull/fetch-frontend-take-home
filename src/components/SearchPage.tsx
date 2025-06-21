import { useState, useEffect } from "react";
import {
    fetchBreeds,
    searchDogs,
    fetchDogs,
    fetchMatch,
    fetchLocations,
    authApi,
} from "@/api";
import {
    type Dog,
    type DogSearchParams,
    type SortOption,
    type Location,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Filter, LogOut } from "lucide-react";
import { FiltersSection } from "@/components/ui/FiltersSection";
import { DogCard } from "@/components/ui/DogCard";
import { Pagination } from "@/components/ui/Pagination";
import { ResultsHeader } from "@/components/ui/ResultsHeader";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { NoResults } from "@/components/ui/NoResults";
import { FavoritesBar } from "./ui/FavoritesBar";

const SearchPage = () => {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [zipCodes, setZipCodes] = useState<string>("");
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");
    const [sortOption, setSortOption] = useState<SortOption>({
        field: "breed",
        direction: "asc",
    });
    const [searchResult, setSearchResult] = useState<{
        resultIds: string[];
        total: number;
    }>({ resultIds: [], total: 0 });
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [match, setMatch] = useState<Dog | null>(null);
    const [locations, setLocations] = useState<Record<string, Location>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    // Fetch breeds on mount
    useEffect(() => {
        console.log(window.location.search);
        const testURLSearchParams = new URLSearchParams(window.location.search);
        console.log(testURLSearchParams);
        const loadBreeds = async () => {
            try {
                const breedList = await fetchBreeds();
                setBreeds(breedList);
            } catch (error) {
                console.error("Error loading breeds:", error);
            }
        };
        loadBreeds();
        search();
    }, []);

    // Fetch dog details when search results change
    useEffect(() => {
        setIsLoading(true);
        const loadDogs = async () => {
            if (searchResult.resultIds.length > 0) {
                try {
                    const dogData = await fetchDogs(searchResult.resultIds);
                    setDogs(dogData);
                    // Extract unique zip codes for location data
                    const uniqueZipCodes = [
                        ...new Set(dogData.map((dog) => dog.zip_code)),
                    ];
                    if (uniqueZipCodes.length > 0) {
                        const locationsData = await fetchLocations(
                            uniqueZipCodes
                        );
                        const locationsMap = locationsData.reduce(
                            (acc, location) => {
                                acc[location.zip_code] = location;
                                return acc;
                            },
                            {} as Record<string, Location>
                        );
                        setLocations(locationsMap);
                    }
                } catch (error) {
                    console.error("Error loading dogs:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setDogs([]);
                setIsLoading(false);
            }
        };

        loadDogs();
    }, [searchResult.resultIds]);

    //search again and reset to page 1 when page size changes or sort options change
    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize, sortOption]);

    //search when the page changes
    useEffect(() => {
        search();
    }, [currentPage]);

    /*const appendURLSearchParams = (params) => {
        console.log(params.zipCodes);
        const url = new URL(window.location.href)
        url.searchParams.set('zipCodes', params.zipCodes)
        history.pushState('/')
    };*/

    const search = async () => {
        setIsLoading(true);
        try {
            const params: DogSearchParams = {
                breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
                zipCodes: zipCodes
                    ? zipCodes.split(",").map((z) => z.trim())
                    : undefined,
                ageMin: ageMin ? parseInt(ageMin) : undefined,
                ageMax: ageMax ? parseInt(ageMax) : undefined,
                size: pageSize,
                from:
                    currentPage > 1
                        ? ((currentPage - 1) * pageSize).toString()
                        : undefined,
                sort: `${sortOption.field}:${sortOption.direction}`,
            };
            appendURLSearchParams(params);
            const result = await searchDogs(params);
            setSearchResult(result);
        } catch (error) {
            console.error("Error searching dogs:", error);
            setIsLoading(false);
        }
    };

    const handleBreedChange = (breed: string, isChecked: boolean) => {
        setSelectedBreeds((prev) =>
            isChecked ? [...prev, breed] : prev.filter((b) => b !== breed)
        );
    };

    const handleSortChange = (field: "breed" | "name" | "age") => {
        setSortOption((prev) => ({
            field,
            direction:
                prev.field === field
                    ? prev.direction === "asc"
                        ? "desc"
                        : "asc"
                    : "asc",
        }));
        search();
    };

    const handleDirectionToggle = () => {
        setSortOption((prev) => ({
            ...prev,
            direction: prev.direction === "asc" ? "desc" : "asc",
        }));
        search();
    };

    const toggleFavorite = (dogId: string) => {
        setFavorites((prev) =>
            prev.includes(dogId)
                ? prev.filter((id) => id !== dogId)
                : [...prev, dogId]
        );
    };

    const handleGenerateMatch = async () => {
        if (favorites.length === 0) {
            alert("Please add some dogs to your favorites first!");
            return;
        }

        try {
            const matchResult = await fetchMatch(favorites);
            const matchedDog = await fetchDogs([matchResult.match]);
            setMatch(matchedDog[0]);
        } catch (error) {
            console.error("Error generating match:", error);
        }
    };

    const logout = authApi.logout;
    const totalPages = Math.ceil(searchResult.total / pageSize);

    return (
        <div className="container py-8 pb-24 max-w-full">
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="w-4/5 flex flex-row gap-2 justify-between self-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Fetch a Dog!
                    </h1>
                    <p className="text-muted-foreground">
                        Browse our database of adoptable dogs and find your new
                        best friend.
                    </p>
                    <Button
                        variant="destructive"
                        className="w-26 align-self-end"
                        onClick={logout}
                    >
                        Logout
                        <LogOut></LogOut>
                    </Button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10">
                    {/* Filters Sidebar - Mobile */}
                    <div className="lg:hidden">
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-2"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <Filter className="h-4 w-4" />
                            {isFilterOpen ? "Hide Filters" : "Show Filters"}
                        </Button>

                        {isFilterOpen && (
                            <div className="mt-4 p-4 border rounded-lg bg-background">
                                <FiltersSection
                                    breeds={breeds}
                                    selectedBreeds={selectedBreeds}
                                    onBreedChange={handleBreedChange}
                                    zipCodes={zipCodes}
                                    onZipCodesChange={setZipCodes}
                                    ageMin={ageMin}
                                    onAgeMinChange={setAgeMin}
                                    ageMax={ageMax}
                                    onAgeMaxChange={setAgeMax}
                                    onSearch={search}
                                />
                            </div>
                        )}
                    </div>

                    {/* Filters Sidebar - Desktop */}
                    <div className="hidden lg:block space-y-6 sticky top-20 self-start h-[calc(100vh-6rem)] overflow-y-auto">
                        <FiltersSection
                            breeds={breeds}
                            selectedBreeds={selectedBreeds}
                            onBreedChange={handleBreedChange}
                            zipCodes={zipCodes}
                            onZipCodesChange={setZipCodes}
                            ageMin={ageMin}
                            onAgeMinChange={setAgeMin}
                            ageMax={ageMax}
                            onAgeMaxChange={setAgeMax}
                            onSearch={search}
                        />
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-3 space-y-6">
                        <ResultsHeader
                            total={searchResult.total}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            sortOption={sortOption}
                            onSortChange={handleSortChange}
                            onDirectionToggle={handleDirectionToggle}
                        />

                        {/* Results Grid */}
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : dogs.length === 0 ? (
                            <NoResults />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dogs.map((dog) => (
                                        <DogCard
                                            key={dog.id}
                                            dog={dog}
                                            location={locations[dog.zip_code]}
                                            isFavorite={favorites.includes(
                                                dog.id
                                            )}
                                            onToggleFavorite={toggleFavorite}
                                        />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    pageSize={pageSize}
                                    onPageChange={setCurrentPage}
                                    onPageSizeChange={setPageSize}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <FavoritesBar
                onGenerateMatch={handleGenerateMatch}
                match={
                    match
                        ? {
                              id: match.id,
                              name: match.name,
                              breed: match.breed,
                              age: match.age,
                              img: match.img,
                              zip_code: match.zip_code,
                          }
                        : undefined
                }
                favorites={favorites}
                onRemoveFavorite={toggleFavorite}
            />
        </div>
    );
};

export default SearchPage;
