var CTX_SWEDEN_CONFIRMED = document.getElementById('corona-sweden').getContext('2d');
var CTX_ITALY_CONFIRMED = document.getElementById('corona-italy').getContext('2d');
var CTX_CHINA_CONFIRMED = document.getElementById('corona-china').getContext('2d');

function toggleSweden() {
  console.log("nämen tjenare!");
  var sweden = document.getElementById("corona-sweden-div");
  var italy = document.getElementById("corona-italy-div");
  var china = document.getElementById("corona-china-div");
  if (sweden.style.display === "none") {
    sweden.style.display = "block";
    italy.style.display = "none";
    china.style.display = "none";
  } else {
    sweden.style.display = "none";
  }

}

function toggleItaly(key) {
  console.log("gorlami!");
  var sweden = document.getElementById("corona-sweden-div");
  var italy = document.getElementById("corona-italy-div");
  var china = document.getElementById("corona-china-div");
  if (italy.style.display === "none") {
    italy.style.display = "block";
    sweden.style.display = "none";
    china.style.display = "none";
  } else {
    italy.style.display = "none";
  }
}

function toggleChina(key) {
  console.log("Ni hao!");
  var sweden = document.getElementById("corona-sweden-div");
  var italy = document.getElementById("corona-italy-div");
  var china = document.getElementById("corona-china-div");
  if (china.style.display === "none") {
    china.style.display = "block";
    sweden.style.display = "none";
    italy.style.display = "none";
  } else {
    china.style.display = "none";
  }
}


d3.csv('http://localhost:1000/covid_19_data.csv').then(plot);

function plot(content){
  var SwedenObservationDate = [];
  var SwedenConfirmed = [];
  var ItalyObservationDate = [];
  var ItalyConfirmed = [];
  var ChinaObservationDate = [];
  var ChinaConfirmed = [];

  // in map-function, extract all swedish associated data
  var Sweden = content.map(function(d) {
    if(d.CountryRegion == "Sweden"){
      SwedenObservationDate.push(d.ObservationDate);
      SwedenConfirmed.push(d.Confirmed);
    }
  });

  var Italy = content.map(function(d) {
    if(d.CountryRegion == "Italy"){
      ItalyObservationDate.push(d.ObservationDate);
      ItalyConfirmed.push(d.Confirmed);
    }
  });

  var China = content.map(function(d) {
    if(d.CountryRegion == "Mainland China"){
      ChinaObservationDate.push(d.ObservationDate);
      ChinaConfirmed.push(d.Confirmed);
    }
  });

  console.log(ChinaConfirmed);

  var myChart = new Chart(CTX_SWEDEN_CONFIRMED, {
      type: 'line',
      data: {
          labels: SwedenObservationDate,
          datasets: [{
              label: 'Confirmed Cases in Sweden (Last Update: 2020-03-15)',
              data: SwedenConfirmed,
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

  var myChart = new Chart(CTX_ITALY_CONFIRMED, {
      type: 'line',
      data: {
          labels: ItalyObservationDate,
          datasets: [{
              label: 'Confirmed Cases in Italy (Last Update: 2020-03-15)',
              data: ItalyConfirmed,
              backgroundColor: 'rgba(100, 1, 5, 0.3)',
              borderColor: 'rgba(100, 1, 5, 1)',
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

  var myChart = new Chart(CTX_CHINA_CONFIRMED, {
      type: 'line',
      data: {
          labels: ChinaObservationDate,
          datasets: [{
              label: 'Confirmed Cases in China (Last Update: 2020-03-15)',
              data: ChinaConfirmed,
              backgroundColor: 'rgba(1, 100, 54, 0.3)',
              borderColor: 'rgba(1, 100, 54, 1)',
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
