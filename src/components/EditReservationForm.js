import React ,{useState,useEffect}from 'react'
import { useSelector,useDispatch } from 'redux'
import Form from 'react-bootstrap/Form';

export default function EditReservationForm(props){

    const [reservation,setReservation] =useState(props.currentReservation)

    const handleInputChange = (event)=>{
        const {name,value} =event.target;
       
        setReservation({...reservation,[name]:value});
     }


     const submitHandler=(event)=>{event.preventDefault();
       props.updateReservation(reservation.reservationId,reservation);
     }
       return (
        
        <form onSubmit={submitHandler}>
         
        <label>ReservationId</label>
        <h1>{props.currentReservation.reservationId}</h1>
        
        <Form.Select aria-label="Default select example" name='reservationType'
          onChange={handleInputChange} placeholder="Select your type of reservation"  aria-required>
         
         <option >Open this select type</option>
         <option value="TravelAgent">Travel Agent</option>
         <option value="UPI">UPI</option>
         <option value="Credit">Credit</option>
         
        
       </Form.Select>
     
       
     



        {/* <label>reservationType</label>
     <input 
     type='text'
     name='reservationType'
     value={reservation.reservationType}
     onChange={handleInputChange}/>
 */}
    {/*  <label>reservationDate</label>
     <input 
     type='date'
     name='reservationDate'
     value={reservation.reservationDate}
     onChange={handleInputChange}/>

    <label>reservationTime</label>
     <input 
     type ='time'
     name='reservationTime'
     value={reservation.reservationTime}
     onChange={handleInputChange}/> 
 */}
    <label>source</label>
     <input 
     type='text'
     name='source'
     value={reservation.source}
     onChange={handleInputChange}/>

    <label>destination</label>
     <input 
     type='text'
     name='destination'
     value={reservation.destination}
     onChange={handleInputChange}/>

    <button>Update</button>
   
     </form>
    )
    

}
