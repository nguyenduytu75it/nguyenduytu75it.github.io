$(document).ready(function () {
    initialData()
});

var arr = []
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
        // console.log(objData)
        var arrFileName = Object.keys(objData)
        arrFileName.forEach(fileName => {
            let arrCategories = Object.keys(objData[fileName]);
            divContentFile = "<div class='col-md-12 content-file' id='file-" + fileName + "'>"
            divFileName = "<div class='col-md-12 file-name'><h3>" + fileName + "</h3></div>"
            divCategory = ""
            arrCategories.forEach(category => {
                divCategory += "<div class='col-md-12 category' id = '" + category
                    + "' onclick='generateTable(this)'><div class='category-title' id='category-title-1'>" + category + "</div></div>"
            });
            $(".content-main").append(divContentFile + divFileName + divCategory + "</div>");
        });
    }, 2000)

}


function progressData(data) {
    var allTextLines = data.split(/\r\n|\n/);
    let objCategory = {}
    let arrHeader = []

    arrHeader = allTextLines[0].split(',')

    for (let i = 0; i < allTextLines.length; i++) {
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
    console.log(objCategory)
    return objCategory

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
    arrLine = objData['biz.csv']['行動規範']
    trBody = ""
    arrLine.forEach(objLine => {
        tdBody = ""
        for (const property in objLine) {
            tdBody += "<td>"+ objLine[property] +"</td>"
        }
        trBody += "<tr>" + tdBody + "</tr>"
    });
    tbody= "<tbody>" + trBody + "</tbody>"
    table = "<table class='table'>" + tbody + "</table>"
    $(event).append("<div class='col-md-12 tbl-data'>"+table+"</div>")
}