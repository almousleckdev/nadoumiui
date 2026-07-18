"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface ScholarshipFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onProgramCategoryChange: (value: string) => void;
  searchValue: string;
  categoryValue: string;
  programCategoryValue: string;
  onClear: () => void;
}

export function ScholarshipFilters({
  onSearchChange,
  onCategoryChange,
  onProgramCategoryChange,
  searchValue,
  categoryValue,
  programCategoryValue,
  onClear,
}: ScholarshipFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
        <Input
          placeholder="Search scholarships..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program Level
          </label>
          <Select
            value={programCategoryValue}
            onChange={(e) => onProgramCategoryChange(e.target.value)}
            className="w-full"
          >
            <option value="">All Levels</option>
            <option value="Language">Language</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scholarship Category
          </label>
          <Select
            value={categoryValue}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full"
          >
            <option value="">All Categories</option>
            <option value="CSC">CSC</option>
            <option value="Province">Province</option>
            <option value="Universities">Universities</option>
            <option value="Self_funded">Self Funded</option>
            <option value="Partial">Partial</option>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={onClear}
        disabled={!searchValue && !categoryValue && !programCategoryValue}
      >
        Clear Filters
      </Button>
    </div>
  );
}
