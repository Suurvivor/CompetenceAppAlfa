const labels = [
   'BHP',
   'Przezbrajanie form',
   '5S',
   'Komunikacja',
   'BHP',
   'Przezbrajanie form',
   '5S',
   'Komunikacja',
];

const data = {
   labels: labels,
   datasets: [
      {
         label: 'Kompetencje',
         backgroundColor: ['green', 'red', 'yellow', 'purple'],
         borderColor: 'rgb(255, 99, 132)',
         data: [12, 7, 5, 4, 12, 7, 5, 4],
      },
   ],
};

const config = {
   type: 'bar',
   data: data,
   options: {
      legend: {
         display: false,
      },
      maintainAspectRatio: true,
   },
};
const myChart = new Chart(document.getElementById('myChart'), config);
