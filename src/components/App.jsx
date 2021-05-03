import React from 'react' 
import './app.css'
import{BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom'
import Main from './main/Main'
import Card from './card/Card'
import EditPage from './EditPage/EditPage'



const App = () => {

    return (
      
            <div className="container">
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/card/:postid?" component={Card} />
                  <Route path="/edit/:gradientId?" render={ () => <EditPage /> } /> 
                  <Route path='*' render={ () => <div>404 NOT FOUND</div>} />
                </Switch>
                
            </div>
            
      
    )
}

export default App