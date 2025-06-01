import { Button } from "@/components/ui/button";
import { Heart, HeartCrack, Star, X, DogIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/ScrollArea";
import type { Dog } from "@/types";
import { fetchDogs } from "@/api";
import { useEffect, useState } from "react";

interface FavoritesBarProps {
    favorites: string[];
    onRemoveFavorite: (dogId: string) => void;
    onGenerateMatch: () => void;
    match?: Dog;
}

export const FavoritesBar = ({
    favorites,
    onRemoveFavorite,
    onGenerateMatch,
    match,
}: FavoritesBarProps) => {
    const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

    useEffect(() => {
        const loadFavoriteDogs = async () => {
            if (favorites.length > 0) {
                try {
                    const dogs = await fetchDogs(favorites);
                    setFavoriteDogs(dogs);
                } catch (error) {
                    console.error("Error loading favorite dogs:", error);
                } finally {
                }
            } else {
                setFavoriteDogs([]);
            }
        };

        loadFavoriteDogs();
    }, [favorites]);
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
            <div className="container mx-auto p-4">
                <div className="flex flex-col gap-4">
                    {/* Match Preview (if exists) */}
                    {match && (
                        <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                {match.img && (
                                    <img
                                        src={match.img}
                                        alt={match.name}
                                        className="h-12 w-12 rounded-full object-cover border-2 border-primary"
                                    />
                                )}
                                <div>
                                    <p className="font-medium">
                                        Your Perfect Match!
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {match.name} • {match.breed} •{" "}
                                        {match.age} yrs
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    alert("Adoption is not yet available!");
                                }}
                            >
                                Adopt Now
                            </Button>
                        </div>
                    )}

                    {/* Favorites List */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 shrink-0">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">Favorites</span>
                            <Badge variant="secondary">
                                {favorites.length}
                            </Badge>
                        </div>

                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex gap-2 py-1">
                                {favorites.length > 0 ? (
                                    favoriteDogs.map((dog) => (
                                        <div
                                            key={dog.id}
                                            className="relative group flex flex-col items-center gap-1 p-2 rounded-lg border hover:bg-secondary/50 transition-colors"
                                        >
                                            {dog.img ? (
                                                <img
                                                    src={dog.img}
                                                    alt={dog.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                    <DogIcon className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium max-w-[80px] truncate">
                                                {dog.name}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() =>
                                                    onRemoveFavorite(dog.id)
                                                }
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-muted-foreground italic py-2 px-4">
                                        No dogs favorited yet
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        <Button
                            className="shrink-0"
                            onClick={onGenerateMatch}
                            disabled={favorites.length === 0}
                            size="lg"
                        >
                            {favorites.length > 0 ? (
                                <>
                                    <Heart className="h-4 w-4 mr-2" />
                                    Find Match
                                </>
                            ) : (
                                <>
                                    <HeartCrack className="h-4 w-4 mr-2" />
                                    Add Favorites
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
