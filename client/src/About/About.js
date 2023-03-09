// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// function About() {
//   const navigate = useNavigate();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // const token = localStorage.getItem('token');
//     const token = Cookies.get("jwtToken");
//     console.log(token);
//     if (token) {
//       setAuthenticated(true);
//       axios
//         .get("http://localhost:5000/about", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => setMessage(response.data.message))
//         .catch((error) => console.log(error));
//     } else {
//       navigate("/signin");
//     }
//   }, []);

//   return <>{authenticated && <h1>Welcome to the about page!</h1>}</>;
// }

// export default About;

// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
// function About() {
//   const navigate = useNavigate();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: "", description: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [userId, setUserId] = useState(null);
//   // const memoizedNavigate = useCallback(navigate, [navigate]);
//   useEffect(() => {
//     const token = Cookies.get("jwtToken");
//     console.log(token);
//     if (token) {
//       axios
//         .get("http://localhost:5000/about", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           setAuthenticated(true);
//           const decodedToken = jwt.decode(token);
//           setUserId(decodedToken.userId);
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//           navigate("/signin");
//         });
//     } else {
//       navigate("/signin");
//     }
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/tasks/user/${userId}`
//       );
//       setTasks(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAddTask = async (event) => {
//     event.preventDefault();
//     const newTaskObj = {
//       ...newTask,
//       user: userId, // add user ID to the task object
//     };
//     await axios.post("http://localhost:5000/tasks", newTaskObj);
//     setNewTask({ title: "", description: "" });
//     fetchTasks();
//   };

//   const handleEditTask = async (event) => {
//     event.preventDefault();
//     await axios.put(`http://localhost:5000/tasks/${editTask._id}`, editTask);
//     setIsEditing(false);
//     setEditTask(null);
//     fetchTasks();
//   };

//   const handleDeleteTask = async (id) => {
//     await axios.delete(`http://localhost:5000/tasks/${id}`);
//     setIsEditing(false);
//     fetchTasks();
//   };

//   const handleEditClick = (task) => {
//     setIsEditing(true);
//     setEditTask(task);
//   };

//   return (
//     <>
//       {authenticated && (
//         <Container className="my-4">
//           <Row>
//             <Col>
//               <h1>Todo List</h1>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={4}>
//               <Form onSubmit={isEditing ? handleEditTask : handleAddTask}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={isEditing ? editTask.title : newTask.title}
//                     onChange={(event) => {
//                       if (isEditing) {
//                         setEditTask({ ...editTask, title: event.target.value });
//                       } else {
//                         setNewTask({ ...newTask, title: event.target.value });
//                       }
//                     }}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={
//                       isEditing ? editTask.description : newTask.description
//                     }
//                     onChange={(event) => {
//                       if (isEditing) {
//                         setEditTask({
//                           ...editTask,
//                           description: event.target.value,
//                         });
//                       } else {
//                         setNewTask({
//                           ...newTask,
//                           description: event.target.value,
//                         });
//                       }
//                     }}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                   {isEditing ? "Save" : "Add"}
//                 </Button>
//                 {isEditing && (
//                   <Button
//                     variant="secondary"
//                     className="ms-2"
//                     onClick={() => {
//                       setIsEditing(false);
//                       setEditTask(null);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 )}
//               </Form>
//             </Col>
//             <Col md={8}>
//               <Row className="mb-3">
//                 <Col>
//                   <InputGroup>
//                     <InputGroup.Text>Filter</InputGroup.Text>
//                     <FormControl
//                       type="text"
//                       value={searchTerm}
//                       onChange={(event) => setSearchTerm(event.target.value)}
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredTasks.map((task) => (
//                     <tr key={task._id}>
//                       <td>{task.title}</td>
//                       <td>{task.description}</td>
//                       <td>
//                         <Button
//                           variant="primary"
//                           size="sm"
//                           className="me-2"
//                           onClick={() => {
//                             setIsEditing(true);
//                             setEditTask(task);
//                           }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => handleDeleteTask(task._id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Col>
//           </Row>
//         </Container>
//       )}
//     </>
//   );
// }

// export default About;

// ----------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function About() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //   useEffect(() => {

  //     const token = Cookies.get("jwtToken");
  //     console.log(token);
  //     if (token) {
  //       axios
  //         .get("http://localhost:5000/about", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           setAuthenticated(true);
  //           const decodedToken = jwt_decode(token);
  //           setUserId(decodedToken.userId);
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           navigate("/signin");
  //         });
  //     }

  //   else {
  //       navigate("/signin");
  //     }

  //     // eslint-disable-next-line
  //   }, []);

  // useEffect(()=>{
  //   if (userId) {
  //     fetchTasks();
  //   }
  //   // eslint-disable-next-line
  // },[userId])

  const senddata = async () => {
    try {
      const res = await axios.get("http://localhost:5000/about", {
        withCredentials: true,
      });
      const user = res.data.user;
      setUser(user);
      setUserId(user._id);
    } catch (error) {
      if (!user) {
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    senddata();

    if (userId) {
      fetchTasks();
    }
    // eslint-disable-next-line
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/tasks/user/${userId}`
      );
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    const newTaskObj = {
      ...newTask,
      user: userId, // add user ID to the task object
    };
    await axios.post("http://localhost:5000/tasks", newTaskObj);
    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  const handleSaveTask = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:5000/tasks/${editTask._id}`, editTask);
    setIsEditing(false);
    setEditTask(null);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    setNewTask({ title: "", description: "" });
    setIsEditing(false);
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setEditTask(task);
  };

  return (
    <div>
      {user && (
        <Container className="my-5">
          <Row>
            <Col>
              <h1>Task Manager for you</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={isEditing ? handleSaveTask : handleAddTask}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={isEditing ? editTask.title : newTask.title}
                    // onChange={(e) =>
                    //   setNewTask({ ...newTask, title: e.target.value })
                    // }
                    onChange={(event) => {
                      if (isEditing) {
                        setEditTask({ ...editTask, title: event.target.value });
                      } else {
                        setNewTask({ ...newTask, title: event.target.value });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    // value={newTask.description}
                    // onChange={(e) =>
                    //   setNewTask({ ...newTask, description: e.target.value })
                    // }
                    value={
                      isEditing ? editTask.description : newTask.description
                    }
                    onChange={(event) => {
                      if (isEditing) {
                        setEditTask({
                          ...editTask,
                          description: event.target.value,
                        });
                      } else {
                        setNewTask({
                          ...newTask,
                          description: event.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                {/* <Button variant="primary" type="submit">
                  Add Task
                </Button> */}
                <Button variant="primary" type="submit">
                  {isEditing ? "Save" : "Add"}
                </Button>
                {isEditing && (
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => {
                      setIsEditing(false);
                      setEditTask(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                <FormControl
                  placeholder="Search by title"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          {/* {isEditing && (
            <Row>
              <Col>
                <h2>Edit Task</h2>
                <Form onSubmit={handleSaveTask}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="me-2">
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Form>
              </Col>
            </Row>
          )} */}
        </Container>
      )}
    </div>
  );
}

export default About;
