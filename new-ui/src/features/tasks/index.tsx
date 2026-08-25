import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TasksTable } from "./components/tasks-table";

export function Tasks() {
    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            {/* 滚动 */}
            {/* <Main className='p-2 space-y-4 flex flex-row items-center justify-between'>
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your tasks for this month!
                        </p>

                        <TasksTable />
                    </div>
                </div>

            </Main> */}

            {/* 固定高度 */}
            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                </div>

                <TasksTable />
            </Main>
        </>
    )
}