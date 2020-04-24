$(document).ready(function () {
        initialData()
});

function initialData() {

    for (let i = 0; i < urlData.length; i++) {
        getData(urlData[i], function (data) {

            urlSplit = urlData[i].split('/')
            fileName = urlSplit[urlSplit.length - 1]
            divContentFile = "<div class='col-md-12 content-file' id='file-" + fileName + "'>"
            divFileName = "<div class='col-md-12 file-name'><h3>" + fileName + "</h3></div>"
            lstCategories = getCategories(data)
            divCategory = ""

            lstCategories.forEach(category => {
                divCategory += "<div class='col-md-12 category'><div class='category-title' id='category-title-1'>" + category + "</div></div>"
            });

            $(".content-main").append(divContentFile + divFileName + divCategory + "</div>");
        })


    }


}

function getCategories(data) {
    let = arrCategories = []
    var allTextLines = data.split(/\r\n|\n/);
    for (let i = 1; i <= allTextLines.length - 1; i++) {
        lineSplit = allTextLines[i].split(',')
        arrCategories.push(lineSplit[2].replace('"',""))
    }
    return arrCategories
}

function getData(urlData, callback) {
    $.ajax({
        type: "GET",
        url: urlData,
        dataType: "text",
        success: function (data) {

            callback(data.trim())
        }
    });
}