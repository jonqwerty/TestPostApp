import React from 'react' 
import './app.css'
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Main from './main/Main'
import Card from './card/Card'



const App = () => {

    return (
       <BrowserRouter>
            <div className="container">
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/card/:postid?" component={Card} />
                  <Route path='*' render={ () => <div>404 NOT FOUND</div>} />
                </Switch>
                
            </div>
            
       </BrowserRouter>
    )
}

export default App