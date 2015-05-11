
var _$ = function () {
    var escapeHTML = function () {
        var replacements = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" };
        return text.replace(/[<>&"]/g, function (character) {
            return replacements[character];
        });
    },

    shuffleNumberArray = function (numberArray) {
        var numbers = numberArray.sort(function () { return Math.random() - 0.5 });
        return numbers;
    },

    generateRandomNumber = function (min, max) {
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    },

    getRandomItemFromArray = function (items) {
        var randomItem = items[Math.floor(Math.random() * items.length)];
        return randomItem;
    },

    generateRandomAlphaNum = function (len) {
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return rdmString.substr(0, len);
    },

    find = function (selector) {
        var el = document.querySelector(selector);
        return el;
    },

    findAll = function (selector) {
        var el = document.querySelectorAll(selector);
        return el;
    },

    findById = function (id) {
        var el = document.getElementById(id);
        return el;
    },

    serializeForm = function (formId) {
        var inputs = findAll('#' + formId + ' input');
        log('form', inputs);
        var length = inputs.length;
        var data = '';

        for (var i = 0; i < length; i++) {
            var input = inputs[i];
            var key = input.name;
            var value = encodeURI(input.value);

            if (length - 2 === i && inputs[i + 1].name === 'submit') {
                log('last one', input);
                return data;
            }
            data += key + '=' + value + '&';
        }
        return data;
    },

    getRequest = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        if (xhr.status === 200) {
            return xhr;
        } else {
            return false;
        }
    },

    getJson = function (url) {
        var request = getRequest(url);
        log('request', request);
        if (request) {
            var json = JSON.parse(request.responseText);
            return json;
        } else {
            return request.status + ' ' + request.statusText;
        }
    },

    // Ajax get and post functions
    ajax = function () {
        var get = function (url, success, failure) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || !failure) {
                        success(xhr);
                    } else if (failure) {
                        failure(xhr.status, xhr.statusText);
                    }
                }
            };
            xhr.send(null);
        },

        post = function (url, success, failure, data) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201 || !failure) {
                        success(xhr);
                    } else if (failure) {
                        failure(xhr.status, xhr.statusText);
                    }
                }
            }
            //var formData = new FormData(formElement);
            log('form data', data);
            xhr.send(data);
        },

        postPicture = function (url, success, failure, formData) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
           //xhr.setRequestHeader('Content-Type', 'multipart/form-data');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 201 || !failure) {
                        success(xhr);
                    } else if (failure) {
                        failure(xhr.status, xhr.statusText);
                    }
                }
            }
            //log('form data', );
            xhr.send(formData);
        };

        return {
            post: post,
            postPicture: postPicture,
            get: get
        };

    }();
 
    return {
        getJson: getJson,
        ajax: ajax,
        getRequest: getRequest,
        escapeHTML: escapeHTML,
        shuffleNumberArray: shuffleNumberArray,
        generateRandomNumber: generateRandomNumber,
        getRandomItemFromArray: getRandomItemFromArray,
        generateRandomAlphaNum: generateRandomAlphaNum,
        find: find,
        findAll: findAll,
        findById: findById,
        serializeForm: serializeForm
    };

}();


//var data = _$.getJson('/Api/Games');
//log('get json', data[0]);
$(document).ready(function () {
    //var getajax = _$.ajax.get('/Api/ballers/identity', getSuccess, getFailure);
    var ballerForm = document.getElementById('ballerForm');
    var submitButton = _$.findById('submit');

    var pictureForm = _$.findById('pictureForm');
    var uploadButton = _$.findById('upload');
    var fileInput = _$.findById('picture');
    var file = fileInput.files[0];

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        log('this button click', this);
        log('this event click', event);

        //var formData = new FormData(ballerForm);
        _$.ajax.post('/api/Ballers/create', postSuccess, postFail, _$.serializeForm(ballerForm.id));
        //log('form seralized', post.responseText);

    }, false);

    pictureForm.onsubmit = function () {
        //console.log(this);
        var formData = new FormData(this);
        formData.append('picture', file);

        _$.ajax.postPicture('/api/upload', pictureSuccess, postFail, formData);
        
        return false;
    }

    function postSuccess(xhr) {
        log('success response text', xhr.responseText);
        alertify.success('post was a success!');

        ballerForm.style.display = 'none';
        pictureForm.style.display = 'block';
    }
    function postFail(status, statusText) {
        log(status, statusText);
        alertify.error('post failed!! ' + statusText);
    }
    function pictureSuccess(xhr) {
        log('success response text', xhr.responseText);
        alertify.success('picture post was a success!');
    }


});
