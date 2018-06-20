$(document).ready(function () {

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-21878389-2', 'auto');
    ga('send', 'pageview');


    $('#jp').change(function () {
        if ($(this).val() === "2") {
            $('.jp7').css('display', 'inline-block');
        } else {
            $('.jp7').css('display', 'none');
        }
    });

    $('button').click(function () {
        clearResults();
        let $measurements = 0;
        let $bodyFat1 = 0;

        let $age = +$('#age').val();
        let $weight = +$('#weight').val();
        let $chest = +$('#chest').val();
        let $abdominal = +$('#abdominal').val();
        let $thigh = +$('#thigh').val();
        let $subscap = +$('#subscap').val();
        let $tricep = +$('#tricep').val();
        let $suprail = +$('#suprail').val();
        let $midaxil = +$('#midaxil').val();

        function barChrt() {
            let barHeight = 50;
            let zults = [{
                "FM": Math.round(($weight * $bodyFat1), 0) / 100,
                "LM": Math.round(($weight - ($weight * $bodyFat1) / 100) * 100) / 100
            }];
            let x = d3.scale.linear().domain([0, (zults[0].LM + zults[0].FM)]).range([0, $('.results').width()]);
            let chart = d3.select(".chartBar").attr("width", $('.results').width()).attr("height", barHeight + 20);
            let groups = chart.selectAll("g").data(zults).enter().append("g");
            let Frects = groups.append("rect");
            let Lrects = groups.append("rect");
            let Ftext = groups.append("text");
            let Ltext = groups.append("text");

            Frects.attr("y", 0).attr("x", 0).attr("width", 0).attr("height", barHeight).attr("fill", "#60117D")
                .transition().attr("width", function () {
                return x(zults[0].FM);
            }).duration(750).delay(100);

            Lrects.attr("y", 0).attr("x", 0).attr("width", 0).attr("height", barHeight).attr("fill", "#FF6500")
                .transition().attr("width", function () {
                return x(zults[0].LM);
            }).attr("x", function () {
                return x(zults[0].FM) + 1;
            }).duration(750).delay(100);

            Ftext.attr("x", 5).attr("y", (barHeight / 2) + 35).text("FM: " + zults[0].FM + "lbs").attr("dy", ".35em");

            Ltext.attr("x", $('.results').width() - 90).attr("y", (barHeight / 2) + 35).text("LM: " + zults[0].LM + "lbs").attr("dy", ".35em").attr("id", "lm");
//			Ltext.attr("x", function () {return x(zults[0].FM) + 6;}).attr("y", (barHeight / 2) + 35).text("LM: " + zults[0].LM + "lbs").attr("dy", ".35em").attr("id", "lm");

        }


        if ($('#mf').val() === "1") { //MALE
            if ($('#jp').val() === "2") { //JP7
                //using measurements 12,18,9,7,20,6,15, with age 38 and weight 176; results bf%:13.76 fm:24.30lbs
                $measurements = $chest + $abdominal + $thigh + $subscap + $tricep + $suprail + $midaxil;
                $bodyFat1 = Math.round((4.95 / (1.112 - (0.00043499 * $measurements) + (0.00000055 * (Math.pow($measurements, 2)) - (0.00028826 * $age))) - 4.5) * 10000) / 100;
                $('.results').append("<div class='bf'><p>Body Fat: " + $bodyFat1 + "%</p></div>");
                barChrt();
            } else { //JP3
                //using measurements 12,18,9, with age 38 and weight 176; results bf%:12.71 fm:22.44lbs
                $measurements = $chest + $abdominal + $thigh;
                $bodyFat1 = Math.round((4.95 / (1.10938 - (0.0008267 * $measurements) + (0.0000016 * (Math.pow($measurements, 2)) - (0.0002574 * $age))) - 4.5) * 10000) / 100;
                $('.results').append("<div class='bf'><p>Body Fat: " + $bodyFat1 + "%</p></div>");
                barChrt();
            }
        } else { //FEMALE
            if ($('#jp').val() === "2") { //JP7
                //using measurements 12,18,9,7,20,6,15, with age 38 and weight 176; results bf%:13.76 fm:24.30lbs
                $measurements = $chest + $abdominal + $thigh + $subscap + $tricep + $suprail + $midaxil;
                $bodyFat1 = Math.round((4.95 / (1.097 - (0.00046971 * $measurements) + (0.00000056 * (Math.pow($measurements, 2)) - (0.00012828 * $age))) - 4.5) * 10000) / 100;
                $('.results').append("<div class='bf'><p>Body Fat: " + $bodyFat1 + "%</p></div>");
                barChrt();
            } else { //JP3
                //using measurements 12,18,9, with age 38 and weight 176; results bf%:12.71 fm:22.44lbs
                $measurements = $chest + $abdominal + $thigh;
                $bodyFat1 = Math.round((4.95 / (1.0994921 - (0.0009929 * $measurements) + (0.0000023 * (Math.pow($measurements, 2)) - (0.0001392 * $age))) - 4.5) * 10000) / 100;
                $('.results').append("<div class='bf'><p>Body Fat: " + $bodyFat1 + "%</p></div>");
                barChrt();
            }
        }

    });

    $('#btn2').click(clearResults);

});

function clearResults() {
    $('.bf').remove();
    $('svg g').remove();
    $('svg svg').remove();
}

// const MarkovChain = require('markovchain');

// require(['markovchain'], function (MarkovChain) {
//     //foo is now loaded.
// });

// define(function (require) {
//     var MarkovChain = require('markovchain');
// });

// define(['require', 'markovchain'], function (require) {
//    var MarkovChain = require('markovchain');
// });

// require(['require', 'markovchain'], function (require) {
//     var MarkovChain = require('markovchain');
// });

// define(function (require) {
//     //Notice the space between require and the arguments.
//     var MarkovChain = require ('markovchain');
// });

myRes = $.ajax({
    url: "../../public/js/res.txt",
    dataType: 'text',
    success: function (data) {
        myRes = data;
    },
    error: function () {
        alert("error");
    }
});

// myGen = new MarkovChain(myRes);

// console.log(myRes);

$('#btnTMP').click(function () {
    console.log("!");
    // console.log(myGen.start().end().process())
});