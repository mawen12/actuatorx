import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { HealthContent } from "./components/health-content";

export function Health() {
    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className='p-2 space-y-4 flex-1'>
                <HealthContent />
            </Main>
        </>
    )
}