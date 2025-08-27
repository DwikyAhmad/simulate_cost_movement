"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BarChart3, Mail, Table } from "lucide-react";

export default function MainMenu() {
    return (
        <div className="min-h-screen bg-gray-900 p-3 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                {/* Header */}
                <div className="bg-gray-800 border-b border-gray-600 p-6 md:p-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Toyota PPR Engine PBMD Simulation System
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
                            Prototype for PBMD
                        </p>
                    </div>
                </div>

                {/* Main Menu Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Send Email */}
                    <Card className="bg-gray-800 border-2 border-gray-600 hover:border-purple-500 transition-colors">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-purple-600 rounded-lg">
                                    <Mail className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-white text-xl">
                                Generate Part List & Send Email Notifications
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Send notification emails to request Packing
                                Cost, LSP and IH, MSP and JSP prices
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button
                                onClick={() =>
                                    (window.location.href = "/requestdata")
                                }
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-none border-2 border-purple-500 w-full cursor-pointer"
                            >
                                Request Data
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Part List Costs */}
                    <Card className="bg-gray-800 border-2 border-gray-600 hover:border-blue-500 transition-colors">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-blue-600 rounded-lg">
                                    <BarChart3 className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-white text-xl">
                                Cost Movement
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Monitor cost movements across all engine
                                components
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center mt-auto">
                            <Button
                                onClick={() =>
                                    (window.location.href = "/partlistcost")
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500 w-full mt-auto cursor-pointer"
                            >
                                View Cost Movement
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
