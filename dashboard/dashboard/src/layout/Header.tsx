import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrightness } from "@tabler/icons-react";
import { IconBaselineDensityMedium } from '@tabler/icons-react';

export function Header() {
    return (
        <header className="bg-white dark:bg-black flex gap-2 h-10 items-center border-b px-4">
            <Button variant="outline" size="icon">
                <IconBaselineDensityMedium />
            </Button>

            <div className="text-lg font-semibold relative">
                ActuatorX
                <Badge className="w-8 px-2 absolute z-index-3 bg-blue-50 text-blue-700 dark:text-blue-300 dark:bg-blue-500">
                    dev
                </Badge>
            </div>

            <div className="ml-auto">
                <Button variant="outline" size="icon">
                    <IconBrightness />
                </Button>
            </div>
        </header>
    )
}