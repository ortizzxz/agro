"use client";

import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TrendingUp,
    DollarSign,
    Wheat,
    Vegan,
    Package,
    LandPlot
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "./components/ui/DataTable";
interface FarmKPI {
    totalLivestock: number;
    activeBatches: number;
    fieldsInProduction: number;
    harvestToday: string;
    inventoryValue: string;
    expensesToday: string;
}

export default function HomePage() {
    const [selectedFarm, setSelectedFarm] = useState("all");
    const [loading, setLoading] = useState(false);

    const kpiData: Record<string, string | number> =
        selectedFarm === "all"
            ? kpiStructure.reduce((acc, kpi) => {
                const total = Object.values(backendKPIs).reduce((sum, farm) => {
                    const value = farm[kpi.key as keyof FarmKPI];
                    return typeof value === "number" ? sum + value : sum;
                }, 0);
                acc[kpi.key] = total || "—";
                return acc;
            }, {} as Record<string, string | number>)
            : Object.fromEntries(
                Object.entries(backendKPIs[selectedFarm as keyof typeof backendKPIs])
            );

    const [filteredOperations, setFilteredOperations] = useState(allOperations);
    const [filteredAlerts, setFilteredAlerts] = useState(allAlerts);
    const [filteredInventory, setFilteredInventory] = useState(allInventory);
    const [filteredHarvest, setFilteredHarvest] = useState(allHarvest);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const filter = (data: any[]) =>
                selectedFarm === "all" ? data : data.filter(d => d.farmId === selectedFarm);

            setFilteredOperations(filter(allOperations));
            setFilteredAlerts(filter(allAlerts));
            setFilteredInventory(filter(allInventory));
            setFilteredHarvest(filter(allHarvest));
            setLoading(false);
        }, 500); // simulate 500ms delay

        return () => clearTimeout(timer);
    }, [selectedFarm]);

    return (
        <div className="space-y-3 px-2">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                <ToggleGroup
                    type="single"
                    value={selectedFarm}
                    onValueChange={(value) => value && setSelectedFarm(value)}
                >
                    {farms.map((farm) => (
                        <ToggleGroupItem key={farm.id} value={farm.id}>
                            {farm.name}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* kpi*/}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {kpiStructure.map((kpi) => {
                    const Icon = kpi.icon;
                    const value = kpiData[kpi.key] ?? "—";

                    return (
                        <Card key={kpi.key} className="flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-sm">{kpi.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                {loading ? (
                                    <Skeleton className="h-6 w-16" /> // Skeleton replaces the value
                                ) : (
                                    <span className="text-xl font-semibold">{value}</span>
                                )}
                                <Icon className="w-6 h-6 text-gray-400" />
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* main dash*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 h-70">
                    {loading ? <Skeleton className="h-full rounded-md" /> :
                        <DataTable
                            title="Active Operations"
                            columns={[
                                { key: "type", label: "Type" },
                                { key: "name", label: "Name" },
                                { key: "status", label: "Status" },
                                { key: "quantity", label: "Quantity" },
                                { key: "updated", label: "Last Updated" }
                            ]}
                            data={filteredOperations}
                        />}
                </div>

                <div className="h-70">
                    {loading ? <Skeleton className="h-full rounded-md" /> :
                        <DataTable
                            title="Farm Alerts"
                            columns={[
                                { key: "type", label: "Type" },
                                { key: "item", label: "Item" },
                                { key: "alert", label: "Alert" }
                            ]}
                            data={filteredAlerts}
                        />}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="h-65">
                    {loading ? <Skeleton className="h-full rounded-md" /> :
                        <DataTable
                            title="Inventory Snapshot"
                            columns={[
                                { key: "item", label: "Item" },
                                { key: "stock", label: "Stock" },
                                { key: "status", label: "Status" }
                            ]}
                            data={filteredInventory}
                        />}
                </div>

                <div className="h-65">
                    {loading ? <Skeleton className="h-full rounded-md" /> :
                        <DataTable
                            title="Harvest Summary"
                            columns={[
                                { key: "product", label: "Product" },
                                { key: "today", label: "Today" },
                                { key: "week", label: "This Week" }
                            ]}
                            data={filteredHarvest}
                        />}
                </div>
            </div>
        </div>
    );
}

/* FARMS */
const farms = [
    { id: "all", name: "All Farms" },
    { id: "north", name: "North Farm" },
    { id: "greenhouse", name: "Greenhouse" },
    { id: "dairy", name: "Dairy Farm" }
];
// Fixed KPI structure
const kpiStructure = [
    { key: "totalLivestock", title: "Total Livestock", icon: Vegan },
    { key: "activeBatches", title: "Active Batches", icon: LandPlot },
    { key: "fieldsInProduction", title: "Fields in Production", icon: Wheat },
    { key: "harvestToday", title: "Harvest Today", icon: TrendingUp },
    { key: "inventoryValue", title: "Inventory Value", icon: Package },
    { key: "expensesToday", title: "Expenses Today", icon: DollarSign },
];
const backendKPIs: Record<"north" | "greenhouse" | "dairy", FarmKPI> = {
    north: { totalLivestock: 5200, activeBatches: 2, fieldsInProduction: 0, harvestToday: "—", inventoryValue: "—", expensesToday: "—" },
    greenhouse: { totalLivestock: 0, activeBatches: 0, fieldsInProduction: 3, harvestToday: "1.1 t", inventoryValue: "—", expensesToday: "—" },
    dairy: { totalLivestock: 0, activeBatches: 0, fieldsInProduction: 0, harvestToday: "—", inventoryValue: "€12,450", expensesToday: "€1,420" },
};
/* FARM ALERTS */
const allAlerts = [
    { farmId: "north", type: "Livestock", item: "Batch CH-2024-03", alert: "Mortality above average" },
    { farmId: "greenhouse", type: "Crop", item: "Field B", alert: "Irrigation needed" },
    { farmId: "dairy", type: "Inventory", item: "Starter Feed", alert: "Low stock" },
    { farmId: "dairy", type: "Equipment", item: "Tractor #2", alert: "Maintenance due" },
];
/* INVENTORY */
const allInventory = [
    { farmId: "north", item: "Starter Feed", stock: "450 kg", status: "OK" },
    { farmId: "north", item: "Grower Feed", stock: "120 kg", status: "Low" },
    { farmId: "greenhouse", item: "Fertilizer NPK", stock: "80 kg", status: "Low" },
    { farmId: "greenhouse", item: "Tomato Seeds", stock: "1200", status: "OK" },
    { farmId: "dairy", item: "Silage", stock: "800 kg", status: "OK" },
];
/* HARVEST SUMMARY */
const allHarvest = [
    { farmId: "north", product: "Eggs", today: 9430, week: 61200 },
    { farmId: "greenhouse", product: "Tomatoes", today: "210 kg", week: "1.4 t" },
    { farmId: "dairy", product: "Milk", today: "430 L", week: "2,900 L" },
];
/* ACTIVE OPERATIONS */
const allOperations = [
    { farmId: "north", type: "Animal Batch", name: "CH-2024-03", status: "Healthy", quantity: "5200 birds", updated: "Today" },
    { farmId: "north", type: "Animal Batch", name: "CH-2024-04", status: "Growing", quantity: "6100 birds", updated: "Today" },
    { farmId: "greenhouse", type: "Field", name: "Field A", status: "Growing Wheat", quantity: "3.2 ha", updated: "Yesterday" },
    { farmId: "greenhouse", type: "Greenhouse", name: "Tomatoes", status: "Flowering", quantity: "800 plants", updated: "Today" },
    { farmId: "dairy", type: "Animal Batch", name: "COW-2024-01", status: "Healthy", quantity: "120 cows", updated: "Today" },
];