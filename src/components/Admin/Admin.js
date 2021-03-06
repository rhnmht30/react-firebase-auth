import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Session";
import { compose } from "recompose";

class AdminPage extends Component {
  state = {
    loading: false,
    users: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withFirebase,
  withAuthorization(condition)
)(AdminPage);
// export default withFirebase(withAuthorization(condition)(AdminPage));

// import React from 'react';

// import * as ROLES from '../../constants/roles';

// const AdminPage = () => (
//   <div>
//     <h1>Admin</h1>
//     <p>Restricted area! Only users with the admin role are authorized.</p>
//   </div>
// );
// const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

// export default withAuthorization(condition)(AdminPage);
