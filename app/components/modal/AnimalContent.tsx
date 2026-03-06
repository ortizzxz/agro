"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck, Calendar, CircleCheck, CircleX, DollarSign, Droplets, Hash, LandPlot, MapPin, Pen, Scale, User, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "../ui/DataTable";

interface AnimalContentProps {
    code: string;
}

interface WeightLog {
    log_date: string;
    weight: number;
}

interface MilkProduction {
    record_date: string;
    daily_liters?: number;
    liters_per_pregnancy?: number;
    fat_percentage?: number;
    protein_percentage?: number;
    somatic_cell_count?: number;
}

interface Purchase {
    bill_number?: string;
    provider_name: string;
    purchase_date: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

interface AnimalData {
    unique_code: string;
    name: string;
    specie_name: string;
    breed_name: string;
    sex: string;
    age: number;
    mother_code?: string;
    father_code?: string;
    state: string;
    breed?: string;
    origin?: string;
    location?: string;
    birth_date?: string;
    is_tattooed?: boolean;
    is_branded?: boolean;

    weight_log?: WeightLog[];
    milk_production?: MilkProduction[];
    purchases?: Purchase[];
}

// Example mockDatabase (replace with actual API later)
const mockDatabase: Record<string, AnimalData> = {
    "CHK-M-010": {
        unique_code: "A001",
        name: "Bella",
        specie_name: "Cattle",
        breed_name: "Holstein",
        sex: "f",
        age: 4,
        state: "active",
        breed: "Dairy",
        origin: "Farm #12",
        location: "North Farm",
        birth_date: "2019-05-10",
        is_tattooed: true,
        is_branded: false,
        mother_code: "YMK-F-100",
        father_code: "YMK-M-120",
        weight_log: [
            { log_date: "2023-01-01", weight: 450 },
            { log_date: "2023-06-01", weight: 480 },
        ],
        milk_production: [
            { record_date: "2023-06-01", daily_liters: 18, fat_percentage: 3.8, protein_percentage: 3.2 },
        ],
        purchases: [
            { bill_number: "B123", provider_name: "Farm Supplier Ltd", purchase_date: "2019-04-20", quantity: 1, unit_price: 1200, total_price: 1200 },
        ],
    },
};

const animalWeighLog: Record<string, any> = {
    "CHK-M-010": {
        logs: [
            { date: "01-01-25", weight: "21 kg" },
            { date: "02-01-25", weight: "22 kg" },
            { date: "03-01-25", weight: "23 kg" },
            { date: "04-01-25", weight: "24 kg" },
            { date: "05-01-25", weight: "25 kg" },
        ]
    }
};

const animalMilkData: Record<string, any> = {
    "CHK-M-010": {
        milk_production: [
            { record_date: "01-01-25", daily_liters: 5, fat_percentage: 3.5, protein_percentage: 3.2 },
            { record_date: "02-01-25", daily_liters: 5.2, fat_percentage: 3.6, protein_percentage: 3.3 },
            { record_date: "03-01-25", daily_liters: 4.8, fat_percentage: 3.4, protein_percentage: 3.1 },
            { record_date: "04-01-25", daily_liters: 5.1, fat_percentage: 3.5, protein_percentage: 3.2 },
            { record_date: "05-01-25", daily_liters: 5, fat_percentage: 3.5, protein_percentage: 3.2 },
        ]
    },
    "CHK-F-011": {
        milk_production: [
            { record_date: "01-01-25", daily_liters: 4.5, fat_percentage: 3.3, protein_percentage: 3.0 },
            { record_date: "02-01-25", daily_liters: 4.6, fat_percentage: 3.4, protein_percentage: 3.1 },
        ]
    }
};

export default function AnimalContent({ code }: AnimalContentProps) {
    const [animal, setAnimal] = useState<AnimalData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setAnimal(mockDatabase[code] || null);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [code]);



    const formatState = (state: string) => {
        const lower = state.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const weightTableData = Object.entries(animalWeighLog).flatMap(([animalId, animal]) =>
        animal.logs.map(log => ({
            Date: log.date,
            "Average Weight": log.weight,
            AnimalID: animalId,
        }))
    );

    const milkTableData = Object.entries(animalMilkData).flatMap(([animalId, animal]) =>
        animal.milk_production.map(record => ({
            Date: record.record_date,
            "Daily Liters": record.daily_liters,
            Fat: record.fat_percentage,
            Protein: record.protein_percentage,
            AnimalID: animalId,
        }))
    );

    if (loading) {
        return (
            <Card className="max-w-xl mx-auto bg-transparent shadow-none border-none">
                <CardHeader className="px-0 pt-0 pb-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <div className="flex gap-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!animal)
        return (
            <div className="text-lg text-center py-8">
                We couldn't find any data for {code}
            </div>
        );


    return (
        <Card className="mx-auto overflow-hidden border-0 shadow-none">
            <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Main title section */}
                    <div className="space-y-1 flex-1 min-w-0">
                        <CardTitle className="text-xl md:text-2xl lg:text-3xl  ">
                            {animal.name}
                            <span className="text-lg md:text-xl text-gray-600 font-normal ml-2">({animal.specie_name})</span>
                        </CardTitle>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{animal.sex === "m" ? "Male" : "Female"}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300" />
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{animal.age} year{animal.age > 1 ? "s" : ""}</span>
                            </div>
                            {animal.breed && (
                                <>
                                    <div className="w-px h-4 bg-gray-300" />
                                    <div className="flex items-center gap-1.5">
                                        <LandPlot className="w-4 h-4 text-gray-400" />
                                        <span>Purpose: <span className="font-medium">{animal.breed}</span></span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status badges */}
                    <div className="flex items-center gap-2 self-start lg:self-auto">
                        <Badge variant="outline" className="text-sm border-gray-300 bg-gray-50 h-9 px-3">
                            {animal.breed_name}
                        </Badge>
                        <Badge variant="outline" className="text-sm border-gray-300 bg-gray-50 h-9 px-3 gap-1.5">
                            <CircleCheck className={animal.state == 'active' ? 'w-4 h-4 text-green-600 flex-shrink-0' : 'hidden'} />
                            <CircleX className={animal.state != 'active' ? 'w-4 h-4 text-red-600 flex-shrink-0' : 'hidden'} />
                            <span className="font-medium">{formatState(animal.state)}</span>
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 pb-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left column - Key details */}
                    <div className="space-y-3">
                        {/* Basic info grid */}
                        <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,auto)_1fr] gap-4 md:gap-x-10">
                            <div className="flex flex-col gap-1.5">
                                <dt className="text-xs uppercase tracking-wider font-medium text-gray-500">Code</dt>
                                <dd className="font-semibold text-xl text-gray-900">{animal.unique_code}</dd>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <dt className="text-xs uppercase tracking-wider font-medium text-gray-500">Location</dt>
                                <dd className="flex items-center gap-2.5 font-medium text-gray-900">
                                    <LandPlot className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    <span>{animal.location || "-"}</span>
                                </dd>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <dt className="text-xs uppercase tracking-wider font-medium text-gray-500">Origin</dt>
                                <dd className="flex items-center gap-2.5 font-medium text-gray-900">
                                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    <span>{animal.origin || "-"}</span>
                                </dd>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <dt className="text-xs uppercase tracking-wider font-medium text-gray-500">Birth Date</dt>
                                <dd className="flex items-center gap-2.5 font-medium text-gray-900">
                                    <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    <span>{animal.birth_date || "-"}</span>
                                </dd>
                            </div>
                        </div>

                        {/* Parents & Identification */}
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <h4 className="text-xs uppercase tracking-wider font-medium text-gray-500 flex gap-1 items-center">
                                    <Users className="w-5 h-5" />
                                    Parents
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="group flex items-center gap-3 p-2 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200">
                                        <div>
                                            <span className="text-xs text-gray-500 block uppercase tracking-wide">Mother</span>
                                            <span className="font-semibold text-gray-900 text-sm">{animal.mother_code || "-"}</span>
                                        </div>
                                    </div>
                                    <div className="group flex items-center gap-3 p-2 boi bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200">
                                        <div>
                                            <span className="text-xs text-gray-500 block uppercase tracking-wide">Father</span>
                                            <span className="font-semibold text-gray-900 text-sm">{animal.father_code || "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <h4 className="text-xs uppercase tracking-wider font-medium text-gray-500 flex gap-1">
                                    <Hash className="w-4 h-4" />
                                    Identification
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {!animal.is_tattooed && !animal.is_branded && (
                                        <Badge variant="secondary" className="h-8 px-3 text-sm bg-gray-100 text-gray-700 font-medium">
                                            No visible identification
                                        </Badge>
                                    )}
                                    {animal.is_tattooed && (
                                        <Badge variant="outline" className="gap-1 border-gray-200">
                                            <Pen className="w-3.5 h-3.5" />
                                            Tattooed
                                        </Badge>
                                    )}
                                    {animal.is_branded && (
                                        <Badge variant="outline" className="gap-1 border-gray-200">
                                            <Bookmark className="w-3.5 h-3.5" />
                                            Branded
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            {animal.purchases?.length > 0 && (
                                <div className="border border-gray-200 rounded-sm py-1">
                                    <div className="  mb-1 text-xs uppercase tracking-wider font-medium text-gray-500 flex gap-1 items-center">
                                        <DollarSign className="w-4 h-4 " />
                                        <span>Purchase History</span >
                                    </div>
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        <div className="flex justify-between items-center px-2">
                                            <div className="space-y-0.5">
                                                <span className="text-sm text-gray-900 block">01-01-2025</span>
                                                <span className="text-sm text-gray-700">Provider Name</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm text-gray-600 block">Quantity: 1</span>
                                                <span className="text-md ">$1500</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right column - History data */}
                    <div className="space-y-3 min-h-0">
                        {animal.weight_log?.length > 0 && (
                            <div className="h-52 rounded-lg">
                                <DataTable
                                    title="Weight Log"
                                    columns={[
                                        { key: "Date", label: "Date", width: 90 },
                                        { key: "Average Weight", label: "Avg Weight (kg)" },
                                    ]}
                                    data={weightTableData}
                                />
                            </div>
                        )}

                        {animal.milk_production?.length > 0 && (
                            <div className="h-52 rounded-lg ">
                                <DataTable
                                    title="Milk Production"
                                    columns={[
                                        { key: "Date", label: "Date", width: 80 },
                                        { key: "Daily Liters", label: "Liters" },
                                        { key: "Fat", label: "Fat %" },
                                        { key: "Protein", label: "Protein %" },
                                    ]}
                                    data={milkTableData}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}