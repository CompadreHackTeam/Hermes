
$("a[href=#chartTab]").click(function() {
    fetchClientData("epcc");
});


function proccessAjaxResponse(promise){

    promise.success(function (data){
        console.log("PROMISED: " + data);
        //populateMorrisLine();
    });
}


function populateMorrisLine(xAxisData, yAxixData){
    new Morris.Line({

        element: 'myLineChart',

        data: [
            { year: '2008', value: 20 },
            { year: '2009', value: 10 },
            { year: '2010', value: 5 },
            { year: '2011', value: 5 },
            { year: '2012', value: 20 }
        ],

        xkey: 'year',

        ykeys: ['value'],

        labels: ['Value']
    });
}
