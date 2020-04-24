$(document).ready(function () {
    $("#initial-btn").click(function () {
        initialData()
    })
});

function initialData() {

    for (let i = 0; i < urlData.length; i++) {
        urlSplit = urlData[i].split('/')
        fileName = urlSplit[urlSplit.length - 1]
        divContentFile = "<div class='col-md-12 content-file' id='file-" + fileName + "'>"
        divFileName = "<div class='col-md-12 file-name'><h3>" + fileName + "</h3></div>"
        
        data =  getData(urlData)
        lstCategories = getCategories(data)
        for (let y = 0; y < lstCategories.length; y++) {
            divCategory = "<div class='col-md-12 category'><div class='category-title' id='category-title-1'>"+lstCategories[y]+"</div></div>" 
        }

        $(".content-main").append(divContentFile + divFileName + divCategory + "</div>");
    }


}

function getCategories(data){
    arrCategories = []
    var allTextLines = data.split(/\r\n|\n/);
    for (let i = 1; i <= allTextLines.length; i++) {
        lineSplit = allTextLines[i].split(',')
        arrCategories.push(lineSplit[2])
    }
    return arrCategories
}

function processData(data) {
    var allTextLines = data.split(/\r\n|\n/);
    for (let i = 0; i <= allTextLines.length; i++) {
        console.log(allTextLines[i])
    }
}

function getData(urlData) {
    $.ajax({
        type: "GET",
        url: urlData,
        dataType: "text",
        success: function (data) {
            return data
        }
    });
}