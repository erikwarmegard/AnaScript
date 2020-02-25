var ctx = document.getElementById('caloriesCanvas').getContext('2d');

d3.csv('http://localhost:1000/activity.csv').then(plotActivity);

function plotActivity(content){
  var Date = content.map(function(d) {
      return d.Date;
  }).reverse();

  var CaloriesBurned = content.map(function(d) {
    var retString = d.CaloriesBurned.substring(0,1);
    retString += d.CaloriesBurned.substring(2,5);
    return parseInt(retString);
  });

  let sumCaloriesBurned = CaloriesBurned.reduce((previous, current) => current += previous);
  let avgCaloriesBurned = (sumCaloriesBurned / CaloriesBurned.length);
  document.getElementById("average-calorie-burn").innerHTML = "Average Calorie burn: " + Math.round((avgCaloriesBurned + Number.EPSILON) * 100) / 100 + " kcal";



  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Date,
          datasets: [{
              label: 'Calories Burned',
              data: CaloriesBurned,
              backgroundColor: 'rgba(248, 148, 6, 0.4)',
              borderColor: 'rgba(248, 148, 6, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

};
