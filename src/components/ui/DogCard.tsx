import { Heart, HeartCrack, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { type Dog, type Location } from "@/types";

interface DogCardProps {
    dog: Dog;
    location?: Location;
    isFavorite: boolean;
    onToggleFavorite: (dogId: string) => void;
}

export const DogCard = ({
    dog,
    location,
    isFavorite,
    onToggleFavorite,
}: DogCardProps) => {
    return (
        <Card
            className={`relative overflow-hidden transition-all hover:shadow-md ${
                isFavorite ? "border-primary" : ""
            }`}
        >
            <CardHeader className="p-0">
                <div className="relative">
                    <img
                        src={dog.img || "/placeholder-dog.jpg"}
                        alt={dog.name}
                        className="w-full h-48 object-cover"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 rounded-full ${
                            isFavorite
                                ? "text-yellow-500 hover:bg-yellow-500/10"
                                : "text-muted-foreground hover:bg-foreground/10"
                        }`}
                        onClick={() => onToggleFavorite(dog.id)}
                    >
                        <Star
                            className="h-5 w-5"
                            fill={isFavorite ? "currentColor" : "none"}
                        />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{dog.name}</h3>
                    <Badge variant="outline">{dog.age} yrs</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    {dog.breed}
                </p>
                {location && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                            {location.city}, {location.state}{" "}
                            {location.zip_code}
                        </span>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    variant={isFavorite ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => onToggleFavorite(dog.id)}
                >
                    {isFavorite ? (
                        <>
                            <HeartCrack className="h-4 w-4 mr-2" />
                            Remove Favorite
                        </>
                    ) : (
                        <>
                            <Heart className="h-4 w-4 mr-2" />
                            Add to Favorites
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};
