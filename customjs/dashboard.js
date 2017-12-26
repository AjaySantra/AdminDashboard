"use strict";

/*
 * Name : dashboard-1.0.1.js
 * Company Name : tru2Spces
 * Project Name : tru2Spces
 * version : 1.0.0
 * Update Date :  06/09/2017
*/
// ============================================================================================

 //var BaseURL = 'http://13.59.52.2:8000/';
// var BaseURL = 'http://127.0.0.1:8000/';

function login() {
    $.LoadingOverlay("show");
    var UserId = $('#txtUsername').val();
    var Pass = $('#txtPassword').val();
    var jsonString = '{"UserId": "' + UserId + '","Password":"' + Pass + '"}';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url : BaseURL + "login",
        data : jsonString,
        dataType : "Json",
        success: function (data) {
            if (data.ResponseCode == '200') {
                // showMessage('success', 'Success', "Data has been saved successfully...!");
                window.location.href = "dashboard.html";
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

// Redirect if not Sign In
function pageRedirect() {
    window.location.href = "ErrorPage.html";
}

//Show toaster msg  send msg type , title and message as a parameter
function showMessage(valpriority, valTitle, valMessage) {
   $.toaster({ priority: valpriority, title: valTitle, message: valMessage }); // success , info , warning , danger
}