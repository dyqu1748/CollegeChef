//functions to test:

//showRecipes
//generateCards
//API


//API Response Global Variable (Sample)


var response1 = {id:"105783",image: "https://spoonacular.com/recipeImages/1057583-312x231.jpg",imageType: "jpg",likes: 1,missedIngredientCount: 2};
var response2 = { instructions:"test",vegetarian: true, vegan: false, glutenFree: false, dairyFree: true, veryHealthy: false, cheap: false, veryPopular: false, sustainable: false}

var all_ingredients = ["beef","flour","tomato"];
var all_restrictions = [false, false, false, false];
var all_restrictions2 = [true, true, true, true];



/*
function APITest()
{
	var xhttp = new XMLHttpRequest();
    // Used for checking if user has no ingredients selected
    ingredients = "";

    // Place all ingredients into string; increments counter for every ingredient added
    for(var i = 0; i <3; i++)
    { 
        ingredients += all_ingredients[i] + '%2C'
      
    }
    var test = 0;


    // Check if user has at least 1 ingredient added

    ingredients = ingredients.slice(0,-3);
    base_url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=2&ignorePantry=false&ingredients=";
    url = base_url + ingredients;
    console.log(`url is : ${url}`);
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
        	test = 1;

        	console.log(test);
            response = JSON.parse(this.response); 
            console.log(response);
            for(var i = 0; i < response.length; i++)
            {
                // Card creation begins here, creation is handled in the functions above
                //checkQuality(response[i],all_restrictions);
                
            }
        }
    }
    
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-RapidAPI-Key", "601fdf014cmsh9774814f1ee4e3dp10ecadjsn1de8cb4425cc");
    xhttp.send();
    console.log(test);

}

*/

function generateCardsTest(response, style)
{
    var cardStyle = style;
    var card = "";
    if(cardStyle == 'visible')
    {
        //console.log("CARD TEST1: ", card);
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
        //console.log("CARD TEST2: ", card);  
        //document.getElementById("recipes-location").innerHTML += card;   
        // Last check to ensure recipe card was correctly created
        if(card == "undefined")
        {
            card = "";
        }

    }
    if(card == "")
    {
    	return -1;
    }
    else
    {
    	return 1;
    }
    

}

function checkQualityTest(element, restrictions,topass) 
{   
    
        if(element.instructions == null || (restrictions[0] == true && element.vegetarian == false) || (restrictions[1] == true && element.glutenFree == false) || (restrictions[2] == true && element.vegan == false))
        {   
            //console.log("Not Valid Recipe");
            return -1;
        }
        else
        {
            cardStyle = 'visible';
           generateCardsTest(topass, cardStyle);
        	return 1;
        }

             

}



//Test API call

describe("Test Check Quality", function() {
 	
    //This will be called before running each spec
    beforeEach(function() {


		test1 = checkQualityTest(response2,all_restrictions,response1);
		test2 = checkQualityTest(response2,all_restrictions2,response1);

    });
     it("Test a recipe that matches preferences", function() {
     	expect(test1).toEqual(1);

    }); 
     it("Test a recipe that does not match preferences", function() {
     	expect(test2).toEqual(-1);

    }); 
    /* 
    *  Example Test Case for Addition Operation
    */
});

describe("Test Generate Cards", function() {
 	
    //This will be called before running each spec
    beforeEach(function() {


		test1 = generateCardsTest(response1,"visible");
		test2 = generateCardsTest(response1,"hidden");


    });
     it("Test if no cards are generated if cardstyle is not visible", function() {
 	expect(test2).toEqual(-1);

    }); 
     it("Test if cards are generated have a not null value", function() {
     	expect(test1).not.toEqual(-1);

    }); 

});


