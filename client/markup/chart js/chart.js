const labels = [
   'BHP',
   'Przezbrajanie form',
   '5S',
   'Komunikacja',
   'Czyszczenie maszyn',
   'Przebiegłosc',
];

const data = {
   labels: labels,
   datasets: [
      {
         label: 'Kompetencje',
         backgroundColor: ['green', 'red', 'yellow', 'purple'],
         borderColor: 'rgb(255, 99, 132)',
         data: [12, 7, 5, 4, 10, 15, 13],
      },
   ],
};

const config = {
   type: 'bar',
   data: data,
   options: {
      maintainAspectRatio: false,
   },
};
const myChart = new Chart(document.getElementById('myChart'), config);

/////////////
