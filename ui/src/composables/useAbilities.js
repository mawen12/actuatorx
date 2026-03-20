import {useStorage} from "@vueuse/core";

const useAbilities = (items) => {
    const abilities = useStorage(
        "abilities",
        new Set(items || []),
        undefined,
        localStorage,
        {
            serializer: (set) => JSON.stringify(Array.from(set)),
            deserializer: (str) => new Set(JSON.parse(str)),
        }
    )

    const addAll = (items) => {
        items.forEach(ability => abilities.value.add(ability))
    }

    const has = (ability) => {
        return abilities.value.has(ability)
    }

    const reset = () => {
        abilities.value.clear()
    }

    return {
        abilities,
        addAll,
        has,
    }
}

export default useAbilities