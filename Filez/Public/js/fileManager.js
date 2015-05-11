$(function () {
    'use strict';

    var url = '/Home/Upload';
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
                                    // Uncomment the following to send cross-domain cookies:
                                    //xhrFields: {withCredentials: true},
                                    url: url
                                });
    var fileshtml = [];

    function appendImg(img) {
        fileshtml += '<div class="col-sm-3 col-md-2"><div class="thumbnail">';
        fileshtml += img + '</div></div>';
    }

    $('#file-input').on('change', function (e) {
        var files = e.target.files,
            filePanel = $('#filePanel');
        console.log(files);
        

        if (files.length > 0) {
            $.each(files, function (i, val) {
                console.log('value of file', val);
                loadImage(val,
                   function (img) {
                       console.log(img);
                       var thumb = $('<div/>').addClass('col-sm-3 col-md-2').html($('<div/>').addClass('thumbnail').html(img));
                       filePanel.append(thumb);
                   },
                   { maxWidth: 250 } // Options
                );

                //filePanel.append(html);
            });


        } else {
            loadImage(e.target.files[0],
                      function (img) {
                          console.log(img);
                          //var html =[];
                          //html += '<div class="col-sm-3 col-md-2"><div class="thumbnail">';
                          //filePanel.append(img);
                      },
                      {maxWidth: 250} // Options
                );
        }

      
});
// Load existing files by an initial ajax request to the server after page loads up
// This is done by a simple jQuery ajax call, not by the FIle Upload plugin.,
// but the results are passed to the plugin with the help of the context parameter: 
// context: $('#fileupload')[0] and the $(this)... call in the done handler. 
// With ajax.context you can pass a JQuery object to the event handler and use "this".
//$('#fileupload').addClass('fileupload-processing');
//$.ajax({
//    // Uncomment the following to send cross-domain cookies:
//    //xhrFields: {withCredentials: true},
//    url: url,
//    dataType: 'json',
//    context: $('#fileupload')[0]
//}).always(function () {
//    $(this).removeClass('fileupload-processing');
//}).done(function (result) {
//    $(this).fileupload('option', 'done')
//        .call(this, null, { result: result });
//});
});



$("document").ready(function () {
    
});
