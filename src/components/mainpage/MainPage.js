import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"
import {Link } from "react-router-dom";


export default function MainPage() {
    const navigate = useNavigate();

    const [listings, setListings] = useState([])


   useEffect(() => {
       axios.get(process.env.REACT_APP_LISTINGS_SERVICE_URL).then(res => {
           setListings(res.data)
       })
   }, [])

    return (
        <div className="col d-flex justify-content-center">
        <div>
            {listings.map(listing => {
                return (
                    <div>
                    <Card style={{ width: '40rem' }} className="mainPage text-center mt-5">
                    <Card.Body>
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
                    </Card.Body>
                    <Button onClick={() => navigate(`/details/${listing.listingId}`)}>See more
                    </Button>
                    </Card>

                    </div>
                )

            })}

        </div>
        </div>


    )
}