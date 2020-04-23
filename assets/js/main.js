$( document ).ready(function() {
    $(".category-title").click(function(){
        console.log($(this).attr("id"))
        getData()
    })
});

function getData(){
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/nguyenduytu75it/nguyenduytu75it.github.io/master/data/data01.csv",
        dataType: "text",
        success: function(data) {
            processData(data);
        }
     });
}

function processData(data) {
    var allTextLines = data.split(/\r\n|\n/);
    for(let i = 0; i <= allTextLines.length; i++){
        console.log(allTextLines[i])
    }
}