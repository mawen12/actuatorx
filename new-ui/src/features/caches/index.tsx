import { useGetCachesQuery, type CacheView } from "@/apis/requests/endpoints/caches/getCaches";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { CachesTableEntity } from "@/entities/caches-table.entity";

export function Caches() {

    const { data, isLoading, refetch } = useGetCachesQuery()

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
                    <DataTableProvider entity={CachesTableEntity} data={data ?? []} isLoading={isLoading}>
                        <DataTable<CacheView>/>
                    </DataTableProvider>
                </div>

            </Main>
        </>
    )
}