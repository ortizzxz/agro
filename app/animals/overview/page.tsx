"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Heart, TrendingUp, TrendingDown, DollarSign, Wheat, Egg, Weight, Vegan } from "lucide-react";
import DataTable from "@/app/components/ui/DataTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnimalOverview() {
    const [loading, setLoading] = useState(true);

    // Mock KPI data
    const kpis = [
        { title: "Total Animals", value: 12450, icon: Vegan },
        { title: "Mortality Rate", value: "1.8%", icon: Heart, trend: "down" },
        { title: "Avg Weight", value: "1.9 kg", icon: Weight },
        { title: "Eggs Today", value: 9430, icon: Egg },
        { title: "Feed Consumption Today", value: "2300 kg", icon: Wheat },
        { title: "Feed Cost Today", value: "€1,420", icon: DollarSign },
    ];

    // Mock batches
    const batches = [
        { batch: "CH-2024-03", species: "chicken", age: "35 days", quantity: 5200, mortality: "1.2%", avgWeight: "1.8kg", status: "healthy" },
        { batch: "CH-2024-04", species: "chicken", age: "12 days", quantity: 6100, mortality: "0.3%", avgWeight: "0.5kg", status: "growing" },
        { batch: "CH-2024-03", species: "chicken", age: "35 days", quantity: 5200, mortality: "1.2%", avgWeight: "1.8kg", status: "healthy" },
        { batch: "CH-2024-04", species: "chicken", age: "12 days", quantity: 6100, mortality: "0.3%", avgWeight: "0.5kg", status: "growing" },
    ];

    // Mock mortality alerts
    const mortalityAlerts = [
        { batch: "CH-2024-03", deathsToday: 12, averageDeathPerDay: 10, trend: "up", note: "above average" },
        { batch: "CH-2024-04", deathsToday: 5, averageDeathPerDay: 5, trend: "stable", note: "normal" },
    ];

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // 1 second loading
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-4 px-2">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

            {/* KPI Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={index} className="flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-sm">{kpi.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {loading ? (
                                        <Skeleton className="h-6 w-16" />
                                    ) : (
                                        <span className="text-2xl font-semibold">{kpi.value}</span>
                                    )}
                                    {!loading && kpi.trend === "up" && <TrendingUp />}
                                    {!loading && kpi.trend === "down" && <TrendingDown />}
                                </div>
                                {loading ? <Skeleton className="h-8 w-8 rounded-full" /> : <Icon className="w-8 h-8 text-gray-400" />}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 h-80">
                    {loading ? (
                        <Skeleton className="h-full rounded-md" />
                    ) : (
                        <DataTable
                            title="Active Batches"
                            columns={[
                                { key: "batch", label: "Batch" },
                                { key: "species", label: "Species" },
                                { key: "age", label: "Age" },
                                { key: "quantity", label: "Quantity" },
                                { key: "mortality", label: "Mortality" },
                                { key: "avgWeight", label: "Average Weight" },
                                { key: "status", label: "Status" },
                            ]}
                            data={batches}
                        />
                    )}
                </div>

                <div className="h-80">
                    {loading ? (
                        <Skeleton className="h-full rounded-md" />
                    ) : (
                        <DataTable
                            title="Mortality Alerts"
                            columns={[
                                { key: "batch", label: "Batch" },
                                { key: "deathsToday", label: "Deaths Today" },
                                { key: "averageDeathPerDay", label: "Average Deaths" },
                                { key: "trend", label: "Trend" },
                                { key: "note", label: "Note" },
                            ]}
                            data={mortalityAlerts}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}