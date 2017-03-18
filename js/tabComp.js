$(window).ready(function(){

	var competences = {

		"HTML" : "4",
		"CSS" : "3",
		"PHP" : "4",
		"JS" : "3",
		"JQUERY" : "3",
		"NODEJS" : "1",
		"EXPRESS" : "3",
		"SOCKETIO" : "3",
		"MONGODB" : "2,5",
		"C" : "2,5",
		"C#" : "2,5",
		"C++" : "1",
		"ARDUINO" : "1",
		"WINDOWS OS" : "1",
		"MYSQL" : "2,5",
		"ORACLE" : "2,5",
		"PGADMIN" : "2,5",
		"UML" : "3,5",
		"MERISE" : "2"
	}

	var i = 1;

	$("#formations").append("<h2>Compétences");
	$("#formations").append("<table id='tabComp'>");

	$.each(competences, function(name, value){
		if(i==0){
			$("#tabComp").append("<tr><td class='name'>" + name + "</td><td><img src='img/etoile/" + value + ".png'></td></tr>");
			i = 1;
		}
		else{
			$("#tabComp").append("<tr id='pair'><td id='pair' class='name'>" + name + "</td><td id='pair'><img src='img/etoile/" + value + ".png'></td></tr>");
			i = 0;
		}
	});

});