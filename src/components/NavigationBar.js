import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavigationBar = () => {
  return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Books</Nav.Link>
              <Nav.Link href="/create">Add Book</Nav.Link>
             
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;