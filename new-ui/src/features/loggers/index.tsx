import { useGetLoggersQuery, type LoggerView } from "@/apis/requests/endpoints/loggers/getLoggers";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { LoggersTableEntity } from "@/entities/loggers-table.entity";

export function Loggers() {

    const { data, isLoading, refetch } = useGetLoggersQuery()

    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <div
                    className="flex min-h-0 flex-1 flex-col"
                    data-layout='fixed'
                >
                    <DataTableProvider entity={LoggersTableEntity} data={data ?? []} isLoading={isLoading}>
                        <DataTable<LoggerView>/>
                    </DataTableProvider>
                </div>

            </Main>
        </>
    )
}