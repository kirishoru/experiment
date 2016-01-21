/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var posts = [];

// DOM Ready =============================================================
$(document).ready(function () {
    populateTable();
});

// Functions =============================================================
function populateTable() {
    var postContent = '';
    $.getJSON('/api/posts', function (data) {
        posts = data;
        console.log(data)
        for (var i = 0; i < posts.length; i++) {
            postContent += '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">';
            postContent += '<div class="panel panel-default">';
            postContent += '<div class="panel-heading bc-0-3" role="tab" id="heading' + [i] + '">';
            postContent += '<h4 class="panel-title">';
            postContent += '<a class="clearfix collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + [i] + '" aria-expanded="false" aria-controls="collapse' + [i] + '">';
            postContent += '<div class="col-xs-6 text-left">' + posts[i].title + '</div>';
            postContent += '<div class="col-xs-6 text-right">' + new Date(posts[i].publishedDate).toDateString() + '</div>';
            postContent += '</a>';
            postContent += '</h4>';
            postContent += '</div>';
            postContent += '<div id="collapse' + [i] + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + [i] + '">';
            postContent += '<div class="panel-body">';
            postContent += '<div class="col-sm-12">';
            postContent += '<p class="desc">' + posts[i].content.extended + '</p>';
            postContent += '</div>';
            postContent += '</div>';
            postContent += '</div>';
            postContent += '</div>';
        };
        $('#postFeed').html(postContent);
    })
};
