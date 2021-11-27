import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
      <table className="files-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
	    <th>Course</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
	    {filesList.length > 0 ? (
            filesList.filter((val) =>
				{
					if(searchTerm == "")
					{
						return val
					}
					else if(val.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
						val.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
						val.course.toLowerCase().includes(searchTerm.toLowerCase()))
					{
						return val
					}
				}).map(
              ({ _id, title, description, course, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
		  <td className="file-course">{course}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;

