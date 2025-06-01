import { Dog as DogIcon } from "lucide-react";

export const NoResults = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <DogIcon className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No dogs found</h3>
            <p className="text-sm text-muted-foreground">
                Try adjusting your search filters to find more results
            </p>
        </div>
    );
};
