"use strict";

/*
 * Name : Seller-1.0.1.js
 * Company Name : tru2Spces
 * Project Name : tru2Spces
 * version : 1.0.0
 * Update Date :  06/09/2017
*/
// ============================================================================================

 //var BaseURL = 'http://13.59.52.2:8000/';
//var BaseURL = 'http://127.0.0.1:8000/';

$(document).ready(function () {
    $('.isNumber').keypress(function (event) {
        return isNumber(event, this)
    });
    GetData();
    $("#divmenu").load("menumaster.html");
    
});


function Add() {

    $.LoadingOverlay("show");
    var UserId = $('#emailid').val();
    var FirstName = $('#firstname').val();
    var LastName = $('#lastname').val();
    var CompanyName = $('#companyname').val();
    var Gender = $("input:radio[name=gender]:checked").val();
    var LandlineNo = $('#landlineno').val();
    var MobileNo = $('#mobileno').val();
    var CCNumber = $('#customercare').val();
    var CreatedBy = $('#txtPassword').val();
    var Line1 = $('#addressline1').val();
    var Line2 = $('#addressline2').val();
    var Line3 = $('#addressline3').val();
    var Landmark = $('#landmark').val();
    var State = $('#state').val();
    var City = $('#city').val();
    var Pincode = $('#pincode').val();
    var Country = $('#country').val();
    var Phone1 = $('#phonenumber1').val();
    var Phone2 = $('#phonenumber2').val();
    if (FirstName.trim() == "") {
        showMessage('info', 'Info', 'Please enter first name.');
        $("#firstname").focus();
        $.LoadingOverlay("hide");
        return;
    }
    if (CompanyName.trim() == "") {
        showMessage('info', 'Info', 'Please enter company name.');
        $("#companyname").focus();
        $.LoadingOverlay("hide");
        return;
    }
    if (UserId.trim() == "") {
        showMessage('info', 'Info', 'Please Enter email id.');
        $("#emailid").focus();
        $.LoadingOverlay("hide");
        return;
    }

    if (MobileNo.trim() == "") {
        showMessage('info', 'Info', 'Please Enter Mobile No..');
        $("#mobileno").focus();
        $.LoadingOverlay("hide");
        return;
    }

    var jsonString = '{"UserId": "' + UserId
        + '","FirstName":"' + FirstName
        + '","LastName":"' + LastName
        + '","CompanyName":"' + CompanyName
        + '","Gender":"' + Gender
        + '","LandlineNo":"' + LandlineNo
        + '","MobileNo":"' + MobileNo
        + '","CCNumber":"' + CCNumber
        + '","CreatedBy":"' + CreatedBy
        + '","Line1":"' + Line1
        + '","Line2":"' + Line2
        + '","Line3":"' + Line3
        + '","Landmark":"' + Landmark
        + '","State":"' + State
        + '","City":"' + City
        + '","Pincode":"' + Pincode
        + '","Country":"' + Country
        + '","Phone1":"' + Phone1
        + '","Phone2":"' + Phone2 + '"}';

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: BaseURL + "seller/add",
        data: jsonString,
        dataType: "Json",
        success: function (data) {
            if (data.ResponseCode == '200') {
                // showMessage('success', 'Success', "Data has been saved successfully...!");
                showMessage('success', 'Success', data.Data);
                Reset();
                GetData();
                $.LoadingOverlay("hide");
                return false;
            }
            else {
                $.LoadingOverlay("hide");
                showMessage('danger', 'Error', data.ErrorMessage);
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

function Reset() {
    $('#emailid').val('');
    $('#firstname').val('');
    $('#lastname').val('');
    $('#companyname').val('');
    $("#rdomale").prop("checked", true)
    $('#landlineno').val('');
    $('#mobileno').val('');
    $('#customercare').val('');
    $('#addressline1').val('');
    $('#addressline2').val('');
    $('#addressline3').val('');
    $('#landmark').val('');
    $('#state').val('');
    $('#city').val('');
    $('#pincode').val('');
    $('#country').val('');
    $('#phonenumber1').val('');
    $('#phonenumber2').val('');
    $('#firstname').focus();
}



// Redirect if not Sign In
function pageRedirect() {
    window.location.href = "ErrorPage.html";
}


// Validate for only number
function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57) &&
        (charCode > 31)) // Enable backspace
        return false;

    return true;
}

//Show toaster msg  send msg type , title and message as a parameter
function showMessage(valpriority, valTitle, valMessage) {
    $.toaster({ priority: valpriority, title: valTitle, message: valMessage }); // success , info , warning , danger
}



function GetData() {
    $.LoadingOverlay("show");
    // var UserId = $('#txtUsername').val();
    // var Pass = $('#txtPassword').val();
    var jsonString = '{}';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url : BaseURL + "seller/get",
        data : jsonString,
        dataType : "Json",
        success: function (data) {
            if (data.ResponseCode == 200) {
                if (data.Data.Seller.length > 0) {
                    // $('#lblTotal').html(data.d.length);
                    console.log(data);
                    bindGetAllSRList(data.Data.Seller);
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
    $('#gvDetailsList').empty();
    // $("#btnrowList").empty();
    $("#gvDetailsList").html("<thead><tr><th></th><th></th><th></th><th>SellerId</th><th>UserId</th><th>CompanyName</th><th>FullName</th><th>Gender</th><th>MobileNo</th><th>LandlineNo</th><th>CCNumber</th><th>Address Line1</th><th>Address Line2</th><th>Address Line3</th><th>Pincode</th><th>CreatedBy</th><th>CreatedDate</th><th>ModifyBy</th><th>ModifyDate</th></tr></thead>");
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
        $("#gvDetailsList").append("<tr><td><a href='#myModal' role='button' data-toggle='modal' onclick='ShowSRDetails(\"" + data[i].SellerId + "\",\"" + data[i].SellerId + "\")'>View</a></td><td><a href='#' >Edit</a></td><td><a  href='#' onclick='deleteItem()'>Delete</a></td><td>" + data[i].SellerId + "</td><td>" + data[i].UserId + "</td><td>" + data[i].CompanyName + "</td> <td>" + data[i].FullName + "</td><td>" + data[i].Gender + "</td><td>" + data[i].MobileNo + "</td><td>" + data[i].LandlineNo + "</td><td>" + data[i].CCNumber + "</td><td>" + data[i].Line1 + "</td><td>" + data[i].Line2 + "</td><td>" + data[i].Line3 + "</td><td>" + data[i].Pincode + "</td><td>" + data[i].CreatedBy + "</td><td>" + data[i].CreatedDate + "</td><td>" + data[i].ModifyBy + "</td><td>" + data[i].ModifyDate + "</td></tr>");
    }
}