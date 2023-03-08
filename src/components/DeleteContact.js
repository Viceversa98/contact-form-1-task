import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

// run the delete contact with removeContactHandler function from App.js
class DeleteContact extends React.Component {
  delete = (e) => {
    e.preventDefault();
    this.props.removeContactHandler(this.props.location.state.contacts.id);

    console.log(this.props.location.state.contacts.id + " id has been delele");
    this.props.history.push("/");
  };

  render() {
    const { id, name, email } = this.props.location.state.contacts; // to show the current id = name and email in detail
    console.log(this.props);
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
              <Button basic color="green" key={id} onClick={this.delete}>
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
}
export default DeleteContact;
