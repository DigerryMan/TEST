const lista = ["Samochód sportowy", "Książka kucharska", "Wielka Brytania",
    "Deska surfingowa", "Złota rybka", "Zimowa Olimpiada", "Podręcznik szkolny",
    "Stolik kawowy", "Komputer osobisty", "Słoneczna plaża", "Zamek na piasku",
    "Mleko i ciastka", "Wyspa tropikalna", "Skarpetki i buty", "Kwiaty doniczkowe",
    "Film science fiction", "Kosmiczny statek", "Chłodnica samochodowa", "Skórzana kurtka",
    "Kosmiczna stacja", "Kapelusz detektywa", "Lody truskawkowe", "Bilet na koncert",
    "Włoska pizza", "Królewski pałac", "Wspólne mieszkanie", "Ogrodowy grill",
    "Tajemnicza teczka", "Bananowy milkshake", "Wodospad Niagara", "Płaszcz przeciwdeszczowy",
    "Telewizor LCD", "Nocne niebo", "Kołnierz futrzany", "Pomarańczowy sok",
    "Zestaw narzędziowy", "Wieloryb błękitny", "Szkolna tablica", "Portfel skórzany",
    "Drewniana ławka", "Zestaw do makijażu", "Butelka szampana", "Mapa świata", "Rower górski",
    "Kamera filmowa", "Zegar ścienny", "Kanapa skórzana", "Przyjaciółki na zakupach",
    "Karta kredytowa", "Kosmiczna przygoda", "Bawełniana koszula", "Pociąg ekspresowy",
    "Owocowa sałatka", "Żaglowiec", "Czekoladowy tort", "Kosmiczna stacja kosmiczna",
    "Piramida egipska", "Stacja kolejowa", "Pizza pepperoni", "Wielka inwestycja"];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}




var haslo = lista[getRandomInt(lista.length)];
haslo = haslo.toUpperCase();

var haslo1 = ""; 
var ilePomylek = 0;
var MAX_ILE_POMYLEK = 8;
var ileTrafien = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var lost = new Audio("lost.mp3");
var pjak = new Audio("pjak.wav");

for (i = 0; i < haslo.length; i++)
{
    if (haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
    else haslo1 = haslo1 + "-";
}


function wypiszHaslo()
{
    document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

var litery = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ"
function start()
{
    var trescDiva = "";

    for (i = 0; i < 35; i++)
    {
        var element = "lit" + i;
        trescDiva = trescDiva + '<div class="litera" onclick="sprawdz(' +i+ ')" id="' +element+ '">' + litery.charAt(i) + '</div>';
        if (i % 7 == 6) trescDiva = trescDiva + '<div style="clear: both;" > </div>';

    }


    document.getElementById("alfabet").innerHTML = trescDiva;


    wypiszHaslo();
}

String.prototype.ustawZnak = function (miejsce, znak)
{
    if (miejsce > this.length - 1 || miejsce < 0) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}

function sprawdz(nr)
{
    if (nr == 21)
        pjak.play();

    var byla = false;
    for (i = 0; i < haslo.length; i++)
    {
        if (haslo.charAt(i) == litery.charAt(nr))
        {
            byla = true;
            haslo1 = haslo1.ustawZnak(i, litery.charAt(nr));
            ileTrafien++;
        }
    }

    var element = "lit" + nr;
    if (byla)
    {
        
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        yes.play();

        wypiszHaslo();
    }
    else
    {
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        no.play();

        ilePomylek++;
        if (ilePomylek <= MAX_ILE_POMYLEK) {
            var source = '<img src="img/s' + ilePomylek + '.jpg" />';
            document.getElementById("szubienica").innerHTML = source;
            
        }

        else //PRZEGRANA
        {
            lost.play();
            document.getElementById("szubienica").innerHTML = '<img src="img/przegrana.jpg" />';
            document.getElementById("alfabet").innerHTML = "Porażka! Prawidłowe hasło to: " + haslo +
                '<br/><br/> <span class="reset" onclick="location.reload()"> JESZCZE RAZ? </span>';
        }
    }

    if (haslo == haslo1) //WYGRANA
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + haslo +
            '<br/><br/> <span class="reset" onclick="location.reload()"> JESZCZE RAZ? </span>';
}