/**
 * Created by pedro on 10/03/17.
 */

var clientDataURL = "/getClientData/'";

function fetchClientData(clientId) {
    console.log("nice try");
    applicationAjaxRetriever(clientId);

}

function applicationAjaxRetriever(idClient){
    var url=clientDataURL + idClient;
    var promise = ajaxCaller(url);
    proccessAjaxResponse(promise);
}

/**
 * Generic Ajax caller.
 * @param url
 * @returns {*}
 */
function ajaxCaller(url){
    var data = {}
    data["query"] = $("#query").val();
    return $.ajax({
        type : "GET",
        contentType : "application/json",
        url : url,
        data : (data),
        dataType : 'json',
        timeout : 100000
    });
}


/**
 * Parse data from Ajax promise (for Application request) and also render first app related chart (this is somehow default selection).
 * @param promise
 */

function proccessAjaxResponse(promise){

    promise.success(function (data){
        console.log(data);
    });
}
