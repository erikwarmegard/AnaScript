var ctx = document.getElementById('bedtime-deepsleep').getContext('2d');

d3.csv('http://localhost:1000/sleep.csv').then(plotSleep);

function plotSleep(content){
  var StartTime = content.map(function(d) {
    if(d.MinutesDeepSleep == 'N/A'){
      return 'X';
    }

    var hours = d.StartTime.substring(d.StartTime.indexOf(' '), d.StartTime.indexOf(':'));
    var minutes = d.StartTime.substring(d.StartTime.indexOf(':') + 1, d.StartTime.length - 2);
    var AMorPM = d.StartTime.substring(d.StartTime.length - 2, d.StartTime.length);

    if(AMorPM == 'PM'){
      hours = parseInt(hours)
      if((hours += 12) == 24){
        hours = 0;
      };
    };
    if(hours.toString().length == 3){
      hours = hours.toString().substring(1, hours.length);
    };
    var finalTime = hours.toString() + ":" + minutes;
    if(finalTime.length == 4){
      finalTime = '0' + finalTime;
    };
    if(finalTime.charAt(0) == " "){
      finalTime = finalTime.substring(1,finalTime.length);
    }
    if(finalTime.length == 4){
      var zero = "0";
      finalTime = zero + finalTime;
    };

    return finalTime;
  }).sort();

  while(StartTime.includes('X')){
    StartTime.splice(StartTime.indexOf(StartTime.indexOf('X'), 1));
  }


  var DeepSleepPercentage = content.map(function(d) {
    if(d.MinutesDeepSleep == 'N/A'){
      return 0;
    }

    var deepsleep_min = parseInt(d.MinutesDeepSleep);

    var totalSleep = parseInt(d.MinutesAsleep) + parseInt(d.MinutesAwake);
    var ds_percentage = (deepsleep_min/totalSleep) * 100;

    return Math.round((ds_percentage + Number.EPSILON) * 100) / 100;
  });

  for(let i = 0; i < DeepSleepPercentage.length; i++){
    if(DeepSleepPercentage[i] == 0){
      DeepSleepPercentage.splice(i,1);
    }

  }

  let sumMinutesDeepSleep = DeepSleepPercentage.reduce((previous, current) => current += previous);
  let avgMinutesDeepSleep = (sumMinutesDeepSleep / DeepSleepPercentage.length);
  document.getElementById("average-time-asleep").innerHTML = "Average Deep Sleep: " + Math.round((avgMinutesDeepSleep + Number.EPSILON) * 100) / 100 + " %";

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: StartTime,
          datasets: [{
              label: 'Percentage: %',
              data: DeepSleepPercentage,
              backgroundColor: 'rgba(0, 194, 100, 0.3)',
              borderColor: 'rgba(0, 194, 100, 1)',
              borderWidth: 1
          }]
      },
      options: {
        tooltips: {
          callbacks: {
            //label: function(tooltipItem, data) {
            //  var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
            //  return data.datasets[tooltipItem.datasetIndex].data;
          //  }
          }
        }
      }
  });

};
