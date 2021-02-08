// dealing with searching
const searchBtn= document.getElementById('search-btn');

searchBtn.addEventListener('click', (e)=> {
    document.getElementById('food-items').innerHTML='';
    const searchInput= document.getElementById('search-input');
    const searchStr= searchInput.value;
    const foodItems= fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchStr)
    .then(res=> res.json())
    .then(data=> showItems(data.meals))
    .catch(err=> {
        document.getElementById('error').style.display='block';    
    });
})

// showing all items 
const showItems= (items)=> {
    document.getElementById('error').style.display='none';
    document.getElementById('single-food-sec').style.display='none';
    const itemsDiv= document.getElementById('food-items');
    items.forEach(item=> {
        const newItem= `
        <div class="food-item" id="food-item" data-name='${item.strMeal}'>
        <img src="${item.strMealThumb}" alt="">
        <h4>${item.strMeal}</h4>
        </div>
        `;
        const wrapper= document.createElement('a');
        wrapper.innerHTML=newItem;
        itemsDiv.appendChild(wrapper);
    })
}

// clicking any single item 
const container= document.getElementById('food-items');
container.addEventListener('click', (e)=> {
    const foodItem= e.target.parentNode;
    const name= foodItem.getAttribute('data-name');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+name)
    .then(res=> res.json())
    .then(data=> displaySingleFood(data));
})

// displaying specific item 
const displaySingleFood= (data)=> {
    document.getElementById('single-food-sec').style.display='block';
    const foodObj= data.meals[0];
    document.getElementById('food-img').setAttribute('src',foodObj.strMealThumb );
    document.getElementById('food-title').innerText= foodObj.strMeal;
    const ingredientsUl= document.getElementById('ingredients');
    ingredientsUl.innerHTML='';

    const foodArr= Object.entries(foodObj);
    foodArr.forEach(([key, value])=> {
        if(key.includes('strIngredient') && value){
            const li= document.createElement('li');
            li.innerText= value;
            ingredientsUl.appendChild(li);
        }
    })
}


