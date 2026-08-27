import { useGetEnvQuery, type EnvPropertySourceView } from "@/apis/requests/endpoints/env/getEnv";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { EnvTableEntity } from "@/entities/env-table.entity";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function Env() {

    const { data, isLoading, refetch } = useGetEnvQuery()

    const copy = useCopyToClipboard()

    const rowActionsHandler = (row: EnvPropertySourceView, actionId: string) => {
        switch (actionId) {
            case 'copy':
                copy(JSON.stringify(row))
                break
            default:
                toast.add({
                    title: 'Row Action',
                    description: `Unsupport action: ${actionId}`
                })
        }
    }

    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <Tabs defaultValue={data && data.length > 0 && data[0].name} className={'flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'}>
                    <TabsList variant={'line'}>
                        {data && data.map(propertySource => (
                            <TabsTrigger key={propertySource.name} value={propertySource.name} className='relative'>
                                {propertySource.name}
                                {/* <Badge variant={'outline'} className='absolute top-0 -right-3'>{propertySource.properties.length}</Badge> */}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {data && data.map(propertySource => (
                        <TabsContent key={propertySource.name} value={propertySource.name} className='flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'>
                            <div
                                className="flex min-h-0 flex-1 flex-col"
                                data-layout='fixed'
                            >
                                <DataTableProvider entity={EnvTableEntity} data={propertySource.properties} isLoading={isLoading} rowActionsHandler={rowActionsHandler}>
                                    <DataTable<EnvPropertySourceView> />
                                </DataTableProvider>
                            </div>
                        </TabsContent>
                    ))}

                </Tabs>
            </Main>
        </>
    )
}