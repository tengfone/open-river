import "./AssetList.css";
import ethIcon from '../assets/eth_icon.svg'
import { Modal, Button, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssetList = ({ assets, purchaseProducts, isClickable }) => {

  const [modalShow, setModalShow] = useState(false)
  const [selectedIndex, setIndex] = useState()

  console.log(assets)
  // purchaseProducts(asset.id, asset.price)

  // Buying Page
  if (isClickable) {
    return (
      <div className="assets-container">
        {assets.map((asset, index) => (
          <div className="card" key={asset.id} onClick={() => {
            setModalShow(true)
            setIndex(index)
          }
          }>
            <div className="card-image"><img src={asset.imgHash} /></div>
            <div className="card-placeholder">
              <p>Title</p>
              <p>Price</p>
            </div>
            <div className="asset-information">
              <p>{asset.name}</p>
              <div className="right-information-block">
                <img src={ethIcon} alt="Eth Icon" width="14" height="14" />
                <p>{asset.price}</p>
              </div>
            </div>
          </div>
        ))}
        {
          modalShow && (
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              asset={assets[selectedIndex]}
              purchaseProducts={purchaseProducts}
            />
          )
        }
      </div>
    );
  }

  // Profile Page
  return (
    <div className="assets-container">
      {assets.map(asset => (
        <div className="card" key={asset.id} onClick={() => purchaseProducts(asset.id, asset.price)}>
          <div className="card-image"><img src={asset.imgHash} /></div>
          <div className="card-placeholder">
            <p>Title</p>
            <p>Price</p>
          </div>
          <div className="asset-information">
            <p>{asset.name}</p>
            <div className="right-information-block">
              <img src={ethIcon} alt="Eth Icon" width="14" height="14" />
              <p>{asset.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MyVerticallyCenteredModal(props) {

  const [showSpinner, setShowSpinner] = useState(false)

  async function purchaseSelectedProducted() {
    setShowSpinner(true)
    props.purchaseProducts(props.asset.id, props.asset.price).then((status) => {
      if (status === 200) {
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
          window.location.reload();
        }, 2000);
      }
      if (status === 4001) {
        // User Decline
        toast.warning('❗ Whoops User Decline', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setShowSpinner(false)
      }
    }).catch(err => {
      console.log(err)
      setShowSpinner(false)
      toast.error('❗ Error Something Went Really Wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.asset.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Container>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>

          <h4>Description</h4>
          <p>{props.asset.description}</p>
          <img style={{ height: 'auto', width: 'auto', maxWidth: '300px', maxHeight: '300px' }} src={props.asset.imgHash} />
          <div className="">
            <img src={ethIcon} alt="Eth Icon" width="14" height="14" />
            <p>{props.asset.price}</p>
          </div>
        </Modal.Body>

        {
          showSpinner && (
            <div className={"loader-wrapper"}>
              <Spinner animation="border" role="status">
              </Spinner>
            </div>
          )
        }
        <ToastContainer />
        <Modal.Footer>
          <Button variant="primary" onClick={() => purchaseSelectedProducted()} >Purchase</Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default AssetList;