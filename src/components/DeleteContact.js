import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useContactsCrud } from "../context/ContactCrudContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// run the delete contact with removeContactHandler function from App.js
const DeleteContact = () => {
  const navigate = useNavigate();
  const {removeContactHandler} =useContactsCrud();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const { id,name, email } = data;

  const deleteId = (e) => {
    e.preventDefault();
   removeContactHandler(id);

    console.log(id + " id has been delete");
    navigate("/");
  };
  

    // to show the current id = name and email in detail
  
    return (
     
      <>
        <br></br>
        <br></br>
        <br></br>
        <Card>
          <h2>Are you sure you want to delete this user?</h2>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{email}</Card.Meta> 
            <Card.Description>
              <Button basic color="green" onClick={deleteId} >
                Yes
              </Button>

              <Link to="/">
                <Button basic color="red">
                  No
                </Button>
              </Link>
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  
}
export default DeleteContact;
