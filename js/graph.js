export const generateGraph = (root, date, data) => {
  const canvas = document.createElement('canvas');
  canvas.id = 'chart';

  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(canvas);

  const sortedData = data.sort((a, b) => a.date - b.date);

  const formated = sortedData.map((data) => ({
    rate: data.rate,
    date: new Date(data.date * 1000),
  }));

  const filteredData = filterData(formated, date);

  const chartLabels = filteredData.map((data) =>
    data.date.toLocaleTimeString()
  );
  const chartData = filteredData.map((data) => data.rate);
  const chartBackgrounds = chartData.map((data) =>
    data > 100.0 ? 'rgba(220, 40, 50, 1)' : 'rgba(40, 220, 50, 1)'
  );

  const chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Heart Rate',
          data: chartData,
          backgroundColor: rgba(40, 220, 50, 1),
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const filterData = (data, date) => {
  const filterDate = new Date(date);
  const filteredData = data.filter(
    (data) => filterDate.toLocaleDateString() == data.date.toLocaleDateString()
  );
  return filteredData;
};
