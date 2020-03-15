var ctx = document.getElementById('corona-sweden').getContext('2d');

d3.csv('http://localhost:1000/covid_19_data.csv').then(plotSweden);

function plotSweden(content){
  var SwedenObservationDate = [];
  var SwedenConfirmed = [];
  var DenmarkObservationDate = [];
  var DenmarkConfirmed = [];


  // in map-function, extract all swedish associated data
  var Sweden = content.map(function(d) {
    if(d.CountryRegion == "Sweden"){
      SwedenObservationDate.push(d.ObservationDate);
      SwedenConfirmed.push(d.Confirmed);
    }
  });

  var Denmark = content.map(function(d) {
    if(d.CountryRegion == "Denmark"){
      DenmarkObservationDate.push(d.ObservationDate);
      DenmarkConfirmed.push(d.Confirmed);
    }
  });

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: SwedenObservationDate,
          datasets: [{
              label: 'Confirmed Cases in Sweden (Last Update: 2020-03-15)',
              data: SwedenConfirmed,
              backgroundColor: 'rgba(54, 162, 235, 0.3)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          },
          {
              label: 'Confirmed Cases in Denmark (Last Update: 2020-03-15)',
              data: DenmarkConfirmed,
              backgroundColor: 'rgba(200, 22, 235, 0.3)',
              borderColor: 'rgba(200, 22, 235, 1)',
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
