import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { AddUser } from '../actions/user';


export default function addUserForm(props){
   
const dispatch=useDispatch();
   /* const [id,setId]=useState(0);
   const [name,setName]=useState('')
   const [brand,setBrand]=useState('')
   const [price,setPrice]=useState(0); */

const initialFormState = {
    userLoginId:0,
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    contact:'',
    email:''
}
 
const [user,setUser]=useState(initialFormState);
//a function which is universal for all changes 
//id ,name ,brand , price
//when is handleInputChange 
//when you are changing the name of the product
//      event.target.name =name
//event.target.value ='mouse'



const handleInputChange = (event)=>{
   const {name,value} =event.target;
  
   setUser({...user,[name]:value});
}
 
/*
const handleIdChange =(event)=>{
   setId(event.target.value)
}

const handleNameChange = (event)=>{
   setName(event.target.value)
}

const handleBrandChange=(event)=>{
   setBrand(event.target.value)
}

const handlePriceChange=(event)=>{
   setPrice(event.target.value)
}*/

const submitHandler=(event)=>{event.preventDefault();
if( !user.userLoginId || !user.userName || !user.password||!user.firstName||!user.lastName||
    !user.contact||!user.email) return;
 console.log(user+'from adduserform')
props.addUser(user);
dispatch(addUserForm(user));
setUser(initialFormState);

}
return (<>

   <form onSubmit={submitHandler}>

<label>userLoginId</label>
<input 
type='number'
name='userLoginId'
value={user.userLoginId}
onChange={handleInputChange}/>

<label>userName</label>
<input 
type='text'
name='userName'
value={user.userName}
onChange={handleInputChange}/>

<label>password</label>
<input 
type='text'
name='password'
value={user.password}
onChange={handleInputChange}/>

<label>firstName</label>
<input 
type='text'
name='firstName'
value={user.firstName}
onChange={handleInputChange}/>

<label>lastName</label>
<input 
type='text'
name='lastName'
value={user.lastName}
onChange={handleInputChange}/>

<label>contact</label>
<input 
type='text'
name='contact'
value={user.contact}
onChange={handleInputChange}/>

<label>email</label>
<input 
type='text'
name='email'
value={user.email}
onChange={handleInputChange}/>

<button>Add New User</button>

</form>


</>
)


}