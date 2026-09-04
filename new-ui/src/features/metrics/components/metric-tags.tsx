import type { MetricAvailableTag } from "@/apis/requests/endpoints/metrics/getMetricDetails"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Fragment, useCallback, useMemo } from "react"

export interface MetricTagsProps {
    allTags: MetricAvailableTag[]
    availableTags: MetricAvailableTag[]
    selectedTags: Record<string, string>
    onSelected: (selectedTags: Record<string, string>) => void
}

export function MetricTags({ allTags, availableTags, selectedTags, onSelected }: MetricTagsProps) {
    const map = useMemo(() => {
        const m = new Map()
        for (const { tag, values } of availableTags) {
            m.set(tag, new Set(values))
        }
        return m
    }, [availableTags])

    const disabled = useCallback((v: string, tag: string) => {
        const selected = selectedTags[tag] === v
        return !selected && !map.get(tag)?.has(v)
    }, [selectedTags, map])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Avaiable Tags</CardTitle>
            </CardHeader>
            <CardContent>
                {allTags.map((tag) => (
                    <Fragment key={tag.tag}>
                        <span>{tag.tag}</span>
                        <ToggleGroup
                            variant="outline"
                            spacing={2}
                            value={selectedTags[tag.tag] ? [selectedTags[tag.tag]] : []}
                            onValueChange={(values) => {
                                const value = values[0]
                                if (value === undefined) {
                                    const nextSelectedTags = { ...selectedTags }
                                    delete nextSelectedTags[tag.tag]
                                    onSelected(nextSelectedTags)
                                    return
                                }

                                onSelected({ ...selectedTags, [tag.tag]: value })
                            }}
                        >
                            {tag.values.map((v) => (
                                <ToggleGroupItem key={v} value={v} disabled={disabled(v, tag.tag)}>
                                    {v}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}