"use strict";

/*
 * Name : Login-1.0.1.js
 * Company Name : tru2Spces
 * Project Name : tru2Spces
 * version : 1.0.0
 * Update Date :  06/09/2017
*/
// ============================================================================================

 //var BaseURL = 'http://13.59.52.2:8000/';
// var BaseURL = 'http://127.0.0.1:8000/';


$(document).ready(function () {
    GetData();
        // $('body').append('<div id="toTop" class="btn btn-inverse"><i class="fa fa-arrow-up"></i>Back to Top</div>');
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() != 0) {
        //         $('#toTop').fadeIn();
        //     } else {
        //         $('#toTop').fadeOut();
        //     }
        // });
        // $('#toTop').click(function () {
        //     $("html, body").animate({ scrollTop: 0 }, 600);
        //     return false;
        // });
        $("#divmenu").load("menumaster.html");
        
    });

function GetData() {
    $.LoadingOverlay("show");
    // var UserId = $('#txtUsername').val();
    // var Pass = $('#txtPassword').val();
    var jsonString = '{}';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url : BaseURL + "customer/get",
        data : jsonString,
        dataType : "Json",
        success: function (data) {
            if (data.ResponseCode == 200) {
                if (data.Data.Customer.length > 0) {
                    // $('#lblTotal').html(data.d.length);
                    console.log(data);
                    bindGetAllSRList(data.Data.Customer);
                    $.LoadingOverlay("hide");
                    return false;
                }
                else {
                    ClearTable();
                    $('#lblTotal').html('0');
                    $.LoadingOverlay("hide");
                    showMessage('danger', 'Error', 'Data Not Found...');
                    return false;
                }
            } else {
                // debugger;
                ClearTable();
                $('#lblTotal').html('0');
                $.LoadingOverlay("hide");
                showMessage('danger', 'Error', 'Data Not Found...');
                return false;
            }
        },
        error: function (result) {
            $.LoadingOverlay("hide");
            showMessage('danger', 'Error', result.ErrorMessage);
            console.log(result.status)
        }
    });
}

function ClearTable() {
    $('#gvCustomerDetails').empty();
    // $("#btnrowList").empty();
    $("#gvCustomerDetails").html("<thead><tr><th>ID</th><th>CustomerId</th><th>UserId</th><th>FirstName</th><th>LastName</th><th>ContactNo</th><th>Gender</th><th>DOB</th><th>ReferralCode</th><th>MyReferral</th><th>MaritalStatus</th><th>ReferedBy</th><th>CreatedBy</th><th>CreatedDate</th><th>ModifyBy</th><th>ModifyDate</th></tr></thead>");
}

// Bind Master Table
var minidataList;
var totalrecordsList;
var totalpagesList;
var pnumList;
var psizeList;
var pagebtngroupList;
var RegIdList;
var serviceidList;
var OperatorIdList;
var importPOIDList;

function bindGetAllSRList(data) {
    $('#btnrowList').html("");
    //$("#lbltotalDetails").html(data.d.length);
    totalrecordsList = data.length;
    pnumList = 1;
    psizeList = 10;
    pagebtngroupList = 10;
    totalpagesList = totalrecordsList / psizeList;
    if ((totalpagesList % 1) > 0) {
        totalpagesList = totalpagesList + 1;
    }
    totalpagesList = Math.floor(totalpagesList);
    var from = (pnumList - 1) * psizeList;
    var to = (pnumList) * psizeList;
    minidataList = data;
    if (totalrecordsList < psizeList) {
        to = totalrecordsList;
    }

    bindwithpagingList(psizeList, data, from, to);

    if (totalpagesList < pagebtngroupList)
        pagebtngroupList = totalpagesList;
    var j = 1;
    for (var p = 1; p <= pagebtngroupList; p++) {
        $('#btnrowList').append("<input type='button' class='btn' value=" + j + " id='btn_aList" + j + "'   />");
        $('#btn_aList' + j).attr("onclick", "callpagingList(" + j + "," + psizeList + ")");
        j++;
    }

    if (totalpagesList > pagebtngroupList) {
        $('#btnrowList').append("<input type='button' class='btn' value='>>' id='morebtnList" + j + "'   />");
        $('#morebtnList' + j).attr("onclick", "morepagingList(" + j + "," + psizeList + "," + totalpagesList + ")");
    }

}
function morepagingList(pnumList, psizeList, totalpagesList) {
    callpagingList(pnumList, psizeList);

    $('#btnrowList').html("");
    var j = pnumList;

    if (pnumList != pagebtngroupList) {
        $('#btnrowList').append("<input type='button' class='btn' value='<<' id='lessbtnList" + (pnumList - 1) + "'   />");
        $('#lessbtnList' + ((pnumList - 1))).attr("onclick", "lesspagingList(" + (pnumList - 1) + "," + psizeList + ")");
    }
    var tot = pnumList + pagebtngroupList - 1;
    if (tot > totalpagesList)
        tot = totalpagesList;

    for (var p = pnumList; p <= tot; p++) {
        $('#btnrowList').append("<input type='button' class='btn' value=" + (j) + " id='btn_aList" + (j) + "'   />");
        $('#btn_aList' + (j)).attr("onclick", "callpagingList(" + (j) + "," + psizeList + ")");
        j++;
    }
    if ((pnumList + pagebtngroupList) < totalpagesList) {
        $('#btnrowList').append("<input type='button' class='btn' value='>>' id='morebtnList" + j + "'   />");
        $('#morebtnList' + j).attr("onclick", "morepagingList(" + j + "," + psizeList + "," + totalpagesList + ")");
    }
}
function lesspagingList(pnumList, psizeList) {
    callpagingList(pnumList, psizeList);
    $('#btnrowList').html("");
    var j = pnumList;
    if (pnumList != (pagebtngroupList)) {
        $('#btnrowList').append("<input type='button' class='btn' value='<<' id='lessbtnList" + (j - pagebtngroupList) + "'   />");
        $('#lessbtnList' + (j - pagebtngroupList)).attr("onclick", "lesspagingList(" + (j - pagebtngroupList) + "," + psizeList + ")");
    }
    j++;

    for (var p = (pnumList - pagebtngroupList + 1) ; p <= pnumList; p++) {
        $('#btnrowList').append("<input type='button' class='btn' value=" + p + " id='btn_aList" + p + "'   />");
        $('#btn_aList' + p).attr("onclick", "callpagingList(" + p + "," + psizeList + ")");
        j++;
    }
    if ((pnumList < totalpagesList)) {
        $('#btnrowList').append("<input type='button' class='btn' value='>>' id='morebtnList" + p + "'   />");
        $('#morebtnList' + p).attr("onclick", "morepagingList(" + p + "," + psizeList + "," + totalpagesList + ")");
    }
}
function callpagingList(pnumList, psizeList) {
    var from = (pnumList - 1) * psizeList;
    var to = (pnumList) * psizeList;

    if (to > minidataList.length)
        to = minidataList.length;

    bindwithpagingList(psizeList, minidataList, from, to);
}
function bindwithpagingList(psizeList, data, from, to) {
    ClearTable();
     for (var i = from; i < to; i++) {
        $("#gvCustomerDetails").append("<tr><td><a href='#myModal' role='button' data-toggle='modal' onclick='ShowSRDetails(\"" + data[i].ReferenceID + "\",\"" + data[i].FranchiseName + "\")'>View</a></td><td>" + data[i].CustomerId + "</td><td>" + data[i].UserId + "</td><td>" + data[i].FirstName + "</td> <td>" + data[i].LastName + "</td><td>" + data[i].ContactNo + "</td><td>" + data[i].Gender + "</td><td>" + data[i].DOB + "</td><td>" + data[i].ReferralCode + "</td><td>" + data[i].MyReferral + "</td><td>" + data[i].MaritalStatus + "</td><td>" + data[i].ReferedBy + "</td><td>" + data[i].CreatedBy + "</td><td>" + data[i].CreatedDate + "</td><td>" + data[i].ModifyBy + "</td><td>" + data[i].ModifyDate + "</td></tr>");
    }
}

// Redirect if not Sign In
function pageRedirect() {
    window.location.href = "ErrorPage.html";
}

//Show toaster msg  send msg type , title and message as a parameter
function showMessage(valpriority, valTitle, valMessage) {
   $.toaster({ priority: valpriority, title: valTitle, message: valMessage }); // success , info , warning , danger
}