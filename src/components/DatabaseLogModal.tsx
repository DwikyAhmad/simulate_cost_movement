"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Database,
    CheckCircle,
    AlertCircle,
    Clock,
    FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseLogEntry {
    id: string;
    timestamp: string;
    action: "upload" | "download" | "update" | "sync";
    status: "success" | "failed" | "in-progress";
    recordsAffected: number;
}

interface DatabaseLogModalProps {
    dataSourceName: string;
    children: React.ReactNode;
}

export function DatabaseLogModal({
    dataSourceName,
    children,
}: DatabaseLogModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Sample log data - in a real app, this would come from an API
    const logEntries: DatabaseLogEntry[] = [
        {
            id: "1",
            timestamp: "2024-01-15 14:30:25",
            action: "upload",
            status: "success",
            recordsAffected: 1245,
        },
        {
            id: "2",
            timestamp: "2024-01-15 13:45:12",
            action: "upload",
            status: "success",
            recordsAffected: 892,
        },
        {
            id: "3",
            timestamp: "2024-01-15 12:20:08",
            action: "upload",
            status: "success",

            recordsAffected: 678,
        },
        {
            id: "4",
            timestamp: "2024-01-15 10:15:33",
            action: "upload",
            status: "failed",
            recordsAffected: 0,
        },
        {
            id: "5",
            timestamp: "2024-01-15 09:30:15",
            action: "upload",
            status: "success",
            recordsAffected: 45,
        },
        {
            id: "6",
            timestamp: "2024-01-14 16:45:22",
            action: "upload",
            status: "success",
            recordsAffected: 5674,
        },
    ];

    const getActionIcon = (action: string) => {
        switch (action) {
            case "upload":
                return <FileText className="h-4 w-4" />;
            default:
                return <Database className="h-4 w-4" />;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "failed":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "success":
                return "default";
            case "failed":
                return "destructive";
            case "in-progress":
                return "secondary";
            default:
                return "outline";
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case "upload":
                return "text-blue-600 bg-blue-50";
            case "download":
                return "text-green-600 bg-green-50";
            case "update":
                return "text-purple-600 bg-purple-50";
            case "sync":
                return "text-orange-600 bg-orange-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-xl max-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 border border-cyan-500/30 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent flex items-center gap-2">
                        <Database className="h-6 w-6 text-cyan-400" />
                        Database Activity Log - {dataSourceName}
                    </DialogTitle>
                    <DialogDescription className="text-blue-200">
                        Recent database operations and system activities for
                        this data source
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 overflow-hidden">
                    {/* Log Entries */}
                    <div className="flex-1 overflow-y-auto max-h-96 space-y-3 pr-2">
                        <h3 className="text-lg font-semibold text-cyan-200 sticky top-0 bg-gradient-to-r from-slate-800 to-gray-800 py-2 z-10">
                            Recent Activities
                        </h3>
                        {logEntries.map((entry) => (
                            <Card
                                key={entry.id}
                                className={cn(
                                    "border border-gray-600",
                                    entry.status === "failed"
                                        ? "bg-gradient-to-r from-red-900/20 to-red-800/20 border-red-500/30"
                                        : "bg-gradient-to-r from-slate-700/50 to-gray-700/50"
                                )}
                            >
                                <CardContent className="px-4 py-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div
                                                className={cn(
                                                    "p-2 rounded-lg",
                                                    getActionColor(entry.action)
                                                )}
                                            >
                                                {getActionIcon(entry.action)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge
                                                        variant={getStatusBadgeVariant(
                                                            entry.status
                                                        )}
                                                        className="capitalize"
                                                    >
                                                        {entry.action}
                                                    </Badge>
                                                    {getStatusIcon(
                                                        entry.status
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {entry.timestamp}
                                                    </div>
                                                    {entry.recordsAffected !==
                                                        undefined && (
                                                        <div className="flex items-center gap-1">
                                                            <Database className="h-3 w-3" />
                                                            {entry.recordsAffected.toLocaleString()}{" "}
                                                            records
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                        <p className="text-sm text-gray-400">
                            Showing {logEntries.length} recent activities
                        </p>
                        <div className="flex gap-2">

                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-500 hover:text-white text-black hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
