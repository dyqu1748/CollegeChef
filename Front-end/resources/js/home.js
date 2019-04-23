    // Used for checking if no recipe cards are created when user searches for recipes
    var counterCards = 0;

    // Display if recipe meets dietary restriction on the recipe modal
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

    // Display ingredients of recipe
    function recipeList(element)
    {
        var list = document.getElementById("ingredientsList");
        list.innerHTML = "";
        for(var i = 0; i < element.extendedIngredients.length; i++)
            {
                list.innerHTML += '<li>'+ element.extendedIngredients[i].name +'</li>'
            }
    }

    //Create modal containing the recipe and its instructions when user clicks on a recipe card
    function displayMoreInfo(element) 
    {
        var xhttp = new XMLHttpRequest();
        console.log('function called')
        console.log('ID: ',element.id);
        var id= element.id;
       
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        
        document.getElementById('ModalLabel').innerHTML = "";
        document.getElementById('picture').src = "";
        document.getElementById('recipeSteps').innerHTML = "";
        document.getElementById('recipeTime').innerHTML = "";
        document.getElementById("ingredientsList").innerHTML = "";
        

        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var json = JSON.parse(this.response);  
            var recpImage = "";          
            
            document.getElementById('ModalLabel').innerHTML = json.title;
            console.log("TITLE: ", json.title);
            if (json.image == undefined || json.image.includes('https://spoonacular.com/recipeImages/627393') || json.image.includes('https://spoonacular.com/recipeImages/139394') || json.image.includes('https://spoonacular.com/recipeImages/698170') || json.image.includes('https://spoonacular.com/recipeImages/1079688') || json.image.includes('https://spoonacular.com/recipeImages/962037') || json.image.includes('https://spoonacular.com/recipeImages/968871'))
            {
                recpImage ='../resources/img/no_img_found_2.jpg';
            }
            else
            {
                recpImage = json.image;
            }
            document.getElementById('picture').src = recpImage;
            document.getElementById('recipeSteps').innerHTML = '<strong>Instructions:</strong><br><p>'+ json.instructions +'</p>';
            document.getElementById('recipeTime').innerHTML = '<strong>Cook Time:</strong><br><p>Meal ready in: '+ json.readyInMinutes +' minutes</p>';
            
            restrictions(json);
            recipeList(json);
                  
        }
        }
        xhttp.open("GET", url,true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "7d3874f610msh7daec34baac5e17p16884ajsn3e659ffc6182");
        xhttp.send();
    }

    // Filters out recipes that don't have instruction and recipes that don't meet the user's dietary restriction(s)
    function checkQuality(element, restrictions) 
    {   
        console.log("TEST1")
        var xhttp1 = new XMLHttpRequest();
        var id= element.id;
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ id+ "/information"
        
        var id;
        xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log("1");
            //console.log(this.response)
            var json = JSON.parse(this.response);            
            console.log("JSON: ", json);
            var cardStyle;
            // Recipe instruction and dietary restriction check
            if(json.instructions == null || (restrictions[0] == true && json.vegetarian == false) || (restrictions[1] == true && json.glutenFree == false) || (restrictions[2] == true && json.vegan == false))
            {   
                console.log("Not Valid Recipe");
            }
            else
            {
                cardStyle = 'visible';
                generateCards(element, cardStyle);
                counterCards = counterCards + 1;
            }           
        }
        else {
            console.log("Something went wrong")
        }
        }
        xhttp1.open("GET", url,true);
        xhttp1.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp1.send();
    }
     
    // Creates recipe cards
    function generateCards(response, style)
    {
        var cardStyle = style;
        var card = "";
        if(cardStyle == 'visible')
        {
            console.log("CARD TEST1: ", card);
            var recpImg = ""
            if (response['image'].includes('https://spoonacular.com/recipeImages/962537') || response['image'].includes('https://spoonacular.com/recipeImages/627393') || response['image'].includes('https://spoonacular.com/recipeImages/139394') || response['image'].includes('https://spoonacular.com/recipeImages/968871') || response['image'].includes('https://spoonacular.com/recipeImages/698170') || response['image'].includes('https://spoonacular.com/recipeImages/1079688') || response['image'].includes('https://spoonacular.com/recipeImages/962037'))
            {
                recpImg = '../resources/img/no_img_found_2.jpg';
            }
            else
            {
                recpImg = response['image'];
            }
            card += '<div class="card" style="width: 13rem" align="center"><div class="card__info-hover">';
            card += '<div class="card__ingred-info"><span class="card__ingred"> Matching Ingredients: ' +  response['usedIngredientCount'] + '</span>';
            card += '<span class="card__ingred"> Missing Ingredients: ' +  response['missedIngredientCount'] + '</span></div></div>';
            card +=  '<div class="card__img" style="background-image: url(\''+ recpImg +'\')"></div>';
            card += '<a href="#" id='+ response.id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
            card += '<div class="card__img--hover" style="background-image: url(\''+ recpImg +'\')">';
            card += '</div></a>';
            card += '<a href="#" id='+ response.id + ' class="card_link" data-toggle="modal" data-target="#exampleModal" onclick="displayMoreInfo(this)">';
            card +=  '<div class="card__info"><h4 class="card__title">';
            card +=  response['title']; 
            card +=  '</h4></div></a></div>';
            console.log("CARD TEST2: ", card);  
            document.getElementById("recipes-location").innerHTML += card;   
            // Last check to ensure recipe card was correctly created
            if(card == "undefined")
            {
                card = "";
            }

        }
    }


    function recipeSearch() 
    {
        //Reset cards and card counter every time a new search is made 
        document.getElementById("recipes-location").innerHTML = "";
        counterCards = 0;

        var ref = firebase.database().ref("users");
        var CurrentUser = firebase.auth().currentUser;
        var uID = CurrentUser.uid;

        ref.once("value").then(function(snapshot){
            var veget = snapshot.child(uID).child('veg').val();
            var gf = snapshot.child(uID).child('gluten_free').val();
            var vegan = snapshot.child(uID).child('vegan').val();
            var pesca = snapshot.child(uID).child('pesc').val();

        
        var all_restrictions = [veget, gf, vegan, pesca]; 
        var xhttp = new XMLHttpRequest();
        var all_ingredients = document.getElementsByName('ingredients');
        var ingredients = "";
        // Used for checking if user has no ingredients selected
        var counter = 0;

        var ingTag = $('#tags').tagsinput('items');

        // Place all ingredients into string; increments counter for every ingredient added
        for(var i = 0; i <all_ingredients.length; i++)
        { 
          if(all_ingredients[i].selected == true)
          {
            counter++;
            ingredients += all_ingredients[i].value + '%2C'
          }
        }

        // Place all ingredients into string; increments counter for every ingredient added
        for(var i = 0; i < ingTag.length; i++)
        {
            counter++;
            ingredients += ingTag[i] + '%2C'
        }

        // Check if user has at least 1 ingredient added
        if (counter == 0)
        {
            alert("Please select at least one ingredient to begin searching for recipes.");
            return false;
        }
        ingredients = ingredients.slice(0,-3);
        console.log(ingredients);
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
                    // Card creation begins here, creation is handled in the functions above
                    checkQuality(response[i],all_restrictions);
                    
                }
            }
        }
        
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
        xhttp.send();
        // Loading animation
        $(".loadRecp").fadeIn();
        setTimeout(showRecipes, 2000);
        })
    }

    
    function showRecipes()
    {
        console.log(counterCards);
        // Check if no cards were created; resets search if so
        if (counterCards == 0){
            alert("Sorry, we weren't able to find any recipes with the ingredients you entered. This may be due to any dietary restriction(s) you may have. Please try again with different ingredients.");
            $(".loadRecp").fadeOut("fast");
            resetSearch();
        }
        // Display created cards if search was successful
        else
        {
            $("#section-a").fadeOut();
            $(".loadRecp").fadeOut();
            $("#section-b").fadeIn();
            window.location.hash = "section-b";
        }
    }

    // Brings back in dropdown menus and tag search bar for a new search
    function newsearch()
    {
        resetSearch();
        $("#section-b").fadeOut("slow");
        $("#section-a").fadeIn("slow");
        window.location.hash = "section-a";
    }
    
    // Resets values of dropdown menus and tag search bar
    function resetSearch()
    {
        $("#tags").tagsinput('removeAll');
        $('.selectpicker').selectpicker('deselectAll');
    }