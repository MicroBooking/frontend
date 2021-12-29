import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { Button } from "react-bootstrap"

export default function MainPage() {

    const [listings, setListings] = useState([])


   useEffect(() => {
       axios.get("http://localhost:8080/v1/listings").then(res => {
           setListings(res.data)
       })
   }, [])

    return (
        
        <div className="col d-flex justify-content-center">
            {listings.map(listing => {
                return (
                    <div>
                    <Card style={{ width: '18rem' }} className="mainPage text-center mt-5">
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
                    <Button>See more</Button>
                    </Card>

                    </div>
                )

            })}

        </div>

    )
}