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
        url: BaseURL + "purchasemaster/get",
        data: jsonString,
        dataType: "Json",
        success: function (data) {
            if (data.ResponseCode == 200) {
                if (data.Data.PurchaseMaster.length > 0) {
                    // $('#lblTotal').html(data.d.length);
                    console.log(data);
                    bindGetAllSRList(data.Data.PurchaseMaster);
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
    $("#gvDetailsList").html("<thead><tr><th>#</th><th>Sl.No</th><th>OrderNo</th><th>OrderDate</th><th>User Id</th><th>CustomerName</th><th>Store Name</th><th>Order Status</th><th>Total Qty</th><th>GrandAmount</th><th>Address</th><th>Payment Type</th><th>Order Type</th><th>Created By</th><th>Created Date</th></tr></thead>");
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

    for (var p = (pnumList - pagebtngroupList + 1); p <= pnumList; p++) {
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
        $("#gvDetailsList").append("<tr><td><a href='#myModal' role='button' data-toggle='modal' onclick='ShowOrderDetails(\"" + data[i].OrderNo + "\",\"" + data[i].OrderDate + "\",\"" + data[i].OrderStatus + "\",\"" + data[i].FirstName + "\",\"" + data[i].ContactNo + "\",\"" + data[i].UserId + "\",\"" + data[i].TotalAmount + "\",\"" + data[i].TaxAmount + "\",\"" + data[i].TotalQty + "\",\"" + data[i].PaymentType + "\",\"" + data[i].GrandAmount + "\",\"" + data[i].DiscountAmount + "\",\"" + data[i].ShippingAddress + "\",\"" + data[i].Comments + "\",\"" + data[i].StoreName + "\")'>View</a></td><td>" + (i + 1) + "</td><td>" + data[i].OrderNo + "</td><td>" + data[i].OrderDate + "</td><td>" + data[i].UserId + "</td> <td>" + data[i].FirstName + "</td><td>" + data[i].StoreName + "</td><td>" + data[i].OrderStatus + "</td><td>" + data[i].TotalQty + "</td><td>" + data[i].GrandAmount + "</td><td>" + data[i].Address + "</td><td>" + data[i].PaymentType + "</td><td>" + data[i].OrderType + "</td><td>" + data[i].CreatedBy + "</td><td>" + data[i].CreatedDate + "</td></tr>");
    }
}


function Reset() {
    $('#orderno').html('');
    $('#orderdate').html('');
    $('#orderstatus').html('');
    $('#customername').html('');
    $('#phoneno').html('');
    $('#emailid').html('');
    $('#totalamount').html('');
    $('#txtamount').html('');
    $('#totalqty').html('');
    $('#paymenttype').html('');
    $('#grandtotal').html('');
    $('#discountamount').html('');
    $('#shipaddress').html('');
    $('#comments').html('');
    $('#storename').html('');
    ClearDetailsTable();
}


function ShowOrderDetails(OrderNo, orderdate, orderstatus, customername, phoneno, emailid, totalamount, txtamount, totaqty, paymenttype
    , grandtotal, discountamount, shipaddress, comments, storename) {
    $.LoadingOverlay("show");

    Reset();
    var jsonString = '{"OrderNo": "' + OrderNo + '"}';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: BaseURL + "purchasedetails/get",
        data: jsonString,
        dataType: "Json",
        success: function (data) {
            if (data.ResponseCode == 200) {
                if (data.Data.PurchaseDetails.length > 0) {
                    $('#lbltotalDetails').html(data.Data.PurchaseDetails.length);
                    console.log(data);
                    $('#orderno').html(OrderNo);
                    $('#orderdate').html(orderdate);
                    $('#orderstatus').html(orderstatus);
                    $('#customername').html(customername);
                    $('#phoneno').html(phoneno);
                    $('#emailid').html(emailid);
                    $('#totalamount').html(totalamount);
                    $('#txtamount').html(txtamount);
                    $('#totalqty').html(totaqty);
                    $('#paymenttype').html(paymenttype);
                    $('#grandtotal').html(grandtotal);
                    $('#discountamount').html(discountamount);
                    $('#shipaddress').html(shipaddress);
                    $('#comments').html(comments);
                    $('#storename').html(storename);

                    bindGetAllSRList1(data.Data.PurchaseDetails);

                    $.LoadingOverlay("hide");
                    return false;
                }
                else {
                    ClearDetailsTable();
                    $('#lbltotalDetails').html('0');
                    $.LoadingOverlay("hide");
                    showMessage('danger', 'Error', 'Data Not Found...');
                    return false;
                }
            } else {
                // debugger;
                ClearClearDetailsTableTable();
                $('#lbltotalDetails').html('0');
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

function ClearDetailsTable() {
    $('#gvdetailsTable').empty();
    $("#gvdetailsTable").html("<thead><tr><th>#</th><th>Sl. No.</th><th>Product ID</th><th>Product Name</th><th>Product Desc</th><th>Model No</th><th>Brand</th><th>FrameShapeName</th><th>FrameSize</th><th>FrameStyle</th><th>FrameType</th><th>ProductType</th><th>Frame Color</th><th>MRP</th><th>DiscountType</th><th>DiscountPercentage</th><th>DiscountAmount</th><th>OfferMRP</th><th>BaseCost</th><th>Quanity</th><th>ItemStatus</th></tr></thead>");
}


// Bind Master Table
var minidataList1;
var totalrecordsList1;
var totalpagesList1;
var pnumList1;
var psizeList1;
var pagebtngroupList1;
var RegIdList1;
var serviceidList1;
var OperatorIdList1;

function bindGetAllSRList1(data) {
    $('#btnrowList1').html("");
    //$("#lbltotalDetails").html(data.d.length);
    totalrecordsList1 = data.length;
    pnumList1 = 1;
    psizeList1 = 3;
    pagebtngroupList1 = 3;
    totalpagesList1 = totalrecordsList1 / psizeList1;
    if ((totalpagesList1 % 1) > 0) {
        totalpagesList1 = totalpagesList1 + 1;
    }
    totalpagesList1 = Math.floor(totalpagesList1);
    var from = (pnumList1 - 1) * psizeList1;
    var to = (pnumList1) * psizeList1;
    minidataList1 = data;
    if (totalrecordsList1 < psizeList1) {
        to = totalrecordsList1;
    }

    bindwithpagingList1(psizeList1, data, from, to);

    if (totalpagesList1 < pagebtngroupList1)
        pagebtngroupList1 = totalpagesList1;
    var j = 1;
    for (var p = 1; p <= pagebtngroupList1; p++) {
        $('#btnrowList1').append("<input type='button' class='btn' value=" + j + " id='btn_aList" + j + "'   />");
        $('#btn_aList' + j).attr("onclick", "callpagingList1(" + j + "," + psizeList1 + ")");
        j++;
    }

    if (totalpagesList1 > pagebtngroupList1) {
        $('#btnrowList1').append("<input type='button' class='btn' value='>>' id='morebtnList" + j + "'   />");
        $('#morebtnList' + j).attr("onclick", "morepagingList1(" + j + "," + psizeList1 + "," + totalpagesList1 + ")");
    }

}
function morepagingList1(pnumList1, psizeList1, totalpagesList1) {
    callpagingList1(pnumList1, psizeList1);

    $('#btnrowList1').html("");
    var j = pnumList1;

    if (pnumList1 != pagebtngroupList1) {
        $('#btnrowList1').append("<input type='button' class='btn' value='<<' id='lessbtnList" + (pnumList1 - 1) + "'   />");
        $('#lessbtnList' + ((pnumList1 - 1))).attr("onclick", "lesspagingList1(" + (pnumList1 - 1) + "," + psizeList1 + ")");
    }
    var tot = pnumList1 + pagebtngroupList1 - 1;
    if (tot > totalpagesList1)
        tot = totalpagesList1;

    for (var p = pnumList1; p <= tot; p++) {
        $('#btnrowList1').append("<input type='button' class='btn' value=" + (j) + " id='btn_aList" + (j) + "'   />");
        $('#btn_aList' + (j)).attr("onclick", "callpagingList1(" + (j) + "," + psizeList1 + ")");
        j++;
    }
    if ((pnumList1 + pagebtngroupList1) < totalpagesList1) {
        $('#btnrowList1').append("<input type='button' class='btn' value='>>' id='morebtnList" + j + "'   />");
        $('#morebtnList' + j).attr("onclick", "morepagingList1(" + j + "," + psizeList1 + "," + totalpagesList1 + ")");
    }
}
function lesspagingList1(pnumList1, psizeList1) {
    callpagingList1(pnumList1, psizeList1);
    $('#btnrowList1').html("");
    var j = pnumList1;
    if (pnumList1 != (pagebtngroupList1)) {
        $('#btnrowList1').append("<input type='button' class='btn' value='<<' id='lessbtnList" + (j - pagebtngroupList1) + "'   />");
        $('#lessbtnList' + (j - pagebtngroupList1)).attr("onclick", "lesspagingList1(" + (j - pagebtngroupList1) + "," + psizeList1 + ")");
    }
    j++;

    for (var p = (pnumList1 - pagebtngroupList1 + 1); p <= pnumList1; p++) {
        $('#btnrowList1').append("<input type='button' class='btn' value=" + p + " id='btn_aList" + p + "'   />");
        $('#btn_aList' + p).attr("onclick", "callpagingList1(" + p + "," + psizeList1 + ")");
        j++;
    }
    if ((pnumList1 < totalpagesList1)) {
        $('#btnrowList1').append("<input type='button' class='btn' value='>>' id='morebtnList" + p + "'   />");
        $('#morebtnList' + p).attr("onclick", "morepagingList1(" + p + "," + psizeList1 + "," + totalpagesList1 + ")");
    }
}
function callpagingList1(pnumList1, psizeList1) {
    var from = (pnumList1 - 1) * psizeList1;
    var to = (pnumList1) * psizeList1;

    if (to > minidataList1.length)
        to = minidataList1.length;

    bindwithpagingList1(psizeList1, minidataList1, from, to);
}
function bindwithpagingList1(psizeList1, data, from, to) {
    ClearDetailsTable();
    for (var i = from; i < to; i++) {
        $("#gvdetailsTable").append("<tr><td><a href='#myModal' role='button' data-toggle='modal' onclick='ShowOrderDetails(\"" + data[i].OrderNo + "\",\"" + data[i].Id + "\")'>Edit</a></td><td>" + (i + 1) + "</td><td>" + data[i].ProductID + "</td><td>" + data[i].ProductName + "</td><td>" + data[i].ProductDesc + "</td> <td>" + data[i].ModelNo + "</td><td>" + data[i].BrandName + "</td><td>" + data[i].FrameShapeName + "</td><td>" + data[i].FrameSize + "</td><td>" + data[i].FrameStyle + "</td><td>" + data[i].FrameType + "</td><td>" + data[i].ProductType + "</td><td>" + data[i].Color + "</td><td>" + data[i].MRP + "</td><td>" + data[i].DiscountType + "</td><td>" + data[i].DiscountPercentage + "</td><td>" + data[i].DiscountAmount + "</td><td>" + data[i].OfferMRP + "</td><td>" + data[i].BaseCost + "</td><td>" + data[i].Quanity + "</td><td>" + data[i].ItemStatus + "</td></tr>");
    }
}