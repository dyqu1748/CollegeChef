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
    // function clearModal()
    // {
    //     console.log("IN HERE");

    //     // $("#picture").html(" ");
    //     $("#recipeSteps").html(" ");
    //     $("#dietaryRestrictions").html(" ");
    //     $("#ingredientsList").html(" ");
    // }

    function stuff(element, card) 
    {   
        
        console.log("TEST1")
        var xhttp1 = new XMLHttpRequest();
        var id= element.id;
        // console.log("1");
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        
        var card = "";
        var id;
        
        xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var json = JSON.parse(this.response);            
            console.log("JSON: ", json);
            var cardStyle;
            if(json.instructions == null)
            {   
                cardStyle = 'none';
                generateCards(element, card, cardStyle);
            }
            else
            {
                cardStyle = 'visible';
                generateCards(element, card, cardStyle);
            }           
        }
        
        }
        xhttp1.open("GET", url,true);//, true);
        xhttp1.setRequestHeader("X-RapidAPI-Key", "7d3874f610msh7daec34baac5e17p16884ajsn3e659ffc6182");
        xhttp1.send();
    }

    function generateCards(response, card, style)
    {
        var cardStyle = style;
        if(cardStyle == 'visible')
        {
            console.log("CARD TEST1: ", card);
            card += '<div class="col-auto mb-3">';
            card += '<div class="card" style="width: 18rem">';
            card +=  '<img class="card-img-top" src='+ response['image'] +'>';
            card +=  '<div class="card-body">';
            card +=  '<h5 class="card-title">'; 
            card +=  response['title']; 
            card +=  '</h5><p class="card-text">Used Ingredient Count: ';
            card +=  response['usedIngredientCount'];
            card +=  '<br> Missed Ingredient Count: ';
            card +=  response['missedIngredientCount'];
            card +=  '</p><btn id='+ response.id;
            card +=  ' href="#" class="btn info2" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">See More Information</btn></div></div>'; 
            card += '</div>';
            
            console.log("CARD TEST2: ", card);    
            if(card == "undefined")
            {
                card = "";
            }

            document.getElementById("recipes-location").innerHTML += card; 
            
            return card;
        }
    }
        
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
            counter++;
            ingredients += all_ingredients[i].value + '%2C'
          }
        }
        for(var i = 0; i < ingTag.length; i++)
        {
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
  
        base_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=8&ranking=2&ignorePantry=false&ingredients=";
        url = base_url + ingredients;
        console.log(`url is : ${url}`);
   
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var card1 = "";
                // var id;
               
                card1 += '<div class="container-fluid mt-4">';
                card1 +=  '<div class="row justify-content-center">';
                // card1 += '<div class="card-deck">';
                // console.log("pre for\n");
                response = JSON.parse(this.response);
                for(var i = 0; i < response.length; i++)
                {   
                    stuff(response[i], card1);
                    
                    console.log("CARD TEST 3: ", card1);
                    
                }
                card1+='</div></div>';
                document.getElementById("recipes-location").innerHTML += card1;
                card1 = "";  
            }   console.log("FINAL CARD TEST: ", card1);
            card1 = "";
        };
        
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "7d3874f610msh7daec34baac5e17p16884ajsn3e659ffc6182");
        xhttp.send();
        $(".loadRecp").fadeIn();
        $(".loadRecp").css("display", "block");
        setTimeout(showRecipes, 2000);
    };

    function showRecipes()
    {
        // document.
        $("#section-a").fadeOut();
        $(".loadRecp").fadeOut();
        $(".loadRecp").css("display", "none");
        $("#section-b").fadeIn();
        $("#section-b").css("display", "block");
        window.location.hash = "section-b";
    }

    function newsearch()
    {
        document.getElementById("recipes-location").innerHTML = "";
        document.getElementById("tags").value = "";
        $("#recipes-location").html("");
        $('.selectpicker').selectpicker('deselectAll');
        $("#section-b").fadeOut("slow");
        $("#section-b").css("display", "none");
        $("#section-a").fadeIn("slow");
        $("#section-a").css("display", "block");
        window.location.hash = "section-a";
    }
    
    function resetSearch()
    {
        $('.selectpicker').selectpicker('deselectAll');
    }