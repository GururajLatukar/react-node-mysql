import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
   constructor(props){
      super(props);
      this.state = {
         email: '',
         password: ''
      }
   }
   change = (e) => {
     this.setState({
        [e.target.name]: e.target.value
     });
   }
   submit = (e) => {
      e.preventDefault();
      axios.post('/api/users/login',{
         email: this.state.email,
         pass: this.state.password
      }).then(res => {
         if(res.data.success){
            localStorage.setItem("abc-jwt", res.data.token);
         }
         this.props.history.push("/protected");
      });
   }
   render(){
      return (
         <div>
            <form onSubmit={(e) => this.submit(e)}>
               <label>email</label>
               <input type="email" onChange={e => this.change(e)} name="email" value={this.state.email} />
               <label>password</label>
               <input type="password" onChange={e => this.change(e)} name="password" value={this.state.password} />
               <button>submit</button>
            </form>
         </div>
      )
   }
}

export default Login;