import React from 'react' 
import './app.css'
import{BrowserRouter, Route} from 'react-router-dom'
import Main from './main/Main'



const App = () => {

    return (
       <BrowserRouter>
            <div className="container">
                <Route path="/" component={Main} />
            </div>
            
       </BrowserRouter>
    )
}

export default App