/**
 * Created by ricardo on 10/03/17.
 */
var barChart;
var clientName = "";


$(document).ready(function () {

    var date = new Date();

    $('.selectpicker').selectpicker({
        style: 'btn-info',
        size: 4
    });

    // Inflate the date picker with the clients
    getClients(function (clientlist, err) {
        clientName = clientlist[0].clientId;
        clientlist.forEach(function (object) {
            $(".selectpicker").append('<option>' + object.clientId + '</option>');
        });
        $(".selectpicker").selectpicker("refresh");

        // Call with today date first
        onNewDateSelected(date);
    });

    $('.selectpicker').on('change', function () {
        clientName = $(this).find("option:selected").val();
        onNewDateSelected(date);
    });


    $('#datetimepicker1').datetimepicker({
        defaultDate: date,
        format: 'DD/MM/YYYY'
    }).on('dp.change', function (event) {
        date = new Date(event.date);
        onNewDateSelected(date);
    });

});

function getClients(callback) {

    var clientList = {};

    $.ajax({
        type: 'GET',
        url: 'http://hack4good17.cloudapp.net:8585/api/getClients',
        data: (clientList),
        dataType: 'json',
        success: function (clientList) {
            callback(clientList, null);
        }
    });
}

function onNewDateSelected(date) {

    var jsonList = {};

    $.ajax({
        type: 'GET',
        url: 'http://hack4good17.cloudapp.net:8585/api/getPacketsByDate/' + clientName + '/' + date.toDateString(),
        data: (jsonList),
        dataType: 'json',
        success: function (jsonList) {
            inflateBarCharView(jsonList);
        }
    });

}

function inflateBarCharView(jsonList) {
    var dataindex = [];
    var datapoint = [];

    jsonList.forEach(function (object) {

        dataindex.push(object.fhour);
        datapoint.push((object.clients).toFixed(2));
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

    if (barChart !== undefined) {
        barChart.destroy();
    }
    var ctx = document.getElementById("barChart").getContext("2d");
    barChart = new Chart(ctx).Line(lineData, {});
}
