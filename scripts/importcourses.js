/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $.getJSON('http://localhost:8888/phpfiles/get_courses.php', function(data) {
        $.each(data, function(i, f) {
            var tblRow = "<tr><td> <A href='#' onclick=\"getPosts('" + f.name + "')\">" + f.name + " </A></td></tr>";
            $(tblRow).appendTo("#courses-div");
        });
    });
});

function getPosts(c) {

    document.getElementById("course-details-div").innerHTML = "";
    var course = c;

    var beginRow = "<table border=1 class='' style='font-color:white'>" +
            "<tr>" +
            "<th> Post </th>" +
            "<th> Date Posted </th>" +
            "<th> Posted By </th>" +
            "<th> Action </th>" +
            "</tr>";
    $(beginRow).appendTo("#course-details-div");


    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/get_posts.php",
        data: 'course=' + course,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
                var tblRow = "<tr>" +
                        "<td>" + f.desc + "</td>" +
                        "<td>" + f.dt + "</td>" +
                        "<td>" + f.fn + " " + f.ln + "</td>" +
                        "<td> <a href=\"#\" onclick=\"viewComments(" + f.pid + ")\">View Comments</a></td>"
                        "</tr>";

                $(tblRow).appendTo("#course-details-div");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });
    
    var endRow = "</table>";
    $(endRow).appendTo("#course-details-div");
    
}

function viewComments(pid) {
    document.getElementById("courses-div").innerHTML = "";
    document.getElementById("course-details-div").innerHTML = "";
    document.getElementById("comments-details-div").innerHTML = "";
    var postId = pid;

    var beginRow = "<table border=1 class='' style='font-color:white'>" +
            "<tr>" +
            "<th> Post </th>" +
            "<th> Date Posted </th>" +
            "<th> Posted By </th>" +
            "<th> Action </th>" +
            "</tr>";
    $(beginRow).appendTo("#comments-details-div");

    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/getPost.php",
        data: 'postId=' + postId,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
                var tblRow = "<tr>" +
                        "<td>" + f.desc + "</td>" +
                        "<td>" + f.dt + "</td>" +
                        "<td>" + f.fn + " " + f.ln + "</td>" +
                        "</tr>";

                $(tblRow).appendTo("#comments-details-div");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:8888/phpfiles/get_comments.php",
        data: 'postId=' + postId,
        success: function(data) {
            var parsedData = JSON.parse(data);
            $.each(parsedData, function(i, f) {
                var tblRow = 
                        "<p>Description: " + f.cont + "</p><br>" +
                        "<p>Date Replied: " + f.dateR + "</p><br>" +
                        "<p> Replied By: " + f.fn + " " + f.ln + "</p><br>";
                        
                $(tblRow).appendTo("#comments-details-div");
            });
        },
        error: function() {
            alert("Something wrong. Please try again.");
        }
    });
    
    var endRow = "<textarea name=\"content\" rows=\"6\" cols=\"35\"></textarea>" +
                        "<td> <a href=\"#\" onclick=\"submitReply(" + postId + ")\">Reply</a></td>" + "</table>";

    $(endRow).appendTo("#comments-details-div");
    
}