import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img style={{height:'600px'}}
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2023/12/08/02/12/microphone-8436595_640.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{height:'600px'}}
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2020/08/26/14/29/technology-5519649_1280.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{height:'600px'}}
                    className="d-block w-100"
                    src="https://cdn.pixabay.com/photo/2020/09/23/20/28/headphones-5596990_1280.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkVariantExample;