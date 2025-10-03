const ctx = document.getElementById('screeningChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
    datasets: [{
      label: 'Screenings',
      data: [12, 19, 7, 14, 10, 22, 18],
      borderColor: '#00ffff',
      backgroundColor: 'rgba(0,255,255,0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      },
      y: {
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#ccc' }
      }
    }
  }
});