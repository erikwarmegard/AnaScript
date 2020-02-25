var ctx = document.getElementById('hours-of-sleep').getContext('2d');

d3.csv('http://localhost:1000/sleep.csv').then(plotSleep);

function plotSleep(content){
  var StartTime = content.map(function(d) {
      return d.StartTime.substring(2,10);
  }).reverse();

  var MinutesAsleep = content.map(function(d) {
    var num = ((parseInt(d.MinutesAsleep))/60);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  });

  let sumMinutesAsleep = MinutesAsleep.reduce((previous, current) => current += previous);
  let avgMinutesAsleep = (sumMinutesAsleep / MinutesAsleep.length);
  document.getElementById("average-time-asleep").innerHTML = "Average Time Asleep: " + Math.round((avgMinutesAsleep + Number.EPSILON) * 100) / 100 + " hours";

  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: StartTime,
          datasets: [{
              label: 'Hours of Sleep',
              data: MinutesAsleep,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgba(54, 162, 235, 1)',
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

















/*
function createChart(players){

  var StartTime = players.map(function(d) {
      return d.StartTime.substring(0,9);
  });

  var MinutesAsleep = players.map(function(d) {
    return parseInt(d.MinutesAsleep);
  });

  var MinutesDeepSleep = players.map(function(d) {
    if(d.MinutesDeepSleep == 'N/A'){
      return 0;
    }
    return parseInt(d.MinutesDeepSleep);
  });

  let sumMinutesDeepSleep = MinutesDeepSleep.reduce((previous, current) => current += previous);
  let avgMinutesDeepSleep = sumMinutesDeepSleep / MinutesDeepSleep.length;

  let sumMinutesAsleep = MinutesAsleep.reduce((previous, current) => current += previous);
  let avgMinutesAsleep = (sumMinutesAsleep / MinutesAsleep.length) - avgMinutesDeepSleep;

  let recommendedMinutesAsleep = 60 * 8;
  let recommendedDeepSleep = recommendedMinutesAsleep * 0.17;

  var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Average Minutes Asleep', 'Average Deep Sleep', 'Recommended Minutes Asleep', 'Recommended Deep Sleep'],
          //labels: StartTime,
          datasets: [
            {
              label: 'Erik',
              //data: [12, 19, 3, 5, 2],
              data: [avgMinutesAsleep, avgMinutesDeepSleep],
              backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 2,
              fill: true
          },
          {
              label: 'Recommended Sleep/REM',
              //data: [12, 19, 3, 5, 2],
              data: [recommendedMinutesAsleep, recommendedDeepSleep],
              backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
              borderWidth: 2,
              fill: true
          }]
      },
      options: {
          legend: {
            labels: {
              fontColor: 'white',

            }
          },
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
*/



/*
$.ajax({
    type: 'POST',
    data: 'data',
    url: '\\dolores.py',
    success: function(response){
      console.log(typeof(response));
      //JSON.stringify(response)
  }
});
*/




/*
$.ajax({
    type: 'POST',
    data: 'data',
    url: '\\dolores.py',
    success: function(response){
      console.log(JSON.stringify(response));
  }
});
*/
