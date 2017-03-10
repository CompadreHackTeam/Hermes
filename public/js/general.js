/**
 * Created by ricardo on 10/03/17.
 */
$(document).ready(function () {

    var jsonList = {};

    $.ajax({
        type: 'GET',
        //url: 'http://hack4good17.cloudapp.net:8585/api/getClientData/epcc',
        url: 'http://hack4good17.cloudapp.net:8585/api/getClientDataParametrized/epcc/2017-03-10T22:12:50.127Z/2017-03-10T22:17:50.127Z/100',
        data: (jsonList),
        dataType: 'json',
        success: function (jsonList) {
            inflateDataView(jsonList);
        }
    });


});

function inflateDataView(jsonList) {

    var dataindex = [];
    var datapoint = [];

    jsonList.forEach(function (object) {

        dataindex.push(object.date);
        datapoint.push(object.distance);
    });


    var lineData = {
        labels: dataindex,
        datasets: [
            {
                label: "Prime and Fibonacci",
                fillColor: "rgba(76,175,80,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: datapoint
            }
        ]
    };

    var ctx = document.getElementById("lineChart").getContext("2d");
    var options = {};
    var lineChart = new Chart(ctx).Line(lineData, options);

}