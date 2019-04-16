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
            document.getElementById('vegitarian').innerHTML += '<p> Vegitarian: Yes</p>';
    
        }
        else if(temp.vegetarian == false)
        {
            document.getElementById('vegitarian').innerHTML += '<p> Vegitarian: No</p>';
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
        //console.log('function called')
        //console.log(element.id);
        var id= element.id;
       
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        // console.log(`url is: ${url}`);
        // Next encode your ing_url using : encodeURI
        //ing_url = encodeURI(ing_url)
        // console.log(url);
        // do the http call.
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.response)
            var json = JSON.parse(this.response);            
            //console.log(json);
            // document.getElementById('zaiddemodisplay').innerHTML = json.vegetarian;
            document.getElementById('ModalLabel').innerHTML = json.title;
            document.getElementById('recipeSteps').innerHTML = '<p>'+ json.instructions +'</p>';
            document.getElementById('recipeTime').innerHTML = '<p>Meal Ready In: '+ json.readyInMinutes +' minutes.</p>';
            restrictions(json);
            recipeList(json);
                        
        }
        else {
            console.log("Something went wrong")
        }
        }
        xhttp.open("GET", url,true);//, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp.send();
    }

    function generateCards(response, card)
    {
        
        for(var i = 0; i < response.length; i++)
        {   
            
            card += '<div class="card"';
            card += 'style="">';
            card +=  '<img class="card-img-top" src='+ response[i]['image'] +'>';
            card +=  '<div class="card-body">';
            // card +=  '<img class="card-img-top src='+ response[i]['image'];
            card +=  '<h5 class="card-title">'; 
            card +=  response[i]['title']; 
            card +=  '</h5><p class="card-text">Used Ingredient Count: ';
            card +=  response[i]['usedIngredientCount'];
            card +=  '<br> Missed Ingredient Count: ';
            card +=  response[i]['missedIngredientCount'];
            card +=  '</p><btn id='+ response[i].id;
            card +=  ' href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">See More Information</btn></div></div>';    
            // card += '</div></div>';
            
            
        }
        card+='</div></div></div>';
        document.getElementById("recipes-location").innerHTML = card;  
    }
        
    // function getStyleInfo(card, id)
    // {
    //     var xhttp = new XMLHttpRequest();
    //     console.log("IN CARDSTYLE");
    //     var iD= id;
    //     console.log("cardStyle ID: ", iD);
        
    //     url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ iD+ "/information";
    //     xhttp.onreadystatechange = function() 
    //     {
    //         if (this.readyState == 4 && this.status == 200) 
    //         {
    //             console.log("HERE1");
    //             var json = JSON.parse(this.response);         
    //             if(json.instructions == null)
    //             {
    //                 style = "none";
    //                 generateCards(card, element, style);
    //             }
    //             else
    //             {
    //                 style = "visible";
    //                 generateCards(card, element, style);
    //             }
    //         }
        
    //     }
    //     xhttp.open("GET", url,true);//, true);
    //     xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
    //     xhttp.send();
    // }
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
        // console.log(ingredients);
        // There will be a , in the end make sure you remove it
        base_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=2&ignorePantry=false&ingredients=";
        url = base_url + ingredients;
        // console.log(`url is : ${url}`);
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var card = "";
                var id;
                card += '<div class="container-fluid">';
                card +=  '<div class="row">';
                card += '<div class="card-deck">';
                response = JSON.parse(this.response);
                id = response.id;
                generateCards(response, card);
             	console.log(card);
            }
        };
        
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp.send();
        $(".loadRecp").fadeIn();
        $(".loadRecp").css("display", "block");
        setTimeout(showRecipes, 2000);
    };

    function showRecipes()
    {
        $("#section-a").fadeOut();
        $(".loadRecp").fadeOut();
        $(".loadRecp").css("display", "none");
        $("#section-b").fadeIn();
        $("#section-b").css("display", "block");
        window.location.hash = "section-b";
    }

    function newsearch()
    {
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