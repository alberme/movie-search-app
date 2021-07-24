import Navbar from 'react-bootstrap/Navbar';
import RBNav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'

import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Movie Database Tool</Navbar.Brand>
        <Navbar.Collapse>
          <RBNav>
            <RBNav.Link href="/">Movie Search</RBNav.Link>
            <RBNav.Link href="/user-movie-list">My Movie List</RBNav.Link>
              {/* <Link to="/">Home</Link>
              <Link to="/user-movie-list">My Movie List</Link> */}
          </RBNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;