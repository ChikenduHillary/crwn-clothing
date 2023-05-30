import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GlobalStyle } from './global.styles';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  
  componentDidMount() {
      const { checkUserSession } = this.props;
      checkUserSession();
  } 
  

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignIn />)}  />
            <Route exact path='/signup' render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignUp />)}  />
            <Route exact path='/checkout' component={CheckoutPage} />
          </Switch>
      </div>
    );
  }
}

const mapSateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: ()=> dispatch(checkUserSession())
})

export default connect(mapSateToProps, mapDispatchToProps)(App);