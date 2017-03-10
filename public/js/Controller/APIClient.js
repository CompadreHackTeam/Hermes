/**
 * Created by pedro on 10/03/17.
 */
var baseURL = "http://hack4good17.cloudapp.net:8585";
var clientDataURL = "/getClientData/";

function fetchClientData(clientId) {
    getClientAjaxRetriever(clientId);

}
function getClientAjaxRetriever(idClient){
    var url =baseURL + clientDataURL + idClient;
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
    console.log("ajaxCaller url:" + url);
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
