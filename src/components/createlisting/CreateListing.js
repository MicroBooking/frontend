import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState } from "react";
import ImageUploading from 'react-images-uploading';
import axios from "axios";


export default function CreateListing () {

    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("");
    const maxNumber = 69;


    const onChange = (imageList, addUpdateIndex) => {
        
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
      };

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleType = (e) => {
        setType(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const createListing = () => {
            const body = {
                title: title,
                type: type,
                description: description,
                monthlyPrice: price,
                ownerId: 1
            }

            return axios.post('http://localhost:8080/v1/listings', body)
        }



        const uploadImages = (listingId) => {
            var promises = []
            images.forEach(image => {

                var bodyFormData = new FormData();
                bodyFormData.append('listing_id', listingId);
                bodyFormData.append('image', image.data_url)
                promises.push(axios({
                    method: "post",
                    url: "http://localhost:8082/v1/images/upload",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                    }))
            });
            console.log(promises)
            axios.all(promises).then(res => {
                console.log('Success!')
            })
        }

        let listingRes = await createListing()
        const listingId = listingRes.data.listingId;
        uploadImages(listingId)


    }


    return (
        <div className= "row d-flex justify-content-center">

            <div style={{ width: '45rem' }}>
            <h1 className="align-celf-center">Create a new listing</h1>
            <Form onSubmit = {onSubmit}>
              <Form.Group className="mb-3 mt-5" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control  value={title} onChange={handleTitle}/>
                <Form.Text className="text-muted" >
                  Title of your listing
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control placeholder="Flat/house/room" value={type} onChange={handleType} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formType">
                <Form.Label>Monthly price in EUR</Form.Label>
                <Form.Control placeholder="200" value={price} onChange={handlePrice}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Short description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="How large is it? Is smoking allowed? Pets?" value={description} onChange={handleDescription} />
            </Form.Group>
            <Form.Label>Upload your images here</Form.Label>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >     
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>Remove all images</button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image['data_url']} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>Update</button>
                          <button onClick={() => onImageRemove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}

                  </div>
                )}
      </ImageUploading>
              <Button variant="primary" type="submit" className="mt-5">
                Submit
              </Button>
            </Form>

            </div>
        </div>
    )
}

