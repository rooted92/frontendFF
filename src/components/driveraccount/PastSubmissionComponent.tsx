import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DeleteIcon from '../../assets/delete.svg';

interface SubmissionProps {
    yardName: string;
    timeStamp: string;
}

const PastSubmissionComponent = ({ yardName, timeStamp }: SubmissionProps) => {

    const handleDeleteSubmissionItem = () => {
        console.log('item deleted');
    }

    return (
        <div>
            <Row>
                <Col className='col-6'>
                    <p className='m-0'>{yardName}</p>
                    <p className='m-0'>{timeStamp}</p>
                </Col>
                <Col className='col-6 d-flex align-items-center justify-content-end'>
                    <Button onClick={handleDeleteSubmissionItem} className='border bg-transparent border-none'>
                        <img height={'20rem'} width={'auto'} src={DeleteIcon} alt="delete icon" />
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default PastSubmissionComponent;