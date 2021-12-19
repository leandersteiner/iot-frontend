import { get } from './api.js';
import { generateGraph } from './graph.js';

const url = 'https://iot.lsteiner.dev/api/';

const root = document.querySelector('#content');
const dateFilter = document.querySelector('#date');

const today = new Date().toISOString().split('T')[0];
dateFilter.setAttribute('max', today);
dateFilter.setAttribute('value', today);

const getHeartRates = () => {
  return get(`${url}heartrate`);
};

const refreshGraph = async () => {
  const data = await getHeartRates();
  generateGraph(root, dateFilter.value, data);
};

dateFilter.addEventListener('change', async () => {
  generateGraph(root, dateFilter.value, await getHeartRates());
});

setInterval(refreshGraph, 15000);

refreshGraph();
