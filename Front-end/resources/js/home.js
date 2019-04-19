//Use for page loading later
// $(document).ready(function(){
//     $(document).ajaxStart(function(){
//       $(".loadPage").fadeIn("slow");
//       $(".loadPage").css("display", "block");
//     });
//     $(document).ajaxComplete(function(){
//       $(".loadPage").fadeOut("slow");  
//       $(".loadPage").css("display", "none");
//     });
// });


function displaylist(listnum, items){
	var checkList = document.getElementById(listnum);
	var items = document.getElementById(items);
	checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
	if (items.classList.contains('visible')){
		items.classList.remove('visible');
		items.style.display = "none";
	}
            
	else{
		items.classList.add('visible');
		items.style.display = "block";
	}
            
            
	}

	items.onblur = function(evt) {
	items.classList.remove('visible');
	}
}

function restrictions(temp)
    {
        document.getElementById('vegitarian').innerHTML = "";
        document.getElementById('vegan').innerHTML = "";
        document.getElementById('gluten').innerHTML = "";
        if(temp.vegetarian == true)
        {
            document.getElementById('vegitarian').innerHTML += '<p> Vegetarian: Yes</p>';
    
        }
        else if(temp.vegetarian == false)
        {
            document.getElementById('vegitarian').innerHTML += '<p> Vegetarian: No</p>';
        }
        if(temp.vegan == true)
        {
            document.getElementById('vegan').innerHTML += '<p> Vegan: Yes</p>';
        }
        else if(temp.vegan == false)
        {
            document.getElementById('vegan').innerHTML += '<p> Vegan: No</p>';
        }
        if(temp.glutenFree == true)
        {
            document.getElementById('gluten').innerHTML += '<p> Gluten Free: Yes</p>';
        }
        else if(temp.glutenFree == false)
        {
            document.getElementById('gluten').innerHTML += '<p> Gluten Free: No</p>';
        }
    }
    
    function recipeList(element)
    {
        var list = document.getElementById("ingredientsList");
        list.innerHTML = "";
        // console.log("HERERERE1"); 
        for(var i = 0; i < element.extendedIngredients.length; i++)
            {
                list.innerHTML += '<li>'+ element.extendedIngredients[i].name +'</li>'
                // console.log("HERERERE");    
                // console.log("INGREDIENTS: ", element.extendedIngredients[i].name, ", i: ", i);
            }
    }
    function displayMoreInfo(element) 
    {
        var xhttp = new XMLHttpRequest();
        console.log('function called')
        console.log('ID: ',element.id);
        var id= element.id;
       
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        // console.log(`url is: ${url}`);
        
        

        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var json = JSON.parse(this.response);            
            
            document.getElementById('ModalLabel').innerHTML = json.title;
            console.log("TITLE: ", json.title);
            document.getElementById('picture').src = json.image;
            document.getElementById('recipeSteps').innerHTML = '<strong>Instructions:</strong><br><p>'+ json.instructions +'</p>';
            document.getElementById('recipeTime').innerHTML = '<strong>Cook Time:</strong><br><p>Meal ready in: '+ json.readyInMinutes +' minutes</p>';
            
            restrictions(json);
            recipeList(json);
            
            
                        
        }
        
        }
        xhttp.open("GET", url,true);//, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "7d3874f610msh7daec34baac5e17p16884ajsn3e659ffc6182");
        xhttp.send();
        
    }

    //////Working////////////////////////////////////////////////////////////////////////////////////

    function stuff(element) 
    {   
        // if(card == undefined)
        // {
        //     card = "";
        // }
        console.log("TEST1")
        var xhttp1 = new XMLHttpRequest();
        var id= element.id;
        // console.log("1");
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        
        var id;
        // card += '<div class="container-fluid">';
        // card +=  '<div class="row">';
        // card += '<div class="card-deck">';
        // console.log("1");
        xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log("1");
            //console.log(this.response)
            var json = JSON.parse(this.response);            
            console.log("JSON: ", json);
            var cardStyle;
            if(json.instructions == null)
            {   
                // console.log("NO");
                // cardStyle = 'none';
                // generateCards(element, cardStyle);
            }
            else
            {
                cardStyle = 'visible';
                generateCards(element, cardStyle);
            }           
        }
        else {
            console.log("Something went wrong")
        }
        }
        xhttp1.open("GET", url,true);//, true);
        xhttp1.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp1.send();
    }


    function generateCards(response, style)
    {
        var cardStyle = style;
        var card = "";
        if(cardStyle == 'visible')
        {
            console.log("CARD TEST1: ", card);
            card += '<div class="card" style="width: 13rem" align="center"><div class="card__info-hover">';
            card += '<div class="card__ingred-info"><span class="card__ingred"> Matching Ingredients: ' +  response['usedIngredientCount'] + '</span>';
            card += '<span class="card__ingred"> Missing Ingredients: ' +  response['missedIngredientCount'] + '</span></div></div>';
            card +=  '<div class="card__img" style="background-image: url(\''+ response['image'] +'\')"></div>';
            card += '<a href="#" id='+ response.id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
            card += '<div class="card__img--hover" style="background-image: url(\''+ response['image'] +'\')">';
            card += '</div></a>';
            card += '<a href="#" id='+ response.id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
            card +=  '<div class="card__info"><h4 class="card__title">';
            // card +=  '<img class="card-img-top src='+ response[i]['image'];
            // card +=  '<h5 class="card-title">'; 
            card +=  response['title']; 
            card +=  '</h4></div></a></div>';
            console.log("CARD TEST2: ", card);  
            document.getElementById("recipes-location").innerHTML += card;   
            if(card == "undefined")
            {
                card = "";
            }
            
            // }
            // card+='</div></div></div>';

        }
    }





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function loadDoc() 
    {
        var xhttp = new XMLHttpRequest();
        var all_ingredients = document.getElementsByName('ingredients');
        var all_restrictions = document.getElementsByName('filter');
        var ingredients = "";
        var restrictions = "";
        var counter = 0;

        var ingTag = $('#tags').tagsinput('items');

        for(var i = 0; i <all_ingredients.length; i++)
        {
            
          if(all_ingredients[i].selected == true)
          {
            // console.log("i: ", all_ingredients[i].value);
            counter++;
            ingredients += all_ingredients[i].value + '%2C'
          }
        }
        for(var i = 0; i < ingTag.length; i++)
        {
            // console.log("j: ", ingTag[i]);
            counter++;
            ingredients += ingTag[i] + '%2C'
        }
        for(var i = 0; i < all_restrictions.length; i++)
        {
            restrictions += all_restrictions[i].value 
        }
        for(var i = 0; i <all_ingredients.length; i++)
        {
          if(all_ingredients[i].selected == true)
          {
            counter++;
            ingredients += all_ingredients[i].value + '%2C'
          }
        }

        if (counter == 0)
        {
            alert("Please select at least one ingredient to begin searching for recipes.");
            return false;
        }
        ingredients = ingredients.slice(0,-3);
        console.log(ingredients);
        // There will be a , in the end make sure you remove it
        base_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=2&ignorePantry=false&ingredients=";
        url = base_url + ingredients;
        console.log(`url is : ${url}`);
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
 
                response = JSON.parse(this.response); 
                for(var i = 0; i < response.length; i++)
                {
                
                    stuff(response[i]);
                    // card += '<article class="card" style="width: 12rem"><div class="card__info-hover">';
                    // card += '<div class="card__ingred-info"><span class="card__ingred"> Matching Ingredients: ' +  response[i]['usedIngredientCount'] + '</span>';
                    // card += '<span class="card__ingred"> Missing Ingredients: ' +  response[i]['missedIngredientCount'] + '</span></div></div>';
                    // card +=  '<div class="card__img" style="background-image: url(\''+ response[i]['image'] +'\')"></div>';
                    // card += '<a href="#" id='+ response[i].id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
                    // card += '<div class="card__img--hover" style="background-image: url(\''+ response[i]['image'] +'\')">';
                    // card += '</div></a>';
                    // card += '<a href="#" id='+ response[i].id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
                    // card +=  '<div class="card__info"><h4 class="card__title">';
                    // // card +=  '<img class="card-img-top src='+ response[i]['image'];
                    // // card +=  '<h5 class="card-title">'; 
                    // card +=  response[i]['title']; 
                    // card +=  '</h4></div></a></article>';
                    
                   
                    
                }
            }
        }
        
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp.send();
        $(".loadRecp").fadeIn();
        setTimeout(showRecipes, 2000);
    }

    
    function showRecipes()
    {
        $("#section-a").fadeOut();
        $(".loadRecp").fadeOut();
        $("#section-b").fadeIn();
        window.location.hash = "section-b";
        document.getElementById("client").value = "";
    }

    function newsearch()
    {
        $('.selectpicker').selectpicker('deselectAll');
        $("#section-b").fadeOut("slow");
        $("#section-a").fadeIn("slow");
        window.location.hash = "section-a";
    }
    
    function resetSearch()
    {
        $('.selectpicker').selectpicker('deselectAll');
    }