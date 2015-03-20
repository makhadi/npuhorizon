/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


   $(document).ready(function()  {
		       var people = [];
			//alert("hiii");
			  $.getJSON('http://localhost:8888/phpfiles/backup_homepageprofdata.php', function(data){
		  // $.getJSON('http://localhost/pserver/backup_homepageprofdata.php', function(data) {
		       $.each(data, function(i, f) {  
		        var tblRow = "<tr>" + "<td>" + "<img "
			                     + "src='" + "data:image/jpg;base64,"
			                     + f.image + "'/>" + "</td>" +
		           "<td> <A href='blog.html?profid=" +f.profid+ "'>" + f.p_name + " </A> </td>" + "<td>" + f.department + "</td>" + "<td> <a href='mailto:" +f.email+ "'>" + f.email + "</a></td>" + "</tr>"
		         
		           $(tblRow).appendTo("#profile"); 
		     });
		
		   });
		
		}); 
		