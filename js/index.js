import { get } from './api.js';
import { generateGraph } from './graph.js';

const url = 'https://iot.lsteiner.dev/api/';

const root = document.querySelector('#content');

const getHeartRates = async () => {
  const data = await get(`${url}heartrate`);
  generateGraph(root, data);
};

getHeartRates();

setInterval(() => {
  console.log('Updated Graph');
  getHeartRates();
}, 30000);
