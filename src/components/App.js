import React, { useState, useRef } from 'react';
import { Form, Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Provider, useDispatch } from 'react-redux';
import {Paper, Container, Typography, Button } from '@material-ui/core';

import {createStore} from 'redux';
import rootReducer from './reducers';
import useStyles from './authStyles';

const AppWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}


const App = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [state, setState] = useState({
    title: '',
    description: '',
    course: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
  const [uploadedFile] = files;
  setFile(uploadedFile);

  const fileReader = new FileReader();
  fileReader.onload = () => {
    setPreviewSrc(fileReader.result);
  };
  fileReader.readAsDataURL(uploadedFile);
  setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  dropRef.current.style.border = '2px dashed #e9ebeb';
};


  const updateBorder = (dragState) => {
  if (dragState === 'over') {
    dropRef.current.style.border = '2px solid #000';
  } else if (dragState === 'leave') {
    dropRef.current.style.border = '2px dashed #e9ebeb';
  }
};


  const handleOnSubmit = async (event) => {
  event.preventDefault();

  try {
    const { title, description, course } = state;
    if (title.trim() !== '' && description.trim() !== '' && course.trim()) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
	formData.append('course',course);
	formData.append('uploaded_by',user.result.name)

        setErrorMsg('');
        await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
	props.history.push('/');
      } else {
        setErrorMsg('Please select a file to add.');
      }
    } else {
      setErrorMsg('Please enter all the field values.');
    }
  } catch (error) {
    error.response && setErrorMsg(error.response.data);
  }
};


  return (
    <React.Fragment>
	<Container component="main" maxwidth="xs">
	<Paper className={classes.paper} elevation={3}>
	<Typography variant="h5">Add a File</Typography>
      <Form className={classes.form} onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
	<Row>
          <Col>
            <Form.Group controlId="course">
              <Form.Control
                type="text"
                name="course"
                value={state.course || ''}
                placeholder="Enter course name"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
	<div className="upload-section">
  <Dropzone onDrop={onDrop}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
        <input {...getInputProps()} />
        <p>Drag and drop a file OR click here to select a file</p>
        {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
        )}
      </div>
    )}
  </Dropzone>
  {previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" />
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <div className="preview-message">
      <p>Image preview will be shown here after selection</p>
    </div>
  )}
</div>
        <Button fullWidth variant="contained" color="primary" className={classes.submit} type="submit">
          Submit
        </Button>
      </Form>
	</Paper>
		</Container>
    </React.Fragment>
  );
};

export default AppWrapper;

