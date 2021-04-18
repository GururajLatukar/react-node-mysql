import React, { Component } from 'react';
import { getJwt } from '../helpers/jwt';
import axios from 'axios';

class CrudComponent extends Component{
   constructor(props){
      super(props);
      this.state = {
         userList: [],
         activeItem: {
            fname: '',
            lname: '',
            email: '',
            pass: '',
            id: ''
         },
         updateOp: false
      }
      this.fetchUsers = this.fetchUsers.bind(this);
   }
   componentDidMount(){
      this.fetchUsers();
   }
   fetchUsers = () => {
      const jwt = getJwt();
      axios.get("/api/users/", { headers: { Authorization:`Bearer ${jwt}` }}).then(res => {
         if(res.data.success){
            this.setState({
               userList: res.data.data
            });
         }
      }).catch(err => {
         console.log(err);
      });
   }
   change = (e) => {
      this.setState({
         activeItem: {
            ...this.state.activeItem,
            [e.target.name]: e.target.value
         }
      });
   }
   deleteUser = (user) => {
      const jwt = getJwt();
      axios.delete(`/api/users/${user.id}`, { headers: { Authorization:`Bearer ${jwt}` }}).then(res => {
         this.fetchUsers();
         console.log(res);
      }).catch(err => {
         console.log(err);
      });
   }
   updateUser = (user) => {
      this.setState({
         activeItem: {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            pass: '',
            id: user.id
         },
         updateOp: true
      });
   }
   submit = (e) => {
      e.preventDefault();
      const jwt = getJwt();
      
      if(this.state.updateOp){
         axios.patch("/api/users/", {
            email: this.state.activeItem.email,
            pass: this.state.activeItem.pass,
            lname: this.state.activeItem.lname,
            fname: this.state.activeItem.fname,
            id: this.state.activeItem.id
         },{ headers: { Authorization:`Bearer ${jwt}` }}).then(res => {
            this.fetchUsers();
            this.setState({
               activeItem: {
                  fname: '',
                  lname: '',
                  email: '',
                  pass: '',
                  id: ''
               },
               updateOp: false
            });
         }).catch(err => {
            console.log(err);
         });
      } else {
         axios.post("/api/users/", {
            email: this.state.activeItem.email,
            pass: this.state.activeItem.pass,
            lname: this.state.activeItem.lname,
            fname: this.state.activeItem.fname
         },{ headers: { Authorization:`Bearer ${jwt}` }}).then(res => {
            this.fetchUsers();
            this.setState({
               activeItem: {
                  fname: '',
                  lname: '',
                  email: '',
                  pass: ''
               }
            });
         }).catch(err => {
            console.log(err);
         });
      }
   }
   render(){
      const users = this.state.userList;
      return (
         <div>
            <div className="createform">
               <form onSubmit={(e) => this.submit(e)}>
                  <label>first name</label>
                  <input type="text" onChange={e => this.change(e)} name="fname" value={this.state.activeItem.fname} />
                  <label>last name</label>
                  <input type="text" onChange={e => this.change(e)} name="lname" value={this.state.activeItem.lname} />
                  <label>email</label>
                  <input type="email" onChange={e => this.change(e)} name="email" value={this.state.activeItem.email} />
                  <label>password</label>
                  <input type="password" onChange={e => this.change(e)} name="pass" value={this.state.activeItem.pass} />
                  <button>{this.state.updateOp ? "Update" : "Add"}</button>
               </form>
            </div>
            <div className="showdata">
            {
               users.map((user, index)=> {
                  return (
                     <div key={user.id}>
                        <span>{user.fname}</span>
                        <button onClick={e => this.updateUser(user)}>Edit</button>
                        <button onClick={e => this.deleteUser(user)}>Delete</button>
                     </div>
                  )
               })
            }
            </div>
         </div>
      )
   }
}

export default CrudComponent;