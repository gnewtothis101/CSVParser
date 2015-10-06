/*=========================================
=            UTILITY FUNCTIONS            =
=========================================*/

(function() {
    'use strict';
})();

function toObject(arr, headerKey) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) {
        if (!isNaN(arr[i])) {
            arr[i] = parseInt(arr[i]);
        }
        if (arr[i] !== undefined) {
            rv[headerKey[i]] = arr[i];
        }
    }
    return rv;
}

utilityFunctions.prototype.getDateForUpload = function() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date1 = time.getDate();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + "-" + month + "-" + date1 + "." + hour + ":" + minutes + ":" + seconds;
};

function utilityFunctions() {}

utilityFunctions.prototype.getFormattedDate = function(filenameDate) {
    var date = new Date(filenameDate*1000);
    return date.toString();
};

utilityFunctions.prototype.formatRow = function(dataRow, headerKey) {
    dataRow[dataRow.length - 1] = dataRow[dataRow.length - 1].replace('\r', '');
    return toObject(dataRow, headerKey);
};

utilityFunctions.prototype.formatFilename = function(filename) {
    return filename.split('.')[0];
};


module.exports = new utilityFunctions();
