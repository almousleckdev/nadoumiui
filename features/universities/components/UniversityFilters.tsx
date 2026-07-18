"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface UniversityFiltersProps {
  onSearchChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  searchValue: string;
  provinceValue: string;
  typeValue: string;
  onClear: () => void;
}

export function UniversityFilters({
  onSearchChange,
  onProvinceChange,
  onTypeChange,
  searchValue,
  provinceValue,
  typeValue,
  onClear,
}: UniversityFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
        <Input
          placeholder="Search universities..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Province / City
          </label>
          <Select
            value={provinceValue}
            onChange={(e) => onProvinceChange(e.target.value)}
            className="w-full"
          >
            <option value="">All Locations</option>
            <option value="Beijing">Beijing</option>
            <option value="Shanghai">Shanghai</option>
            <option value="Zhejiang">Zhejiang</option>
            <option value="Sichuan">Sichuan</option>
            <option value="Guangdong">Guangdong</option>
            <option value="Jiangsu">Jiangsu</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            University Type
          </label>
          <Select
            value={typeValue}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full"
          >
            <option value="">All Types</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={onClear}
        disabled={!searchValue && !provinceValue && !typeValue}
      >
        Clear Filters
      </Button>
    </div>
  );
}
