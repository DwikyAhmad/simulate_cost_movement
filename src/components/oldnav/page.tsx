"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BarChart3, Mail, Table, Upload } from "lucide-react";

export default function MainMenu() {
    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-lg mx-auto space-y-6 md:space-y-8">
                {/* Header */}
                <div className="bg-gray-800 border-b border-gray-600 p-6 md:p-8">
                    <div className="text-center">
                        <h1 className="text-xl md:text-xl lg:text-xl font-bold text-white mb-4">
                            Toyota PPR Engine PBMD Simulation System
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                            Prototype for PBMD
                        </p>
                    </div>
                </div>

                {/* Main Menu Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">

                    {/* Master Data */}
                    <Card className="bg-gray-800 border-2 border-gray-600 hover:border-green-500 transition-colors">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-green-600 rounded-lg">
                                    <Table className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-white text-xl">
                                Master Data Management
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Manage master data for cost calculations including
                                TMMIN E/G OP, Insurance rates, and Exchange rates
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center mt-auto">
                            <Button
                                onClick={() =>
                                    (window.location.href = "/masterdata")
                                }
                                className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 w-full cursor-pointer"
                            >
                                Manage Master Data
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Core Business Process */}
                    <Card className="bg-gray-800 border-2 border-gray-600 hover:border-indigo-500 transition-colors">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-indigo-600 rounded-lg">
                                    <BarChart3 className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-white text-xl">
                                Core Business Process
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Manage data sources, monitor cost movements, and trigger
                                FOB calculations for pricing analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center mt-auto">
                            <Button
                                onClick={() =>
                                    (window.location.href = "/core")
                                }
                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-none border-2 border-indigo-500 w-full cursor-pointer"
                            >
                                Access Core Process
                            </Button>
                        </CardContent>
                    </Card>

                
                </div>
            </div>
        </div>
    );
}
