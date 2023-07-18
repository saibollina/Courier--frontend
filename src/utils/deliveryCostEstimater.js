import db from '../models/index.js';
const location = db.location;

const COST_PER_HOP = 1.5; // in dollars
const TIME_PER_HOP = 3; // in minutes

const constructGraph = async () => {
  const graph = {};
  const allGraphData = await location.findAll();
  allGraphData.forEach((entry) => {
    const { source, destination, weight } = entry;
    if (!graph[source]) {
      graph[source] = {};
    }
    graph[source][destination] = weight;
  });
  return graph;
};

const findShortestPath = async (source, destination) => {
  const distances = {};
  const visited = {};
  const graph = await constructGraph();

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

export const getEstimatedCost = async (pickupLocation, dropLocation) => {
  const numberOfHops = await findShortestPath(pickupLocation, dropLocation);
  return {totalAmount: numberOfHops * COST_PER_HOP, estimatedTime: numberOfHops * TIME_PER_HOP}
};