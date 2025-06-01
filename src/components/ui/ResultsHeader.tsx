import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

interface ResultsHeaderProps {
    total: number;
    currentPage: number;
    pageSize: number;
    sortOption: { field: "breed" | "name" | "age"; direction: "asc" | "desc" };
    onSortChange: (field: "breed" | "name" | "age") => void;
    onDirectionToggle: () => void;
}

export const ResultsHeader = ({
    total,
    currentPage,
    pageSize,
    sortOption,
    onSortChange,
    onDirectionToggle,
}: ResultsHeaderProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                    {total} {total === 1 ? "Dog" : "Dogs"} Found
                </h2>
                <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * pageSize + 1}-
                    {Math.min(currentPage * pageSize, total)} of {total}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Select
                    value={sortOption.field}
                    onValueChange={(value: "breed" | "name" | "age") =>
                        onSortChange(value)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            <span>Sort by</span>
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="breed">Breed</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant={
                        sortOption.direction === "asc" ? "outline" : "default"
                    }
                    size="icon"
                    onClick={onDirectionToggle}
                >
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
