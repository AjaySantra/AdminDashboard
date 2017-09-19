
/*
 * Name : Login-1.0.1.js
 * Company Name : tru2Spces
 * Project Name : tru2Spces
 * version : 1.0.0
 * Update Date :  06/09/2017
*/

// ============================================================================================

var BaseURL = 'http://18.220.133.177:8000/'


function login(){
    var UserId = $('#txtUsername').val();
    var Pass = $('#txtPassword').val();

    if (UserId == 'admin' && Pass == 'admin')
    {
        window.location.href = "http://tru2specs.bitballoon.com/dashboard";
    }
    else{
        showMessage('danger', 'Error', 'Invalid User id and Password...');
    }
}


// function Login() {
//     var UserId = $('#txtUsername').val();
//     var Pass = $('#txtPassword').val();
//     $.ajax({
//         method: "POST",
//         contentType: "application/json; charset=utf-8",
//         url: BaseURL + "login",
//         data: '{"UserId": "' + UserId + '","Password":"' + Pass + '"}',
//         dataType: "json",
//         success: function (data) {
//             if (data.ResponseCode == '200') {
//                 alert(data);
//                 window.location.href = "dashboard.html";
//                 return false;
//             }
//             else {
//                 alert(data);
//                 // showMessage()
//                 return false;
//             }
//         },
//         error: function (result) {
//             console.log(result.status)
//         }
//     })
// }

// Redirect if not Sign In
function pageRedirect() {
    window.location.href = "ErrorPage.html";
}

//Show toaster msg  send msg type , title and message as a parameter
function showMessage(valpriority, valTitle, valMessage) {
    // toastr.error(valMessage, 'Inconceivable!')
    
   $.toaster({ priority: valpriority, title: valTitle, message: valMessage }); // success , info , warning , danger
   // alert(valMessage);
}
