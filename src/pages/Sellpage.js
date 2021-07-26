import { React, useState } from 'react'
import '../App.css'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'
import {randomUrls} from '../constants'

function Sellpage({ props , updateParentState }) {

    const openRiver = props.openRiver
    const account = props.account

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const uploadArtwork = (name, price, imageHash) => {
        openRiver.methods.uploadArtwork(name, price, imageHash)
            .send({ from: account })
            .once('receipt', (receipt) => {
                console.log("Artwork Created")
                updateParentState(receipt.events.ArtworkCreated.returnValues)
            });
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            const random = Math.floor(Math.random() * randomUrls.length);
            uploadArtwork(form.name, form.price, randomUrls[random])
            console.log(form)
            console.log("Submitted")
        }
    }

    const findFormErrors = () => {
        const { name, type, file, price, description } = form
        const newErrors = {}
        // name errors
        if (!name || name === '') newErrors.name = 'Cannot be blank!'
        else if (name.length > 30) newErrors.name = 'name is too long!'
        // type errors
        // if (!type || type === '') newErrors.type = 'Select a Type'
        // file errors
        // if (!file || file === '') {
        //     newErrors.file = 'Upload an image!'
        // }
        // price errors
        if (!price || price < 0) newErrors.price = 'Must be more than 0 ETH'
        // description errors
        // if (!description || description === '') newErrors.description = 'Description be blank!'
        return newErrors
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>Sell</h1>
            <Form style={{ width: '300px' }}>
                <Form.Group>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type='text'
                        onChange={e => setField('name', e.target.value)}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        disabled
                        as='select'
                        onChange={e => setField('type', e.target.value)}
                        isInvalid={!!errors.type}
                    >
                        <option value=''>Select Type of Digital Asset:</option>
                        <option value='artwork'>Artwork</option>
                        <option value='game'>Game Items</option>
                        <option value='software'>Software</option>
                        <option value='others'>Others</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formFile">
                    <Form.Label>Upload File Image</Form.Label>
                    <Form.Control disabled onChange={e => setField('file', e.target.files)} isInvalid={!!errors.file} type="file" />
                    <Form.Control.Feedback type='invalid'>{errors.file}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price (ETH)</Form.Label>
                    <Form.Control
                        type='number'
                        onChange={e => setField('price', e.target.value)}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        disabled
                        as='textarea'
                        onChange={e => setField('description', e.target.value)}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Button type='submit' onClick={handleSubmit}>Sell!</Button>
            </Form>
            {/* <Button onClick={tempFunction}>Temp Button</Button> */}
        </div>
    )
}

export default Sellpage