$(window).ready(function(){

var color;

setupLang();

});

function setupLang(){

	var lang = sessionStorage.getItem('langSess');

	if(typeof lang === "undefined" || lang === null){
		sessionStorage.setItem('langSess', "fr");
		lang = "fr";
	}

	$("body").load("pages/" + lang + ".html", function(){

		changeLang();
		changeColor();
		setupColor();
		setupStart();
		rideau();
		placementTitre();
		scrollNav();
		menu();
		projet();
		ergo();

	});

}

function changeLang(){

	$("#plus .lang").click(function(){

		var selectLang = $(this).attr("id");
		
		sessionStorage.setItem('langSess', selectLang);

		$("body").load("pages/" + selectLang + ".html", function(){
			changeLang();
			changeColor();
			setupColor();
			setupStart();
			rideau();
			placementTitre();
			scrollNav();
			menu();
			projet();
			ergo();
		});

	});

}

function changeColor(){

	var colorRBW = {
		name: "colorRBW",
		primary: "#3f51b5",
		primary_1: "#9E83E6",
		secondary: "#eb585d",
		secondary_1: "#FEA0A0",
		third: "white",
		contenu: "233, 228, 254",
		contenuTxt: "black"
	}

	var colorOrange = {
		name: "colorOrange",
		primary: "#FEAA2B",
		primary_1: "#FEC46D",
		secondary: "black",
		secondary_1: "#4D4D4D",
		third: "white",
		contenu: "254, 196, 109",
		contenuTxt: "black"
	}

	var colorNature = {
		name: "colorNature",
		primary: "#40A46F",
		primary_1: "#43DE7C",
		secondary: "#9B5B30",
		secondary_1: "#CD853D",
		third: "white",
		contenu: "244, 212, 170",
		contenuTxt: "black"
	}

	color = sessionStorage.getItem('colorSess');
	if(typeof color === "undefined" || color === null){
		sessionStorage.setItem('colorSess', JSON.stringify(colorRBW));
	}
	color = JSON.parse(sessionStorage.getItem('colorSess'));

	$("#imgMenu").attr("src", "img/menu_"+color.name+".png");

	$("#plus .theme").click(function(){

		var colorClick = $(this).attr("id");

		if(colorClick=="colorRBW"){
			sessionStorage.setItem('colorSess', JSON.stringify(colorRBW));
		}
		if(colorClick=="colorOrange"){
			sessionStorage.setItem('colorSess', JSON.stringify(colorOrange));
		}
		if(colorClick=="colorNature"){
			sessionStorage.setItem('colorSess', JSON.stringify(colorNature));
		}

		color = JSON.parse(sessionStorage.getItem('colorSess'));

		setupColor();

	});

}

function setupColor(){

//Couleur texte page
	$("body").css("color", color.third);
	$("a").css("color", color.third);
	$("span#info").css("color", color.secondary);

//Fond header
	$(".hautPage").css("background-color", color.primary);

//Titre
	$(".title").css("text-shadow", "10px 10px 0px " + color.secondary);

//Menu
	$("#imgMenu").attr("src", "img/menu_"+color.name+".png");
	
	$(".menu").css("border-bottom-color", color.primary);
	$(".maVie, .experiences, .projets").css("background-color", color.secondary);
	$(".maVie, .experiences, .projets").hover(function(){
		$(this).css("background-color", color.secondary_1);
	},function(){
		$(this).css("background-color", color.secondary);
	});
	$(".formations, .q_d, .plus").css("background-color", color.primary);
	$(".formations, .q_d, .plus").hover(function(){
		$(this).css("background-color", color.primary_1);
	}, function(){
		$(this).css("background-color", color.primary);
	});

//Contenu
	$("body").css("background-color", "rgba("+color.contenu+", 0.2)");
	$("#contenu").css("background-color", "rgb("+color.contenu+")");
	$("#contenu").css("color", color.contenuTxt);
	$("b").css("color", color.secondary);
	$("#tabComp td").css("color", color.secondary);

//Footer
	$("footer").css("border-top-color", color.primary);
	$("footer").css("background-color", color.secondary);

}

function setupStart(){

	$('body').find('*').hide();
	$('header').show();
	$('header').find('*').show();

	$('.hautPage').css("height", $(window).height()+"px");
	$('.menu').css("margin-top", ($(window).height()+10)+"px");

}

function rideau(){

	var largLigne = $(window).width() / 5;
	var hautLigne = $(window).height();
	var posX = 0;
	var delay = 1500;

	$('body').prepend("<div id='lignes'>");
	$('#lignes').append("<div class='l_blanc' id='0'></div>")
				.append("<div class='l_rouge' id='1'></div>")
				.append("<div class='l_blanc' id='2'></div>")
				.append("<div class='l_rouge' id='3'></div>")
				.append("<div class='l_blanc' id='4'></div>");

	//Gestion couleur rideau
	$(".l_blanc").css("background-color", color.third);
	$(".l_rouge").css("background-color", color.secondary);

	for (var i = 0; i < $("#lignes div").length; i++) {
		$("#lignes div").eq(i).css("left", posX + "px");
		$("#lignes div").eq(i).css("width", largLigne + "px");
		$("#lignes div").eq(i).css("height", hautLigne + "px");
		posX += largLigne;
		delay += i+80;
		if(i%2==0){
			$("#lignes #" + i).delay(delay).animate({bottom: "-=" + hautLigne + "px", height: "-=" + hautLigne + "px"}, 1500, function(){
				$(this).remove();
			});
		}else{
			$("#lignes #" + i).delay(delay).animate({top: "-=" + hautLigne + "px", height: "-=" + hautLigne + "px"}, 1500, function(){
				$(this).remove();
			});
		}
	}

}

function placementTitre(){

	var haut = $('.hautPage').height()/2 - $('.title').height()/2;
	$(".title").css('top', (haut+100)+'px');
	$(".menu ul").css('top', $('.hautPage').height()+'px');
	var larg = $('.hautPage').width()/2 - $('.title').width()/2;
	$(".title").css('left', larg+'px');

	$('.title').delay(1500).animate({top: haut+"px"}, 1000, function(){
		$('body').find('*').show();
		$('#contenu').hide();
		$(".contenu-prj").hide();
		$("#btnMenu").animate({left:"10px"}, 500);
	});

}

function scrollNav(){

	var px = $('.hautPage').height();

	$(window).scroll(function(){

		var haut = ($('.hautPage').height()/2) - ($('.title').height()/2);

		if(px-$(this).scrollTop()>80){
			$('.hautPage').css("height", (px-$(this).scrollTop())+"px");
			$('.title').css("font-size", (130-(58/(px-80))*($(this).scrollTop()))+"px"); //130 valaur en px depart, 58 difference jusqu'a 72px
			$(".title").css('top', (haut-5)+'px');
		}
		else{

			$('.hautPage').css("height", "83px");
			$('.title').css("font-size", "72px");
			$(".title").css('top', (haut-5)+'px');

		}


	});

}

function menu(){

	$(".menu-top div, .menu-bottom div").hover(function(){
		$(this).css("cursor", "pointer");
	}, function(){
		$(this).css("cursor", "auto");
	});

	var newId = "";
	var	page;
	var etatPage;

	$('.js-scroll').on('click', function() {

		page = $(this).attr('href');

		$('html, body').animate( { scrollTop: ($(page).offset().top-70) }, 750 );

		$("#contenu").css({opacity: 0});
		$("#contenu").hide(400);

		etatPage=1;
		newId="";

		return false;

	});

	$(".menu-top div, .menu-bottom div").click(function(){

		if(newId==$(this).attr("class")&&etatPage!=1){

			page = "#menu";
			$('html, body').animate( { scrollTop: ($(page).offset().top-50) }, 750 );

			$("#contenu").css({opacity: 0});
			$("#contenu").hide(400);

			etatPage=1;

		}
		else{
		
			$("#contenu").show(400, function(){
				$("#contenu").animate({opacity: 1}, 400);

				page = "#contenu";
				$('html, body').animate( { scrollTop: ($(page).offset().top-83) }, 750 );

			});

			etatPage=0;

		}

		newId = $(this).attr("class");

		for (var i = 0; i < $("#contenu").children($("div")).length; i++){
			$("#contenu").children($("div")).eq(i).removeClass($("#contenu").children($("div")).eq(i).attr("class"));
			$("#contenu").children($("div")).eq(i).removeAttr("style");
			if($(this).attr("class")==$("#contenu").children($("div")).eq(i).attr("id"))
				$("#contenu").children($("div")).eq(i).addClass("active");
			else
				$("#contenu").children($("div")).eq(i).addClass("hidden");
		}

		return false;
	});
}

function ergo(){

	$("#contenu table").wrap("<div style='overflow-x:auto;'></div>");

}

function projet(){

	$(".myPrj").click(function(){

		var id = $(this).attr("id");

		if($("div#" + id).is(":visible")){
			$("p#" + id + " img").attr("src", "img/flechebas.png");
		}
		else{
			$("p#" + id + " img").attr("src", "img/flechehaut.png");
		}

    	$("div#" + id).fadeToggle(500, function(){
    		if(!$("div#" + id).is(":visible")){
				$("p#" + id).css("margin-bottom", "10px");
			}
			else{
				$("p#" + id).css("margin-bottom", "0px");
			}
    	});

		$('html, body').animate( { scrollTop: ($("#" + id).offset().top-83) }, 750);

	});

}