var ctx = document.getElementById('bedtime-freq').getContext('2d');

d3.csv('http://localhost:1000/sleep.csv').then(plotSleep);

function plotSleep(content){

  var _0TO3 = 0;
  var _3TO6 = 0;
  var _6TO9 = 0;
  var _9TO12 = 0;
  var _12TO15 = 0;
  var _15TO18 = 0;
  var _18TO21 = 0;
  var _21TO22 = 0;
  var _22TO23 = 0;
  var _23TO0 = 0;

  var s_0TO3 = "00-03";
  var s_3TO6 = "03-06";
  var s_6TO9 = "06-09";
  var s_9TO12 = "09-12";
  var s_12TO15 = "12-15";
  var s_15TO18 = "15-18";
  var s_18TO21 = "18-21";
  var s_21TO22 = "21-22";
  var s_22TO23 = "22-23";
  var s_23TO0 = "23-00";


  var StartTime = content.map(function(d) {
    if(d.MinutesDeepSleep == 'N/A'){
      return 'X';
    }

    var hours = d.StartTime.substring(d.StartTime.indexOf(' '), d.StartTime.indexOf(':'));
    var minutes = d.StartTime.substring(d.StartTime.indexOf(':') + 1, d.StartTime.length - 2);
    var AMorPM = d.StartTime.substring(d.StartTime.length - 2, d.StartTime.length);

    if(AMorPM == 'PM'){
      hours = parseInt(hours);
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


    // FIXME: Horrible solution, prone to errors and tedius code reading. Stupid programming
    /* Counts the frequency of bedtimes */
    switch (finalTime.substring(0,2)) { // extract hours
      case '00':
        _0TO3++;
        break;
      case '01':
        _0TO3++;
        break;
      case '02':
        _0TO3++;
        break;
      case '03':
        _3TO6++;
        break;
      case '04':
        _3TO6++;
        break;
      case '05':
        _3TO6++;
        break;
      case '06':
        _6TO9++;
        break;
      case '07':
        _6TO9++;
        break;
      case '08':
        _6TO9++;
        break;
      case '09':
        _9TO12++;
        break;
      case '10':
        _9TO12++;
        break;
      case '11':
        _9TO12++;
        break;
      case '12':
        _12TO15++;
        break;
      case '13':
        _12TO15++;
        break;
      case '14':
        _12TO15++;
        break;
      case '15':
        _15TO18++;
        break;
      case '16':
        _15TO18++;
        break;
      case '17':
        _15TO18++;
        break;
      case '18':
        _18TO21++;
        break;
      case '19':
        _18TO21++;
        break;
      case '20':
        _18TO21++;
        break;
      case '21':
        _21TO22++;
        break;
      case '22':
        _22TO23++;
        break;
      default:
        _23TO0++;
    }


    return finalTime;
  }).sort();
  while(StartTime.includes('X')){
    StartTime.splice(StartTime.indexOf(StartTime.indexOf('X'), 1));
  }


  console.log('0TO3',_0TO3);
  console.log('3TO6',_3TO6);
  console.log('6TO9',_6TO9);
  console.log('9TO12',_9TO12);
  console.log('12TO15',_12TO15);
  console.log('15TO18',_15TO18);
  console.log('18TO21',_18TO21);
  console.log('21TO22',_21TO22);
  console.log('22TO23',_22TO23);
  console.log('23TO0',_23TO0);


  // TODO: remove this
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

  var timestamps = [s_0TO3,s_3TO6,s_6TO9,s_9TO12,s_12TO15,s_15TO18,s_18TO21,s_21TO22,s_22TO23,s_23TO0].reverse();
  var timestampValues = [_0TO3,_3TO6,_6TO9,_9TO12,_12TO15,_15TO18,_18TO21,_21TO22,_22TO23,_23TO0].reverse();

  var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: timestamps,
          datasets: [{
              label: '# Times',
              data: timestampValues,
              backgroundColor: 'rgba(0, 220, 220, 0.5)',
              borderColor: 'rgba(0, 220, 220, 1)',
              borderWidth: 1
          }]
      },
      options: {}
  });
};
