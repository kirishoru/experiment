/*jslint browser: true, sloppy: true*/
/*global $*/

// list data array for filling in info box
var placeData = [];

// DOM Ready =============================================================
$(document).ready(function () {

    populateTable();
    // Delete place link click
    //$('#placeList').on('click', 'td a.linkdeleteplace', deletePlace);
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    //$.getJSON('/api/placelist', function (data) {
    $.getJSON('/api/posts', function (data) {

        // Stick our Place data array into a list variable in the global object
        placeData = data;
        pdate = new Date(this.timestamp*1000)
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            //tableContent += '<td><a href="#" class="linkshowplace" rel="' + new Date(this.timestamp*1000) + '" title="Show Details">' + new Date(this.timestamp*1000) + '</a></td>';
            tableContent += '<td><p>' + this.title + '</p></td>';
            tableContent += '<td><p>' + this.content.extended + '</p></td>';
            //tableContent += '<td><a href="#" class="linkdeleteplace" rel="' + this._id + '">delete</a></td>';
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
            url: '/api/deleteplace/' + $(this).attr('rel')
        }).done(function (response) {
            // Check for a successful response
			  if (response === 'OK') {} else {
                alert('Error: ' + response);
            }

            // Update the table
            populateTable();

        });

    } else {

        // If they said no to the confirm, do nothing
        return false;

    }

};