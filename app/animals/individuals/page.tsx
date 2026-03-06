"use client";
import AnimalContent from "@/app/components/modal/AnimalContent";
import PageFarmFilterHeader from "@/app/components/PageFarmFilterHeader";
import DataTable from "@/app/components/ui/DataTable";
import { useState } from "react";

export default function IndividualAnimalPage() {
  const [selectedFarm, setSelectedFarm] = useState("all");

  const filteredAnimalBatch =
    selectedFarm === "all"
      ? generalBatch
      : generalBatch.filter((animal) => animal.farm === selectedFarm);

  return (
    <div className="space-y-3 px-2">
      <PageFarmFilterHeader title="My Animals" onChange={setSelectedFarm} />
      <div className="h-120">
        <DataTable
          title="Animals"
          columns={[
            { key: "unique_code", label: "Code" },
            { key: "name", label: "Name" },
            { key: "specie_name", label: "Specie" },
            { key: "sex", label: "Sex" },
            { key: "age", label: "Age" },
            { key: "mother_code", label: "Mother" },
            { key: "father_code", label: "Father" },
            { key: "state", label: "State" },
          ]}
          data={filteredAnimalBatch}
          searchableKeys={["unique_code", "name", "mother_code", "sex"]}
          pagination={{ pageSizeOptions: [10, 15, 50], defaultPageSize: 10 }}

          // define which modal to open per row/cell
          getRowModal={(row, colKey) => {
            // Cell-level modals
            if (colKey === "mother_code" && row.mother_code) {
              return { title: "Mother Details", content: <AnimalContent code={row.mother_code} /> };
            }
            if (colKey === "father_code" && row.father_code) {
              return { title: "Father Details", content: <AnimalContent code={row.father_code} /> };
            }

            // Row-level modal (only if colKey is undefined)
            if (!colKey) {
              return { title: "Animal Details", content: <AnimalContent code={row.unique_code} /> };
            }

            return null; // all other cells
          }}
        />
      </div>
    </div>
  );
}

const generalBatch = [
  {
    unique_code: "CHK-0001",
    name: "Alpha",
    specie_name: "Chicken",
    sex: "Female",
    age: "34 days",
    mother_code: "CHK-M-010",
    father_code: "CHK-F-021",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0002",
    name: "Bravo",
    specie_name: "Chicken",
    sex: "Male",
    age: "36 days",
    mother_code: "CHK-M-011",
    father_code: "CHK-F-022",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0003",
    name: "Charlie",
    specie_name: "Chicken",
    sex: "Female",
    age: "30 days",
    mother_code: "CHK-M-010",
    father_code: "CHK-F-023",
    state: "Growing",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0004",
    name: "Delta",
    specie_name: "Chicken",
    sex: "Male",
    age: "28 days",
    mother_code: "CHK-M-013",
    father_code: "CHK-F-022",
    state: "Healthy",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0005",
    name: "Echo",
    specie_name: "Chicken",
    sex: "Female",
    age: "40 days",
    mother_code: "CHK-M-014",
    father_code: "CHK-F-024",
    state: "Healthy",
    farm: "dairy",
  },
  {
    unique_code: "CHK-0006",
    name: "Foxtrot",
    specie_name: "Chicken",
    sex: "Male",
    age: "25 days",
    mother_code: "CHK-M-011",
    father_code: "CHK-F-025",
    state: "Growing",
    farm: "dairy",
  },
  {
    unique_code: "CHK-0007",
    name: "Gina",
    specie_name: "Chicken",
    sex: "Female",
    age: "31 days",
    mother_code: "CHK-M-012",
    father_code: "CHK-F-021",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0008",
    name: "Hector",
    specie_name: "Chicken",
    sex: "Male",
    age: "29 days",
    mother_code: "CHK-M-014",
    father_code: "CHK-F-026",
    state: "Observation",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0009",
    name: "Ivy",
    specie_name: "Chicken",
    sex: "Female",
    age: "27 days",
    mother_code: "CHK-M-015",
    father_code: "CHK-F-022",
    state: "Healthy",
    farm: "dairy",
  },
  {
    unique_code: "CHK-0010",
    name: "Jasper",
    specie_name: "Chicken",
    sex: "Male",
    age: "33 days",
    mother_code: "CHK-M-013",
    father_code: "CHK-F-027",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0007",
    name: "Gina",
    specie_name: "Cow",
    sex: "Female",
    age: "31 days",
    mother_code: "CHK-M-012",
    father_code: "CHK-F-021",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0008",
    name: "Hector",
    specie_name: "Chicken",
    sex: "Male",
    age: "29 days",
    mother_code: "CHK-M-014",
    father_code: "CHK-F-026",
    state: "Observation",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0009",
    name: "Ivy",
    specie_name: "Chicken",
    sex: "Female",
    age: "27 days",
    mother_code: "CHK-M-015",
    father_code: "CHK-F-022",
    state: "Healthy",
    farm: "dairy",
  },
  {
    unique_code: "CHK-0010",
    name: "Jasper",
    specie_name: "Chicken",
    sex: "Male",
    age: "33 days",
    mother_code: "CHK-M-013",
    father_code: "CHK-F-027",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0011",
    name: "Kira",
    specie_name: "Chicken",
    sex: "Female",
    age: "35 days",
    mother_code: "CHK-M-012",
    father_code: "CHK-F-023",
    state: "Healthy",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0012",
    name: "Leo",
    specie_name: "Chicken",
    sex: "Male",
    age: "26 days",
    mother_code: "CHK-M-015",
    father_code: "CHK-F-028",
    state: "Growing",
    farm: "dairy",
  },
  {
    unique_code: "CHK-0013",
    name: "Maya",
    specie_name: "Chicken",
    sex: "Female",
    age: "32 days",
    mother_code: "CHK-M-014",
    father_code: "CHK-F-026",
    state: "Healthy",
    farm: "north",
  },
  {
    unique_code: "CHK-0014",
    name: "Nico",
    specie_name: "Chicken",
    sex: "Male",
    age: "24 days",
    mother_code: "CHK-M-010",
    father_code: "CHK-F-025",
    state: "Observation",
    farm: "greenhouse",
  },
  {
    unique_code: "CHK-0015",
    name: "Olive",
    specie_name: "Chicken",
    sex: "Female",
    age: "38 days",
    mother_code: "CHK-M-011",
    father_code: "CHK-F-027",
    state: "Healthy",
    farm: "dairy",
  },
];
