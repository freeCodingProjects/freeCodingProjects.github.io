/*
*Thank you stackoverflow you the bestest
*/
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function readLocalFile(fname, response){
	var file = new XMLHttpRequest();
	file.open("GET", fname,false);
	file.onreadystatechange = function () {
		if (file.readyState === 4){
			if (file.status === 200 || file.status == 0){
				response(file.responseText);
			}
		}
	}
	file.open("GET", fname,false);
	file.send(null);
}



String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};



/*
 * Colors selected langauge differently
*/
function colorSelected(language){
	let thead = $("#projects > thead > tr").first().find("th");
	thead.each(function(){
		//$(this).addClass("horizontal");
		$(this).addClass("selected");
		if (this.textContent == language) {
			$(this).removeClass("horizontal");
			
			
		} else {
			$(this).removeClass("selected");
			$(this).addClass("horizontal");
		}
	})
	console.log(thead);


}


/*
 * Given a language edits project table
 * to show projects in given language
*/
function showProject(language){
	//delete old tbody
	//var tableBody = $("#projects > tbody");
	$("#projects > tbody").empty();

	colorSelected(language);

	//read local data and update table on get
	readLocalFile("./projects/projectFinder.csv", function(response){
		//2D array of csv file
		//var table = document.getElementById("projects")
		var tableBody = document.getElementById("projects").getElementsByTagName("tbody")[0];
		var data = $.csv.toArrays(response)
		var fieldNames = data[0];
		for (var i = 1; i < data.length; i++){
			if (data[i][0] === language){
				var row = document.createElement("tr");
				
				var cell = document.createElement("td");
				cell.setAttribute("colspan", "5")
				cell.innerHTML = "{0}".formatUnicorn(data[i][1]);
				//cell.appendChild(document.createTextNode(data[i][1]))
				console.log(cell);
				row.appendChild(cell);

				cell = document.createElement("td");
				cell.setAttribute("class", "projects-td-clickable")
				cell.setAttribute("colspan", "5")
				cell.innerHTML = "{0}".formatUnicorn(data[i][2]);
				row.appendChild(cell);

				cell = document.createElement("td");
				cell.setAttribute("class", "projects-td-clickable")
				cell.setAttribute("colspan", "5")
				fname = data[i][3].split("/");
				fname = fname[fname.length-1]
				cell.innerHTML = "<a href ={0} download>{1}".formatUnicorn(data[i][3], fname);
				row.appendChild(cell);
				/*//console.log(cell);
				for(var j = 1; j < data[i].length; j++){
					var cell = document.createElement("td");
					cell.appendChild(document.createTextNode(data[i][j]))
					row.appendChild(cell);
					console.log(cell);
				}*/
				tableBody.appendChild(row);

				
			}
		
		}


		//table.appendChild(tableBody);
	});
	//console.log(data);



}

