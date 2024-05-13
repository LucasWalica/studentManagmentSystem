import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStudents, deleteStudent } from '../services/StudentService';
import AddStudentModal from './AddStudentModal';
import UpdateStudentModal from './UpdateStudentModal';

const Manage = () => {
    const [students, setStudents] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (!isUpdated) {
            getStudents()
                .then(data => {
                    setStudents(data);
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });
        }
    }, [isUpdated]);

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStudent(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, studentId) => {
        if (window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteStudent(studentId)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                })
                .catch((error) => {
                    console.error('Failed to delete student:', error);
                    alert('Failed to Delete Student');
                });
        }
    };

    const AddModelClose = () => setAddModalShow(false);
    const EditModelClose = () => setEditModalShow(false);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row" >
                <p id="manage"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Registration No</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu) =>
                            <tr key={stu.id}>
                                <td>{stu.studentId}</td>
                                <td>{stu.FirstName}</td>
                                <td>{stu.LastName}</td>
                                <td>{stu.RegistrationNo}</td>
                                <td>{stu.Email}</td>
                                <td>{stu.Course}</td>
                                <td>
                                    <Button className="mr-2" variant="danger"
                                        onClick={(event) => handleDelete(event, stu.studentId)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <Button className="mr-2"
                                        onClick={(event) => handleUpdate(event, stu)}>
                                        <FontAwesomeIcon icon={FaEdit}/>
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Add Student
                    </Button>
                    <AddStudentModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModelClose} />
                    <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated} onHide={EditModelClose} />
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default Manage;
