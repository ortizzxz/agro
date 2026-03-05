"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

const farms = [
  { id: "all", name: "All Farms" },
  { id: "north", name: "North Farm" },
  { id: "greenhouse", name: "Greenhouse" },
  { id: "dairy", name: "Dairy Farm" },
];

interface PageFarmFilterHeaderProps {
  title: string;
  onChange?: (farmId: string) => void;
}

export default function PageFarmFilterHeader({ title, onChange }: PageFarmFilterHeaderProps) {
  const [selectedFarm, setSelectedFarm] = useState("all");

  const handleChange = (value: string) => {
    if (value) {
      setSelectedFarm(value);
      onChange?.(value); // notify parent of change
    }
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <ToggleGroup type="single" value={selectedFarm} onValueChange={handleChange}>
        {farms.map((farm) => (
          <ToggleGroupItem key={farm.id} value={farm.id}>
            {farm.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}