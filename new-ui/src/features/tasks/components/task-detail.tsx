import type { Row, TableFeatures } from "@tanstack/react-table";
import type { Task } from "./schema";
import { Button } from "@/components/ui/button";

export function TaskDetail(row: Row<TableFeatures, Task>) {
    return (
        <Button>
            {row.id}
        </Button>
    )
}