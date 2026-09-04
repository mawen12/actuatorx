import { useGetConfigpropsQuery, type ConfigpropsBeanView } from "@/apis/requests/endpoints/configprops/getConfigprops";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BeansTableEntity } from "@/entities/beans-table.entity";
import { ConfigpropDetail } from "./components/configprop-detail";
import { ConfigpropsTableEntity } from "@/entities/configprops-table.entity";

export function Configprops() {

    const { data, isLoading, refetch } = useGetConfigpropsQuery()

    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <Tabs defaultValue={data && data.length > 0 && data[0].name} className={'flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'}>
                    <TabsList variant={'line'}>
                        {data && data.map(bean => (
                            <TabsTrigger key={bean.name} value={bean.name} className='relative'>
                                {bean.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {data && data.map(bean => (
                        <TabsContent key={bean.name} value={bean.name} className='flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'>
                            <div
                                className="flex min-h-0 flex-1 flex-col"
                                data-layout='fixed'
                            >
                                <DataTableProvider entity={ConfigpropsTableEntity} data={bean.value} isLoading={isLoading}>
                                    <DataTable<ConfigpropsBeanView> renderExpandedRow={(row) => <ConfigpropDetail configprop={row.original} />} />
                                </DataTableProvider>
                            </div>
                        </TabsContent>
                    ))}

                </Tabs>
            </Main>
        </>
    )
}