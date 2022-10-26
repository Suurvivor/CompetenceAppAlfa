var chartProgress = document.getElementById('chartProgress');
if (chartProgress) {
   var myChartCircle = new Chart(chartProgress, {
      type: 'doughnut',
      data: {
         labels: ['Africa', 'null'],
         datasets: [
            {
               label: 'Population (millions)',
               backgroundColor: ['#5283ff'],
               data: [68, 48],
            },
         ],
      },
      plugins: [
         {
            beforeDraw: function (chart) {
               var width = chart.chart.width,
                  height = chart.chart.height,
                  ctx = chart.chart.ctx;

               ctx.restore();
               var fontSize = (height / 150).toFixed(2);
               ctx.font = fontSize + 'em sans-serif';
               ctx.fillStyle = '#9b9b9b';
               ctx.textBaseline = 'middle';

               var text = '68%',
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height / 2;

               ctx.fillText(text, textX, textY);
               ctx.save();
            },
         },
      ],
      options: {
         legend: {
            display: false,
         },
         responsive: true,
         maintainAspectRatio: false,
         cutoutPercentage: 85,
      },
   });
}
