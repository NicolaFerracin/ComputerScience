def dijkstra():
    graph = {}
    graph["start"] = {}
    graph["start"]["a"] = 6
    graph["start"]["b"] = 2
    graph["a"] = {}
    graph["a"]["fin"] = 1
    graph["b"] = {}
    graph["b"]["a"] = 3
    graph["b"]["fin"] = 5
    graph["fin"] = {}

    costs = {}
    costs["a"] = graph["start"]["a"]
    costs["b"] = graph["start"]["b"]
    costs["fin"] = float("inf")

    processed = []

    def find_lowest_cost_node(costs):
        lowest_cost = float("inf")
        lowest_cost_node = None

        for node in costs:
            cost = costs[node]
            if cost < lowest_cost and node not in processed:
                lowest_cost = cost
                lowest_cost_node = node
        return lowest_cost_node

    node = find_lowest_cost_node(costs)
    while node is not None:
        cost = costs[node]
        neighbours = graph[node]

        for n in neighbours.keys():
            new_cost = cost + neighbours[n]
            if new_cost < costs[n]:
                costs[n] = new_cost

        processed.append(node)
        node = find_lowest_cost_node(costs)

    return costs["fin"]

print(dijkstra())