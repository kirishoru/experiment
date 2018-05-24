var header = document.querySelector('header');
var section = document.querySelector('section');
var scrollList = document.getElementById('scroll-list');
var requestURL = 'js/resume2.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();
request.onload = function () {
    var superHeroesText = request.response;
    var superHeroes = JSON.parse(superHeroesText);
    populateHeader(superHeroes);
    showHeroes(superHeroes);
};


function populateHeader(jsonObj) {
    var myCard = document.createElement('div');
    myCard.setAttribute("class", "card mb-3");

    var myCardHeader = document.createElement('h2');
    myCardHeader.setAttribute("class", "card-header");
    myCardHeader.textContent = jsonObj.squadName;

    var myCardBody = document.createElement('p');
    myCardBody.setAttribute("class", "card-body");
    myCardBody.textContent = 'Hometown: ' + jsonObj.homeTown + ' // Formed: ' + jsonObj.formed;

    header.appendChild(myCard);
    myCard.appendChild(myCardHeader);
    myCard.appendChild(myCardBody);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj.members;
    for (var i = 0; i < heroes.length; i++) {
        var myCard = document.createElement('div');
        myCard.setAttribute("class", "card mb-3");
        myCard.setAttribute("id", "list-item-" + i);

        var scrollListItem = document.createElement('a');
        scrollListItem.setAttribute("class", "list-group-item list-group-item-action");
        scrollListItem.setAttribute("href", "#list-item-" + i );
        scrollListItem.textContent = heroes[i].name;

        var myCardHeader = document.createElement('h4');
        myCardHeader.setAttribute("class", "card-header");
        myCardHeader.textContent = heroes[i].name;

        var myCardBody = document.createElement('div');
        myCardBody.setAttribute("class", "card-body");

        var myPara1 = document.createElement('p');
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara1.setAttribute("class", "card-text");

        var myPara2 = document.createElement('p');
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara2.setAttribute("class", "card-text");

        var myPara3 = document.createElement('p');
        myPara3.textContent = 'Superpowers:';
        myPara3.setAttribute("class", "card-text");

        var myList = document.createElement('ul');
        myList.setAttribute("class", "card-text small");

        var superPowers = heroes[i].powers;
        for (var j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        scrollList.appendChild(scrollListItem);
        myCard.appendChild(myCardHeader);
        myCard.appendChild(myCardBody);
        myCardBody.appendChild(myPara1);
        myCardBody.appendChild(myPara2);
        myCardBody.appendChild(myPara3);
        myCardBody.appendChild(myList);
        section.appendChild(myCard);
    }
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    })
}