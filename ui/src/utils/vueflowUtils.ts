import ELK from 'elkjs/lib/elk.bundled.js'

export const NODE_WIDTH = 350
export const NODE_HEIGHT = 40

export const getLayoutElements = async (nodes, edges) => {
    const elk = new ELK()

    const graph = {
        id: 'root',
        layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
        },
        children: [
            ...nodes.map((node) => ({
                id: node.id,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
            })),
        ],
        edges: [
            ...edges.map((edge) => ({
                id: edge.id,
                sources: [edge.source],
                targets: [edge.target],
            })),
        ],
    }

    const layout = await elk.layout(graph, {layoutOptions: {}})
    const layoutNodes = nodes.map((node) => {
        const nodePosition = layout.children?.find((child) => child.id === node.id)
        return {
            ...node,
            position: {
                x: nodePosition?.x || 0,
                y: nodePosition?.y || 0,
            },
        }
    })

    return {nodes: layoutNodes, edges}
}

export const getConnectedNodes = (nodeId, nodes, edges) => {
    const visited = new Set()
    const result = []

    function dfs(internalNodeId) {
        visited.add(internalNodeId)
        result.push(nodes.find((n) => n.id === internalNodeId))

        const connectedEdges = edges.filter(
            (edge) => edge.source === internalNodeId || edge.target === internalNodeId,
        )
        connectedEdges.forEach((edge) => {
            const connectedNodeId = edge.source === internalNodeId ? edge.target : edge.source
            if (!visited.has(connectedNodeId)) {
                dfs(connectedNodeId)
            }
        })
    }

    dfs(nodeId)
    return result
}

export const getOutgoingNodes = (nodeId, nodes, edges) => {
    const visited = new Set()
    const result = []

    function dfs(internalNodeId) {
        visited.add(internalNodeId)
        result.push(nodes.find((n) => n.id === internalNodeId))

        const connectedEdges = edges.filter((edge) => edge.source === internalNodeId)
        connectedEdges.forEach((edge) => {
            const connectedNodeId = edge.source === internalNodeId ? edge.target : edge.source
            if (!visited.has(connectedNodeId)) {
                dfs(connectedNodeId)
            }
        })
    }

    dfs(nodeId)
    return result
}

export const getIncomingNodes = (nodeId, nodes, edges) => {
    const visited = new Set()
    const result = []

    function dfs(internalNodeId) {
        visited.add(internalNodeId)
        result.push(nodes.find((n) => n.id === internalNodeId))

        const connectedEdges = edges.filter((edge) => edge.target === internalNodeId)
        connectedEdges.forEach((edge) => {
            const connectedNodeId = edge.source === internalNodeId ? edge.target : edge.source
            if (!visited.has(connectedNodeId)) {
                dfs(connectedNodeId)
            }
        })
    }

    dfs(nodeId)
    return result
}
