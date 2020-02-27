var ctx = document.getElementById('excercise-qos').getContext('2d');

d3.csv('http://localhost:1000/excercise-qos.csv').then(plotSleep);

function plotSleep(content){
  var DeepSleepPercentage = content.map(function(d) {
    return parseFloat(d.DeepSleepPercentage);
  });

  var CaloriesBurned = content.map(function(d) {
    return parseInt(d.CaloriesBurned);
  }).sort();

  var Sleep = content.map(function(d) {
    return parseFloat(d.Sleep);
  });

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: CaloriesBurned,
          datasets: [{
              label: '% Deep sleep',
              data: DeepSleepPercentage,
              backgroundColor: 'rgba(186, 186, 30, 0.3)',
              borderColor: 'rgba(186, 186, 30, 1)',
              borderWidth: 1
          },
          {
            label: 'Hrs of sleep',
            data: Sleep,
            backgroundColor: 'rgba(23, 23, 8, 0.3)',
            borderColor: 'rgba(23, 23, 8, 0.6)',
            borderWidth: 1
          }
          ]
      },
      options: {
      }
  });

};
