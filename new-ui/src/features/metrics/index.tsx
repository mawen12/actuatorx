import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { MetricsTable } from "./components/metrics-table";

export function Metrics() {
    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <MetricsTable />
            </Main>
        </>
    )
}