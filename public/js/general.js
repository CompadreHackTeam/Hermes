/**
 * Created by ricardo on 10/03/17.
 */
$(document).ready(function () {

    var jsonList = {};

    $.ajax({
        type: 'GET',
        url: 'http://hack4good17.cloudapp.net:8585/api/getClientDataParametrized/epcc/2017-03-10T22:12:50.127Z/2017-03-10T22:13:50.127Z/100',
        data: (jsonList),
        dataType: 'json',
        success: function (jsonList) {
            inflateLineDataView(jsonList);
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://hack4good17.cloudapp.net:8585/api/getPacketsByDate/epcc/2017-03-11T00:00:00.000Z',
        data: (jsonList),
        dataType: 'json',
        success: function (jsonList) {
            inflateBarCharView(jsonList);
        }
    });


});


function inflateBarCharView(jsonList) {

    var dataindex = [];
    var datapoint = [];

    jsonList.forEach(function (object) {

        dataindex.push(object.fhour);
        datapoint.push((object.clients / 2).toFixed(2));
    });


    var lineData = {
        labels: dataindex,
        datasets: [
            {
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

    var ctx = document.getElementById("barChart").getContext("2d");
    var options = {};
    var barChart = new Chart(ctx).Line(lineData, options);
}

function inflateLineDataView(jsonList) {

    var dataindex = [];
    var datapoint = [];

    jsonList.forEach(function (object) {

        var localDate = new Date(object.date);
        var formatDate = getWellTime(localDate);
        dataindex.push(formatDate);
        datapoint.push(parseInt(object.distance));
    });


    var lineData = {
        labels: dataindex,
        datasets: [
            {
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

/**
 * @return {string}
 */
function getWellTime(date) {
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return hours + ":" + minutes;
}