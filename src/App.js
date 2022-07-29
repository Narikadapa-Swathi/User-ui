import logo from './logo.svg';

import './App.css'
import UserList from './components/UserList';
import { useState,useEffect } from 'react';
import apiClient from './http-common'
import {BrowserRouter, Routes ,Route ,  Link ,useNavigate } from 'react-router-dom'
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import axios from 'axios';
function App() {
  
const [userData,setUser]=useState([]);

    //when App component gets loaded , a call to api will render the products list as a response
    //which we are setting to the products
    useEffect(()=>{apiClient.get('/').then((response)=>{
      setUser(response.data);
    })},[])

    
const [editing,setEditing]=useState(false);

const initialFormState = {
  userLoginId:0,
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    contact:'',
    email:''
}
const [currentUser,setCurrentuser] 
     =useState(initialFormState);

   //child component --AddProductForm child -App is parent ,product object in the form of input fields form 
   //brand price name on submission  
async function addUser(user){
  try{
  const response=await apiClient.post('/',user);
    setUser([...userData,response.data]);
    console.log(user);
    
  }catch(err){
    console.log(err)
  }
  
}



async function deleteUser(userLoginId){
  await apiClient.delete(`/${userLoginId}`);
    setUser(userData.filter((user)=>userData.userLoginId !== userLoginId));
  }
  
  const editUser=(user)=>{

    setEditing(true);
      setCurrentuser
      ({userLoginId:user.userLoginId,userName:user.userName,password:user.password,
        firstName:user.firstName,lastName:user.lastName,contact:user.contact,email:user.email})
     
  }
  
  const updateUser = (userLoginId,userName,updatedUser)=>{
  
    setEditing(false);
    apiClient.put(`/${userLoginId}/${userName}`,updatedUser).then((response)=>
    {
  
      console.log('user updated');
      setUser(userData.map((user)=>
    (user.userLoginId === userLoginId ? updatedUser : user)));
    })
    
  }
  
  
  
  
  return (<div>
    <div className='container'>
    <h1>User Crud app with hooks</h1>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h2>Edit User Form </h2>
          <EditUserForm
           setEditing={setEditing}
           currentUser={currentUser}
           updateUser={updateUser}
           />
           </div>):(

    <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/route" className="navbar-brand">
          React App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addUser"} className="nav-link">
              Add User
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<UserList 
    userData={userData} 
         editUser={editUser}
         deleteUser={deleteUser} />} ></Route>
          <Route exact path="AddUser" element={<AddUserForm addUser={addUser}/>} />
         
         <Route path='/user' element={<UserList 
    userData={userData} 
         editUser={editUser}
         deleteUser={deleteUser} />}>

         </Route>
         <Route path="/user/:userLoginId" element={<EditUserForm /> }></Route>
        </Routes>
      </div>
    
    </BrowserRouter>
    )}</div></div></div></div>
)}

export default App;