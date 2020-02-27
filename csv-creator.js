/*
Extracts relevant information and customizes the output (CSV) for Dolores which will make the analysis.
Currently a manual labour.
Creating the csv-file as outout and from the console.log pasting the output into the designated csv.file

Initialize the process by going to the Dolores-section in the application.
Look in Console and copy the data
Remove the header
*/

d3.csv('http://localhost:1000/activity.csv').then(extractActivityData);

var CaloriesBurned;
var Date;
var StartTime;
var MinutesAsleep;
var DeepSleepPercentage;
var SleepTrimmed = [];
var DateTrimmed = [];
var CaloriesTrimmed = [];
var DSPercentageTrimmed = [];

function extractActivityData(content){
  Date = content.map(function(d) {
      return d.Date;
  });
  CaloriesBurned = content.map(function(d) {
    var retString = d.CaloriesBurned.substring(0,1);
    retString += d.CaloriesBurned.substring(2,5);
    return parseInt(retString);
  });
  d3.csv('http://localhost:1000/sleep.csv').then(extractSleepData);
};

// Function is called after all activity-data has been extracted.
function extractSleepData(content){
  StartTime = content.map(function(d) {
      return d.StartTime.substring(0,10);
  }).reverse();
  MinutesAsleep = content.map(function(d) {
    var num = ((parseInt(d.MinutesAsleep))/60);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  });
  DeepSleepPercentage = content.map(function(d) {
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

  for(let i = 0; i < Date.length; i++){
    for(let j = 0; j < Date.length; j++){
      if(Date[i] == StartTime[j]){
        SleepTrimmed.push(MinutesAsleep[j]);
        DateTrimmed.push(Date[i]);
        CaloriesTrimmed.push(CaloriesBurned[i]);
        DSPercentageTrimmed.push(DeepSleepPercentage[i]);
      }
    }
  }

  var csv = 'Date,Sleep,CaloriesBurned,DeepSleepPercentage\n';
  for(let i = 0; i < DateTrimmed.length; i++){
    csv += DateTrimmed[i] + ',' + SleepTrimmed[i] + ',' + CaloriesTrimmed[i] + ',' + DSPercentageTrimmed[i] + '\n';
  }
  console.log(csv);
};
