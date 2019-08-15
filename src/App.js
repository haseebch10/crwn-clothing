import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components.jsx';
import {auth, createdUserProfileDocument} from './firebase/firebase.utils.js';
import {connect} from 'react-redux';  
import {setCurrentUser} from './redux/user/user.actions.js';

class App  extends React.Component {

  unsubscribeFromAuth= null;

  componentDidMount() {
    const {setCurrentUser} = this.props;


    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=> {
     if(userAuth){
      const userRef= await createdUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
           id: snapShot.id,
            ...snapShot.data()
          });
        });

      }


     
else{
    
  setCurrentUser(userAuth);
}
     
    });
  
      }
  
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  
  
  
  render() {

    return(
    <div >
      <Header  />
      <Switch>
     <Route exact path='/' component={HomePage} />
     <Route exact path='/shop' component={ShopPage} />
     <Route exact path ='/signin' render={() => this.props.currentUser ? (
     <Redirect to='/' />)
      : (
        <SignInAndSignUpPage/>
      ) } />
     </Switch>
    </div>
  );
  }
}

const mapStateToProps= ({user}) => ({
  currentUser : user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps )(App) ;
