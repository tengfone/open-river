import { React, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button, Spinner, Row, Col } from 'react-bootstrap';
import { randomUrls } from '../constants';
import Web3 from 'web3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Sellpage.css"

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function Sellpage({ props, updateParentState }) {

    const openRiver = props.openRiver
    const account = props.account

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [convertedEth, setConvertedEth] = useState(0)
    const [showSpinner, setShowSpinner] = useState(false)
    const [img, setimg] = useState(null)

    const uploadArtwork = (name, price, description, imageHash) => {
        openRiver.methods.uploadArtwork(name, price, description, imageHash)
            .send({ from: account })
            .once('receipt', (receipt) => {
                updateParentState(receipt.events.ArtworkCreated.returnValues)
                toast.success('🎉 Success', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    setShowSpinner(false)
                    window.location.reload()
                }, 2000);
            }).on('error', (error) => {
                console.log(error);
            });;
    }

    const captureFile = (event) => {
        // Process file for IPFS
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setForm({
                ...form,
                buffer: Buffer(reader.result)
            })
        }
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


    const sgdToEtherum = e => {
        let sgdFloat = parseFloat(e)
        if (!isNaN(sgdFloat)) {
            let convertE = (sgdFloat * 0.0003).toFixed(18)
            setConvertedEth(convertE)
        }
        else {
            setConvertedEth(0)
        }
    }

    const toIPFS = async () => {
        const result = await ipfs.add(form.buffer)
        return result
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
            // const random = Math.floor(Math.random() * randomUrls.length);

            setShowSpinner(true)
            toIPFS().then((res) => {
                // Example hash: QmWxpa7VASM1own9Ey3CSxNKu7Ez55Rp99Vk8SC2B3z7bt
                // Example url: https://ipfs.infura.io/ipfs/{hash}
                uploadArtwork(form.name, window.web3.utils.toWei(convertedEth, 'ether'), form.description, res.path)
            }
            )
        }
    }

    const findFormErrors = () => {
        const { name, type, file, price, description } = form
        const newErrors = {}
        let validPrice = /^\d*\.?\d*$/

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
        if (!price || price < 0 || price > 1000000000) newErrors.price = 'Must be between $0-1B SGD'
        else if (!price.match(validPrice)) {
            newErrors.price = 'Must be in the form x.x'
        }
        // description errors
        if (!description || description === '') newErrors.description = 'Description be blank!'
        return newErrors
    }

    return (
        <div className='form-section'>
            <p id="sell-tag">With Open River, submitting an artwork has never been easier</p>
            <div className="form-submit">
            <div className="card-sell" >
                <div className="card-sell-img"><img src={img} /></div>
            </div>
            <div>

            
            <Form>
                <Row className="mb-2">
                    <Form.Group as={Col}>
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type='text'
                            onChange={e => setField('name', e.target.value)}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" as={Col}>
                    <Form.Label>Upload File Image</Form.Label>
                    <Form.Control onChange={e => {
                        setField('file', e.target.files)
                        setimg(URL.createObjectURL(e.target.files[0]))
                        captureFile(e)
                    }} isInvalid={!!errors.file} type="file" />
                    <Form.Control.Feedback type='invalid'>{errors.file}</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col}>
                        <Form.Label>Price (SGD)</Form.Label>
                        <Form.Control
                            type='text'
                            onChange={e => {
                                setField('price', e.target.value)
                                sgdToEtherum(e.target.value)
                            }}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                    </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Converted to Etherum (Ξ)*</Form.Label>
                        <Form.Control
                            type='text'
                            disabled
                            placeholder={convertedEth}
                    />
                    </Form.Group>
                </Row>                
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        onChange={e => setField('description', e.target.value)}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Button id="sell-btn" type='submit' onClick={handleSubmit}>Sell</Button>
            </Form>
            </div>
            </div>
            <ToastContainer />
            {
                showSpinner && (
                    <div className={"loader-wrapper"}>
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </div>
                )
            }
            
        </div>
    )
}

export default Sellpage