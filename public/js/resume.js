var header = document.querySelector('header');
var section = document.querySelector('section');
var scrollList = document.getElementById('scroll-list');
var requestURL = '../../public/js/resume2.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();
request.onload = function () {
    var resumeFeedText = request.response;
    var resumeFeed = JSON.parse(resumeFeedText);
    populateHeader(resumeFeed);
    showHeroes(resumeFeed);
};


function populateHeader(jsonObj) {
    var myCard = document.createElement('div');
    myCard.setAttribute("class", "card mb-3");

    var myCardHeader = document.createElement('h2');
    myCardHeader.setAttribute("class", "card-header");
    myCardHeader.textContent = jsonObj.career;

    var myCardBody = document.createElement('p');
    myCardBody.setAttribute("class", "card-body");
    myCardBody.textContent = jsonObj.description;

    header.appendChild(myCard);
    myCard.appendChild(myCardHeader);
    myCard.appendChild(myCardBody);
}

function showHeroes(jsonObj) {
    var chrono = jsonObj.chrono;
    for (var i = 0; i < chrono.length; i++) {
        var myCard = document.createElement('div');
        myCard.setAttribute("class", "card mb-3");
        myCard.setAttribute("id", "list-item-" + i);

        var scrollListItem = document.createElement('a');
        scrollListItem.setAttribute("class", "list-group-item list-group-item-action small");
        scrollListItem.setAttribute("href", "#list-item-" + i);
        scrollListItem.textContent = chrono[i].title;

        var myCardHeader = document.createElement('h5');
        myCardHeader.setAttribute("class", "card-header");
        myCardHeader.textContent = chrono[i].title + " (" + chrono[i].dates + ")";

        var myCardBody = document.createElement('div');
        myCardBody.setAttribute("class", "card-body");

        var myPara1 = document.createElement('em');
        myPara1.textContent = chrono[i].company + " - " + chrono[i].location;
        myPara1.setAttribute("class", "card-text small");

        var myPara3 = document.createElement('p');
        myPara3.textContent = chrono[i].description;
        myPara3.setAttribute("class", "card-text");

        var myList = document.createElement('ul');
        myList.setAttribute("class", "card-text");

        var chronoDetails = chrono[i].items;
        for (var key in chronoDetails) {
            if (!chronoDetails.hasOwnProperty(key)) continue;
            var obj = chronoDetails[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;

                var listItemTitle = document.createElement('strong');
                listItemTitle.textContent = prop;

                var listItem = document.createElement('p');
                listItem.textContent = obj[prop];

                myList.appendChild(listItemTitle);
                myList.appendChild(listItem);
            }
        }

        scrollList.appendChild(scrollListItem);
        myCard.appendChild(myCardHeader);
        myCard.appendChild(myCardBody);
        myCardBody.appendChild(myPara1);
        myCardBody.appendChild(myPara3);
        myCardBody.appendChild(myList);
        section.appendChild(myCard);
    }
    (function($) {
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    })
})(jQuery);
}