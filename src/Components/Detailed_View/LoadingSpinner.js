import React from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import './../../Styles/common.module.css'

function LoadingSpinner() {
    return (
        <Modal show={true}>
            <ModalBody>
                <div className="loadingSpinner">
                    <div className="spinner">
                        <RotatingLines
                            height="80"
                            width="80"
                            radius="9"
                            color="rgb(87, 108, 29)"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />  
                    </div>
            </div>
        </ModalBody>
        </Modal>
    )
}

export default LoadingSpinner;