export const locations = ['1A','1B','1C','1D','1E','1F','1G','2A','2B','2C','2D','2E','2F','2G','3A','3B','3C','3D','3E','3F','3G','4A','4B','4C','4D','4E','4F','4G','5A','5B','5C','5D','5E','5F','5G','6A','6B','6C','6D','6E','6F','6G','7A','7B','7C','7D','7E','7F','7G']

const COST_PER_HOP = 10;
// Graph representation
const graph = {
  '1A': { '2A': 1 },
  '1B': { '1A': 1 },
  '1C': { '2C': 1 },
  '1D': { '2D': 1 },
  '1E': { '2E': 1 },
  '1F': {},
  '1G': { '2G': 1 },
  '2A': { '2B': 1 },
  '2B': { '2A': 1 },
  '2C': {},
  '2D': { '1D': 1 },
  '2E': {},
  '2F': { '2G': 1 },
  '2G': { '2F': 1 },
  '3A': {},
  '3B': { '3A': 1 },
  '3C': {},
  '3D': {},
  '3E': {},
  '3F': {},
  '3G': { '3F': 1 },
  '4A': { '4B': 1 },
  '4B': {},
  '4C': {},
  '4D': {},
  '4E': {},
  '4F': { '4G': 1 },
  '4G': {},
  '5A': {},
  '5B': { '5A': 1 },
  '5C': {},
  '5D': {},
  '5E': {},
  '5F': {},
  '5G': { '5F': 1 },
  '6A': { '6B': 1, '7A': 1 },
  '6B': { '6A': 1 },
  '6C': { '7C': 1 },
  '6D': { '7D': 1 },
  '6E': { '7E': 1 },
  '6F': { '6G': 1 },
  '6G': { '6F': 1, '7G': 1 },
  '7A': {},
  '7B': { '6B': 1 },
  '7C': {},
  '7D': { '6D': 1 },
  '7E': {},
  '7F': { '6F': 1 },
  '7G': { '7F': 1 },
};;

const findShortestPath = (source, destination) => {
  const distances = {};
  const visited = {};

  Object.keys(graph).forEach((vertex) => {
    distances[vertex] = Infinity;
  });
  distances[source] = 0;

  while (true) {
    let closestVertex = null;
    let closestDistance = Infinity;

    Object.keys(graph).forEach((vertex) => {
      if (!visited[vertex] && distances[vertex] < closestDistance) {
        closestVertex = vertex;
        closestDistance = distances[vertex];
      }
    });

    if (closestVertex === null) {
      break;
    }

    visited[closestVertex] = true;

    Object.keys(graph[closestVertex]).forEach((neighbor) => {
      const distance = closestDistance + graph[closestVertex][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
      }
    });
  }
  return distances[destination];
};

export const getEstimatedCost = (pickupLocation, dropLocation) => {
    const numberOfHops = findShortestPath(pickupLocation,dropLocation);
    return numberOfHops * COST_PER_HOP;
};