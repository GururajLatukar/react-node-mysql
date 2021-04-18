import React, {Component} from 'react';
import { getJwt } from '../helpers/jwt';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class AutheticatedComponent extends Component{
   constructor(props){
      super(props);
      this.state ={
         user: undefined
      }
   }
   componentDidMount(){
      const jwt = getJwt();
      if(!jwt){
         this.props.history.push("/Login");
      }

      axios.get("/api/users/", { headers: { Authorization:`Bearer ${jwt}` }}).then(res => this.setState({
         user: res.data
      })).catch(err => {
         localStorage.removeItem("abc-jwt");
         this.props.history.push("/Login");
      });
   }
   componentWillUnmount(){
      this.setState = (state,callback)=>{
         return;
     };
   }
   render(){
      if(this.state.user === undefined){
         return (
            <div>
               <h1>Loading....</h1>
            </div>
         )
      }
      return (
         <div>
            {this.props.children}
         </div>
      )
   }
}

export default withRouter(AutheticatedComponent);