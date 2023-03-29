import React from "react";
import user from "../images/user.png";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ContactCard = (props) => {
  const navigate = useNavigate();
  const { id, name, email } = props.contacts;
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={user} alt="user" />
          <Link
            
            to={{
              pathname: `/contact/${id}`,
            }}

            onClick={(e) => {
              e.preventDefault();
              navigate(`/contact/${id}`,{state: {id, name, email }});
            }}
          >
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{email}</Card.Meta>
          </Link>
        </Card.Content>
        <Card.Content extra>
          <Link
            to={{
              pathname: `/delete/${id}`,
            }}

            onClick={(e) => {
              e.preventDefault();
              navigate(`/delete/${id}`,{state: {id, name, email }});
            }}
          >
            <i
              className="trash alternate outline icon"
              style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
            ></i>
          </Link>
          <Link
            to={{
              pathname: `/edit`,
              state: { contacts: props.contacts },
            }}
          >
            <i
              className="edit alternate outline icon"
              style={{ color: "blue", marginTop: "7px" }}
            ></i>
          </Link>
        </Card.Content>
      </Card>
    </>
  );
};

export default ContactCard;
