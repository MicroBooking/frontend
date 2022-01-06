import axios from "axios";
import { useState } from "react"
import { useEffect } from "react"
import { Routes, Route, useParams } from "react-router-dom";
import { Card } from "react-bootstrap"
import { Carousel } from "react-bootstrap";
import { Button } from "react-bootstrap"



export default function ListingDetail(props){
   const params = useParams();
   const [justReserved, setJustReserved] = useState(false);

   const [listing, setListing] = useState({});
   const [reservation, setReservation] = useState({});
   const [images, setImages] = useState([]);

   const reserveListing = () => {
       const body = {
           startDate: '2012-03-19T07:22Z',
           endDate: '2012-03-19T07:22Z',
           ownerId: 1,
           reserverId: 1,
           listingId: params.id
       }

       axios.post(process.env.REACT_APP_RESERVATIONS_SERVICE_URL, body).then(res => {
           console.log('success!');
           setJustReserved(true);
       })
   }
   useEffect(() => {
       const fetchData = async () => {
           const listingData = () => axios.get(`${process.env.REACT_APP_LISTINGS_SERVICE_URL}/${params.id}`).then(res => {
               setListing(res.data);
               console.log(res.data.reservationId)
               reservationData(res.data.reservationId);
           })
           const reservationData = (reservationId) => axios.get(`${process.env.REACT_APP_LISTINGS_SERVICE_URL}/${reservationId}`).then(res => {
               setReservation(res.data);
               imageData()
           }).catch(e => {
               setReservation(null);
               imageData()
           })

           const imageData = () => axios.get(`${process.env.REACT_APP_IMAGES_SERVICE_URL}/listing/${params.id}`).then(res => {
            setImages(res.data.map(image => {
                return {original: image.url, originalHeight: 300, originalWidth:300}
            }))
        })

        listingData();
       }

       fetchData()

       console.log(images)
       
   }, [])

   return (
       <div className="row d-flex justify-content-center">
        <div className= "row d-flex justify-content-center">
            <Card style={{ width: '45rem' }} className="text-center mt-5 justify-content-center">
                <Card.Body>
                    <Card.Title>RESERVATION DETAILS</Card.Title>
                    <Card.Title>{listing.title}</Card.Title>
                    <Card.Text>
                    {listing.description}
                    </Card.Text>
                    <Card.Text>
                    Type: {listing.type}
                    </Card.Text>
                    <Card.Text>
                    owner: {listing.ownerId}
                    </Card.Text>
                    <Card.Text>
                    Price per month: {listing.monthlyPrice} €
                    </Card.Text>
                    <Card.Text>
                    Reserved: {listing.reserved ? "Yes" : "No"}
                    </Card.Text>
                    <Card.Text>
                    Reserver: {listing.reserved ? `${reservation.reserverId}` : "/"}
                    </Card.Text>
                </Card.Body>
            </Card>
       </div>   
       <div className= "row d-flex justify-content-center mt-5">
            <Card style={{ width: '45rem', height:'25rem'}} className="text-center justify-content-center">
            <Card.Title>{images.length > 0 ? "UPLOADED PHOTOS" : "No photos uploaded."}</Card.Title>
            <Carousel>
            {images.map(image => (
                             <Carousel.Item style={{width:'45rem', height:'20rem'}}>
                             <img
                               className="d-block w-100 h-100"
                               src={image.original}
                             />

                           </Carousel.Item>   
            ))}
            </Carousel>
            </Card>
       </div>   
       <div className= "col d-flex justify-content-center mt-5">
       {listing.reserved? 
       <div>Listing already reserved.</div> :   justReserved ? <div>Successfully reserved.</div>  :  <Button style={{width:'10%', "margin-top" : '10px'}} onClick={reserveListing}>Reserve</Button> }
       </div>  

  
       </div>
   )
}