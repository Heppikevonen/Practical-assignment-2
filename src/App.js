import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

const URL = 'https://thecocktaildb.com/api/json/v1'
const APIKEY = '1'

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [criteria, setCriteria] = useState('random.php')
  const [cocktail, setCocktail] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])
  const [searchword, setSearchword] = useState('')

  function search(e) {
    e.preventDefault()
    if (searchword != '') {
      setCriteria('search.php?s=' + searchword)
    } else {
      alert("No search criteria given")
    }
  }

  useEffect(() => {
    const address = URL + '/' + APIKEY + '/' + criteria

    axios.get(address)
      .then((response) => {
        console.log(response.data.drinks)
        setIsLoaded(true)
        if (response.data.drinks != null) {
          setCocktail(response.data.drinks[0])
          setIngredients([response.data.drinks[0].strIngredient1, response.data.drinks[0].strIngredient2, response.data.drinks[0].strIngredient3, response.data.drinks[0].strIngredient4, response.data.drinks[0].strIngredient5, response.data.drinks[0].strIngredient6, response.data.drinks[0].strIngredient7, response.data.drinks[0].strIngredient8, response.data.drinks[0].strIngredient9, response.data.drinks[0].strIngredient10, response.data.drinks[0].strIngredient11, response.data.drinks[0].strIngredient12, response.data.drinks[0].strIngredient13, response.data.drinks[0].strIngredient14, response.data.drinks[0].strIngredient15].filter(item => item !== "" && item !== null))
          setMeasures([response.data.drinks[0].strMeasure1, response.data.drinks[0].strMeasure2, response.data.drinks[0].strMeasure3, response.data.drinks[0].strMeasure4, response.data.drinks[0].strMeasure5, response.data.drinks[0].strMeasure6, response.data.drinks[0].strMeasure7, response.data.drinks[0].strMeasure8, response.data.drinks[0].strMeasure9, response.data.drinks[0].strMeasure10, response.data.drinks[0].strMeasure11, response.data.drinks[0].strMeasure12, response.data.drinks[0].strMeasure13, response.data.drinks[0].strMeasure14, response.data.drinks[0].strMeasure15].filter(item => item !== "" && item !== null))
        } else {
          alert("Cocktail not found")
        }
      }).catch(error => {
        setError(error)
        alert(error)
      })
  }, [criteria])

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <form onSubmit={search}>
          <input type="text"
            onChange={e => setSearchword(e.target.value)} />
          <button>Search</button>
        </form>
        <h1>Cocktail of the day</h1>
        <h2>{cocktail.strDrink}</h2>
        <h3>Glass</h3>
        <p>{cocktail.strGlass}</p>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
        <ul>
          {ingredients.map((item, i) => (
            <li key={uuid()}>{measures[i]} {item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
