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

export const findShortestPath = async (source, destination) => {
  const distances = {};
  const visited = {};
  const previous = {};
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
        previous[neighbor] = closestVertex;
      }
    });
  }
  const numberOfHops = distances[destination]
  const path = [destination];
  let current = destination;
  while (current !== source) {
    current = previous[current];
    path.unshift(current);
  }
  return {numberOfHops,path};
};

export const getEstimatedCost = async (pickupLocation, dropLocation) => {
  const shortestPath = await findShortestPath(pickupLocation, dropLocation);
  return {totalAmount: shortestPath.numberOfHops * COST_PER_HOP, estimatedTime: shortestPath.numberOfHops * TIME_PER_HOP}
};

export const checkDeliveredInTime = (pickUpTime, current_time, minimum_time) => {
  const pickedupTime = new Date(pickUpTime);
  const timeDifference = current_time - pickedupTime;
  const minutesDifference = Math.floor(timeDifference / 1000 / 60); // Convert milliseconds to minutes

  return minutesDifference <= minimum_time;
}