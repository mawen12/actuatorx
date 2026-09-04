import { useGetMappingsQuery, type MappingView } from "@/apis/requests/endpoints/mappings/getMappings";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MappingsTableEntity } from "@/entities/mappings-table.entity";
import { MappingDetail } from "./components/mapping-detail";

export function Mappings() {

    const { data, isLoading, refetch } = useGetMappingsQuery()

    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <Tabs defaultValue={data && data.length > 0 && data[0].name} className={'flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'}>
                    <TabsList variant={'line'}>
                        {data && data.map(context => (
                            <TabsTrigger key={context.name} value={context.name} className='relative'>
                                {context.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {data && data.map(context => (
                        <TabsContent key={context.name} value={context.name} className='flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'>
                            <div
                                className="flex min-h-0 flex-1 flex-col"
                                data-layout='fixed'
                            >
                                <DataTableProvider entity={MappingsTableEntity} data={context.value} isLoading={isLoading}>
                                    <DataTable<MappingView> renderExpandedRow={(row) => <MappingDetail mapping={row.original} />} />
                                </DataTableProvider>
                            </div>
                        </TabsContent>
                    ))}

                </Tabs>
            </Main>
        </>
    )
}