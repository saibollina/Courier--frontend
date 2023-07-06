import { locations } from '../utils/deliveryCostEstimater.js';

export const findAll = (req,res) => {
  res.send({locations:locations});
  };