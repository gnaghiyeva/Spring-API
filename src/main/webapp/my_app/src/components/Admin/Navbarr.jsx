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
                        <Nav.Link href="/admin/products">Products</Nav.Link>
                        <Nav.Link href="/admin/categories">Categories</Nav.Link>
                    </Nav>
                    <LogoutIcon onClick={handleLogout} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;