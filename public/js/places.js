/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var placeData = [];

// DOM Ready =============================================================
$(document).ready(function () {

    populateTable();
    // Delete place link click
    $('#placeList').on('click', 'td a.linkdeleteplace', deletePlace);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/placelist', function (data) {

        // Stick our Place data array into a list variable in the global object
        placeData = data;
        pdate = new Date(this.timestamp*1000)
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowplace" rel="' + new Date(this.timestamp*1000) + '" title="Show Details">' + new Date(this.timestamp*1000) + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteplace" rel="' + this.rate + '">' + this.rate + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteplace" rel="' + this.comment + '">' + this.comment + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteplace" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#placeList').html(tableContent);
    });
};

// Delete Place
function deletePlace(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this place?');

    // Check and make sure the Place confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/deleteplace/' + $(this).attr('rel')
        }).done(function (response) {

            // Check for a successful (blank) response
            if (response.msg === '') {} else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    } else {

        // If they said no to the confirm, do nothing
        return false;

    }

};