$(document).ready(function () {
    initialData()
});

var objData = new Object()

function initialData() {

    for (let i = 0; i < urlData.length; i++) {
        getData(urlData[i], function (data) {
            let urlSplit = urlData[i].split('/')
            let fileName = urlSplit[urlSplit.length - 1]
            let object = progressData(data)

            // divContentFile = "<div class='col-md-12 content-file' id='file-" + fileName + "'>"
            // divFileName = "<div class='col-md-12 file-name'><h3>" + fileName + "</h3></div>"
            // lstCategories = getCategories(data)
            // divCategory = ""

            // lstCategories.forEach(category => {
            //     divCategory += "<div class='col-md-12 category' id = '" + category
            //         + "' onclick='generateTable(this)'><div class='category-title' id='category-title-1'>" + category + "</div></div>"
            // });

            // $(".content-main").append(divContentFile + divFileName + divCategory + "</div>");

            objData[fileName] = object
        })
    }

    setTimeout(function () {
        console.log(objData['data01.csv'])
    }, 2000)

}


function progressData(data) {
    var allTextLines = data.split(/\r\n|\n/);
    let = arrCategories = []
    let objCategory = {}
    let arrHeader = []

    arrHeader = allTextLines[0].split(',')

    for (let i = 1; i < allTextLines.length; i++) {
        lineSplit = allTextLines[i].split(',')
        let objLine = {}

        for (let y = 0; y < arrHeader.length; y++) {
            objLine[arrHeader[y]] = lineSplit[y].replace(/"/g, "")
        }

        category = lineSplit[2].replace(/"/g, "")

        if (category in objCategory) {
            objCategory[category].push(objLine)
        }
        else {
            objCategory[category] = [objLine]
        }
    }

    return objCategory

}

function getCategories(data) {
    let = arrCategories = []
    var allTextLines = data.split(/\r\n|\n/);
    for (let i = 1; i <= allTextLines.length - 1; i++) {

        lineSplit = allTextLines[i].split(',')
        arrCategories.push(lineSplit[2].replace(/"/g, ""))
    }
    return removeDulicate(arrCategories)
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

function removeDulicate(arrData) {
    var uniqueNames = [];
    $.each(arrData, function (i, item) {
        if ($.inArray(item, uniqueNames) === -1) uniqueNames.push(item);
    });
    return uniqueNames
}

function generateTable(event) {

    console.log($(event).attr("id"))
    $(event).append("<div class='col-md-12 tbl-data'><h3>abc</h3></div>")
}