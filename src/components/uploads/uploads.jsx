import './uploads.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Uploads(){
    return(
        <div className="uploads">
        <div className="forms">
        <Form>
      <Form.Group className="mb-3" controlId="formGroupText">
        <Form.Label>File description</Form.Label>
        <Form.Control type="text" placeholder="Enter file description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupFile">
        <Form.Label>Attach File</Form.Label>
        <Form.Control type="file" />
        <br></br>
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form.Group>
    </Form>
        </div>
        </div>
    );
}

export default Uploads;