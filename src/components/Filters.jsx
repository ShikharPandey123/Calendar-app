import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

const Filters = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (onFilterChange) {
      onFilterChange({ keyword: value, category });
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (onFilterChange) {
      onFilterChange({ keyword, category: value });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <Input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={handleKeywordChange}
        className="w-full sm:w-1/2"
      />
     <Select onChange={handleCategoryChange} value={category}>
  <SelectTrigger className="w-full sm:w-1/4">
    <SelectValue placeholder="Select Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="">All Categories</SelectItem>
    <SelectItem value="work">Work</SelectItem>
    <SelectItem value="personal">Personal</SelectItem>
    <SelectItem value="others">Others</SelectItem>
  </SelectContent>
</Select>;

    </div>
  );
};

export default Filters;
