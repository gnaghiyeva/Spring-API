import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import {useAdminContext} from "../../context/AdminContext";
import LogoutIcon from '@mui/icons-material/Logout';
function BasicExample() {
    const [admin, setAdmin] = useAdminContext()
    console.log(admin)
    const navigate = useNavigate();

    const handleLogout = () => {
        // Local storage'dan admin anahtarını kaldır
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');

        // Kullanıcıyı giriş sayfasına yönlendir
        navigate('/admin/login');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <LogoutIcon onClick={handleLogout} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;