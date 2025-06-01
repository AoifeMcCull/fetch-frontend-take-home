import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FiltersSectionProps {
    breeds: string[];
    selectedBreeds: string[];
    onBreedChange: (breed: string, isChecked: boolean) => void;
    zipCodes: string;
    onZipCodesChange: (value: string) => void;
    ageMin: string;
    onAgeMinChange: (value: string) => void;
    ageMax: string;
    onAgeMaxChange: (value: string) => void;
    onSearch: () => void;
}

export const FiltersSection = ({
    breeds,
    selectedBreeds,
    onBreedChange,
    zipCodes,
    onZipCodesChange,
    ageMin,
    onAgeMinChange,
    ageMax,
    onAgeMaxChange,
    onSearch,
}: FiltersSectionProps) => {
    return (
        <div className="space-y-6 ml-5">
            {/* Breed Filter */}
            <div className="space-y-3">
                <h3 className="font-medium">Breeds</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto p-1">
                    {breeds.map((breed) => (
                        <div
                            key={breed}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={`breed-${breed}`}
                                checked={selectedBreeds.includes(breed)}
                                onCheckedChange={(checked) =>
                                    onBreedChange(breed, checked as boolean)
                                }
                            />
                            <Label
                                htmlFor={`breed-${breed}`}
                                className="text-sm font-normal"
                            >
                                {breed}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Zip Codes Filter */}
            <div className="space-y-3">
                <h3 className="font-medium">Zip Codes</h3>
                <Input
                    placeholder="Enter zip codes separated by commas"
                    value={zipCodes}
                    onChange={(e) => onZipCodesChange(e.target.value)}
                />
            </div>

            {/* Age Filter */}
            <div className="space-y-3">
                <h3 className="font-medium">Age Range</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="ageMin">Min Age</Label>
                        <Input
                            id="ageMin"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={ageMin}
                            onChange={(e) => onAgeMinChange(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ageMax">Max Age</Label>
                        <Input
                            id="ageMax"
                            type="number"
                            min="0"
                            placeholder="No limit"
                            value={ageMax}
                            onChange={(e) => onAgeMaxChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Button
                        className="w-full bg-violet-600 text-white"
                        variant="outline"
                        size="sm"
                        onClick={onSearch}
                    >
                        {"Search"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
