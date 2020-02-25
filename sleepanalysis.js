var ctx = document.getElementById('sleep-stages').getContext('2d');

d3.csv('http://localhost:1000/sleep.csv').then(plotSleep);

function plotSleep(content){
  var StartTime = content.map(function(d) {
      return d.StartTime.substring(2,10);
  }).reverse();

  var MinutesAsleep = content.map(function(d) {
    var num = ((parseInt(d.MinutesAsleep))/60);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  });




var MinutesLightSleep = content.map(function(d) {
  if(d.MinutesLightSleep == 'N/A'){
    return 0;
  }
  var num = ((parseInt(d.MinutesLightSleep))/60);
  return Math.round((num + Number.EPSILON) * 100) / 100;
});

let sumMinutesLightSleep = MinutesLightSleep.reduce((previous, current) => current += previous);
let avgMinutesLightSleep = (sumMinutesLightSleep / MinutesLightSleep.length);
avgMinutesLightSleep = Math.round((avgMinutesLightSleep + Number.EPSILON) * 100) / 100
//document.getElementById("average-time-asleep").innerHTML = "Average time in light sleep: " + avgMinutesAsleep + " hours";


var MinutesREMSleep = content.map(function(d) {
  if(d.MinutesREMSleep == 'N/A'){
    return 0;
  }
  var num = ((parseInt(d.MinutesREMSleep))/60);
  return Math.round((num + Number.EPSILON) * 100) / 100;
});

let sumMinutesREMSleep = MinutesREMSleep.reduce((previous, current) => current += previous);
let avgMinutesREMSleep = (sumMinutesREMSleep / MinutesAsleep.length);
avgMinutesREMSleep = Math.round((avgMinutesREMSleep + Number.EPSILON) * 100) / 100;
//document.getElementById("average-time-asleep").innerHTML = "Average Time Asleep: " + Math.round((avgMinutesAsleep + Number.EPSILON) * 100) / 100 + " hours";

  var MinutesDeepSleep = content.map(function(d) {
    if(d.MinutesDeepSleep == 'N/A'){
      return 0;
    }
    var num = ((parseInt(d.MinutesDeepSleep))/60);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  });

  let sumMinutesDeepSleep = MinutesDeepSleep.reduce((previous, current) => current += previous);
  let avgMinutesDeepSleep = (sumMinutesDeepSleep / MinutesAsleep.length);
  avgMinutesDeepSleep = Math.round((avgMinutesDeepSleep + Number.EPSILON) * 100) / 100;
  //document.getElementById("average-time-asleep").innerHTML = "Average Time Asleep: " + Math.round((avgMinutesAsleep + Number.EPSILON) * 100) / 100 + " hours";

  var MinutesAwake = content.map(function(d) {
    if(d.MinutesAwake == 'N/A'){
      return 0;
    }
    var num = ((parseInt(d.MinutesAwake))/60);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  });

  let sumMinutesAwake = MinutesAwake.reduce((previous, current) => current += previous);
  let avgMinutesAwake = (sumMinutesAwake / MinutesAwake.length);
  avgMinutesAwake = Math.round((avgMinutesAwake + Number.EPSILON) * 100) / 100;
  //document.getElementById("average-time-asleep").innerHTML = "Average Time Asleep: " + Math.round((avgMinutesAsleep + Number.EPSILON) * 100) / 100 + " hours";

  let RTA = 8; // Recommended Time Asleep
  let MRDS = RTA * 0.12; // Minimum Recommended Deep Sleep
  let MRREMS = RTA * 0.15; // Minimum Recommended REM Sleep
  let MRLS = RTA * 0.40; // Minimum Recommended Light Sleep
  let MRTA = RTA * 0.05; // Minimum Recommended Time Awake


// ((Math.round(((((avgMinutesLightSleep/MRLS)*100) - 100) + Number.EPSILON) * 100) / 100))
// ((Math.round(((avgMinutesAwake/MRTA) + Number.EPSILON) * 100) / 100) - 100)

  document.getElementById("awake-time-percentage").innerHTML = "Time Awake : " + (Math.round(((avgMinutesAwake/MRTA)*100 - 100)*100)/100) + "%";
  document.getElementById("deep-sleep-percentage").innerHTML = "Deep Sleep: " + (Math.round(((avgMinutesDeepSleep/MRDS)*100 - 100)*100)/100) + "%";
  document.getElementById("rem-sleep-percentage").innerHTML = "REM Sleep: " + ((Math.round(((((avgMinutesREMSleep/MRREMS)*100) - 100) + Number.EPSILON) * 100) / 100)) + "%";
  document.getElementById("light-sleep-percentage").innerHTML = "Light Sleep: " + (Math.round(((avgMinutesLightSleep/MRLS)*100 - 100)*100)/100) + "%";

  var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ['Awake', 'Deep Sleep', 'REM Sleep', 'Light Sleep'],
          datasets: [{
              label: 'Percentage of Sleep',
              data: [avgMinutesAwake, avgMinutesDeepSleep, avgMinutesREMSleep, avgMinutesLightSleep],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 2
          },
          {
              label: 'Recommended',
              data: [MRTA, MRDS, MRREMS, MRLS],
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 2,
              fill: true
          }]
      },
      options: {
        cutoutPercentage: 30,
        /*
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ' : ' + data.datasets[tooltipItem.datasetIndex].data;
            }
          }
        }
        */
      }
  });

};
