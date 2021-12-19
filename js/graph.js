export const generateGraph = (root, data) => {
  const canvas = document.createElement('canvas');
  canvas.id = 'chart';

  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(canvas);

  const formated = data.map((data) => ({
    rate: data.rate,
    date: new Date(data.date * 1000).toLocaleString(),
  }));

  const chartLabels = formated.map((data) => data.date);
  const chartData = formated.map((data) => data.rate);
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
          backgroundColor: chartBackgrounds,
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
