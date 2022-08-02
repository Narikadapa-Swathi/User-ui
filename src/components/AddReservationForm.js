import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation } from '../actions/reservations';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import AddReservation from '../css/AddReservation.css';


export default function AddReservationForm(props){

const dispatch=useDispatch();

const initialFormState ={

    reservationId:'0',
    
    reservationType:'',
    reservationDate:'',
    //reservationTime:'',
    source:'',
    destination:''

}
const [reservation,setReservation]=useState(initialFormState);

const handleInputChange = (event)=>{
    const {name,value} =event.target;
   
    setReservation({...reservation,[name]:value});
 }
 const submitHandler=(event)=>{event.preventDefault();
    if( !reservation.reservationType || 
         !reservation.source ||!reservation.destination) return;
     console.log(reservation+'from addReservationform')
    props.addReservation(reservation);
  // dispatch(addReservation(reservation));
    setReservation(initialFormState);
    
    }

    return (

      <Card.Header className="d-flex justify-content-between">
      <div className="d-inline-flex p-2">
      <Card style={{ width: '30rem' }}>
      <ListGroup variant="flush">

        <Form onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicReservationId" >
            <Form.Label style={{ color: "balck" }}>Reservation Id</Form.Label>
            <Form.Control type="number" placeholder="Reservation Id" required
             name='reservationId'
             value={reservation.reservationId}
            onChange={handleInputChange} />
            
          </Form.Group>
     
          <Form.Group className="mb-3" controlId="formBasicReservationType" >
       <Form.Label style={{ color: "balck" }}>Reservation Type</Form.Label>
       
       
         <Form.Select aria-label="Default select example" name='reservationType'
          onChange={handleInputChange} placeholder="Select your type of reservation"  aria-required>
         
         <option >Open this select type</option>
         <option value="TravelAgent">Travel Agent</option>
         <option value="UPI">UPI</option>
         <option value="Credit">Credit</option>
         
        
       </Form.Select>
     
       
     </Form.Group>


     
          <Form.Group className="mb-3" controlId="formBasicBrand">
          
          <Form.Label style={{ color: "balck" }}>Reservation Time</Form.Label>
          
            <Form.Control type="date" required
   
            name='reservationDate'
            value={reservation.reservationDate}
            onChange={handleInputChange} />
           
          </Form.Group>
     
          <Form.Group className="mb-3" controlId="formBasicSource">
            <Form.Label style={{ color: "balck" }}>Source</Form.Label>
            <Form.Control type="text" placeholder="Starting Point" required
             name='source'
             value={reservation.source}
            onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDestination">
            <Form.Label style={{ color: "balck" }}>Destination</Form.Label>
            <Form.Control type="text" placeholder="Boarding Point" required 
              name='destination'
              value={reservation.destination}
            onChange={handleInputChange} />
          </Form.Group>
          
          <Button variant="success" type="submit">
          
      
            Submit
            
          </Button>
      
          
        
          
        </Form>
        </ListGroup>
    </Card>
    </div>
    </Card.Header>
        
      );
     }
 
   