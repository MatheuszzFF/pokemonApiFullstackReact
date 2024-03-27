
import { PokemonApiProvider } from './contexts'
import "./index.css"
import { Home } from './pages/Home'
import { ThemeProvider } from 'styled-components'

const theme = {
 
    main: {
      colors: {
        backgroundColor: "#232323",
        darkTheme1: "#2C2C2C",
        darkTheme2: "#1E1E1E",
      }
    },
    pokemon: {
        homeCard: "#1E1E1E",
        types: {
            bug: {
              color:"#92BC2C",
            },
            electric: {
             color: "#F2D94E"
            },
            fire: {
              color: "#FBA54C"
            },
            flying: {
              color: "#A1BBEC"
            },
            grass: {
              color: "#5FBD58"
            },
            ice: {
              color: "#75D0C1"
            },
            normal: {
              color: "#A0A29F"
            },
            water: {
              color: "#539DDF"
            },
            poison: {
              color: "#B763CF"
            },
            dark:{
              color: "#595761"
            },
            dragon:{
              color: "#0C69C8"
            },
            fairy: {
              color: "#EE90E6"
            },
            fighting: {
              color: "#D3425F"
            },
            ghost: {
              color: "#5F6DBC"
            },
            ground:{
              color: "#DA7C4D"
            },
            psychic: {
              color: "#FA8581"
            },
            rock:{
              color: "#C9BB8A"
            },
            steel: {
              color: "#5695A3"
            },
        }
    }
     
  
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <PokemonApiProvider>
        <Home/> 
      </PokemonApiProvider>
    </ThemeProvider>

  )
}

export default App
