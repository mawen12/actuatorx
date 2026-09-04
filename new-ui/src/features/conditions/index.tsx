import { useGetConditionsQuery, type ConditionMatchView } from "@/apis/requests/endpoints/conditions/getConditions";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-provider";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConditionsTableEntity } from "@/entities/conditions-table.entity";
import { ConditionDetail } from "./components/condition-detail";

export function Conditions() {

    const { data, isLoading, refetch } = useGetConditionsQuery()

    return (
        <>
            <Header fixed>
                <Search className="me-auto" />
                <ThemeSwitch />
            </Header>

            <Main className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
                <Tabs defaultValue={data && data.length > 0 && data[0].name} className={'flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'}>
                    <TabsList variant={'line'}>
                        {data && data.map(cond => (
                            <TabsTrigger key={cond.name} value={cond.name} className='relative'>
                                {cond.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {data && data.map(cond => (
                        <TabsContent key={cond.name} value={cond.name} className='flex min-h-0 flex-1 flex-col gap-4 sm:gap-6'>
                            <div
                                className="flex min-h-0 flex-1 flex-col"
                                data-layout='fixed'
                            >
                                <DataTableProvider entity={ConditionsTableEntity} data={cond.value} isLoading={isLoading}>
                                    <DataTable<ConditionMatchView> renderExpandedRow={(row) => <ConditionDetail condition={row.original} />}/>
                                </DataTableProvider>
                            </div>
                        </TabsContent>
                    ))}

                </Tabs>
            </Main>
        </>
    )
}