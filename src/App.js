import logo from './logo.svg';
import './App.css';
import ReservationList from './components/ReservationList';
import AddReservationForm from './components/AddReservationForm';
import {useState, useEffect} from 'react';
import apiClient from './http-common';
import {BrowserRouter,Route, Routes,Link} from 'react-router-dom';
import EditReservationForm from './components/EditReservationForm';
import { Badge, Container } from 'react-bootstrap';
import './index'

function App() {
  const [reservations,setReservations]=useState([]);

  //const reservations=useSelector((state)=>state.reservations)

  useEffect(()=>{apiClient.get("/viewAll").then((response)=>{
    setReservations(response.data);
  })},[])

  const [editing,setEditing]=useState(false);

  const initialFormState ={
    reservationId:'0',
    reservationType:'',
    source:'',
    destination:''

  }

  const [currentReservation,setCurrentReservation] 
     =useState(initialFormState);

     async function addReservation(reservation){
      try{
      const response=await apiClient.post('/addReservation',reservation);
        setReservations([...reservations,response.data]);
        console.log(reservations);
        
      }catch(err){
        console.log(err)
      }
      
    }

    async function deleteReservation(reservationId){
      await apiClient.delete(`/${reservationId}`);
        setReservations(reservations.filter((reservation)=>reservation.reservationId !== reservationId));
      }
      
      const editReservation=(reservation)=>{
    
        setEditing(true);
          setCurrentReservation
          ({reservationId:reservation.reservationId,reservationType:reservation.reservationType,
            source:reservation.source, destination:reservation.destination})
         
      }
      
      const updateReservation = (reservationId,updatedReservation)=>{
      
        setEditing(false);
        apiClient.patch(`/${reservationId}`,updatedReservation).then((response)=>
        {
      
          console.log('reservation updated');
          setReservations(reservations.map((reservation)=>
        (reservation.reservationId === reservationId ? updateReservation : reservation)));
        })
        
      }

    const findByDate=(date,data)=>{
      setEditing(true);
      apiClient.post(`/${date}`,data).then((response)=>{
        console.log('reservation date updated')
        setReservations(reservations.map((reservation)=>
        (reservation.date===date ? findByDate :date)));
      })
      
    }
    

  return (
    
    
    <div>
    <div className='col-md-3 center'>
      <Container fluid>
    <h1 style={{ color: "yellow" }}>
    RESERVATION SYSTEM 
       
      </h1>
      </Container>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h3>Edit Reservation Form </h3>
          <EditReservationForm
           setEditing={setEditing}
           currentReservation={currentReservation}
           updateReservation={updateReservation}
           />
           </div>):(

    <BrowserRouter>
<nav class="navbar navbar-expand-lg navbar-light bg-light">

    
        <a href="/addReservation" className="navbar-brand">
        React App
        </a>
        <div className="navbar-nav mr-auto" >
          
          <li className="nav-item"  >
            <Link to={"/addReservation"} className="nav-link" style={{ color: "red" }}>
              ADD RESERVATION FORM
            </Link>
          </li><br></br>
          <li className="nav-item">
            <Link to={"/viewAll"} className="nav-link" style={{ color: "red" }}>
              RESERVATION LIST
            </Link>
          </li><br></br>
        </div>
      </nav><br></br>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<ReservationList 
    reservationData={reservations} 
         editReservation={editReservation}
         deleteReservation={deleteReservation} />} ></Route>
          <Route exact path="/addReservation" element={<AddReservationForm addReservation={addReservation}/>} />
         
         <Route path='/viewAll' element={<ReservationList  
    reservationData={reservations} 
         editReservation={editReservation}
         deleteReservation={deleteReservation} />}>

         </Route>
         <Route path="/reservations/:reservationId" element={<EditReservationForm /> }></Route>
        </Routes>
      </div>
      
  

    </BrowserRouter>
    ) }</div>
    </div></div></div>
    
   
  )
}

export default App;



