// resources\js\Components\Loder.jsx

import { Spinner } from "react-bootstrap";

export default function Loader() {
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center " style={{ zIndex: 1051, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <Spinner animation="grow" variant="warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                {/* <span className="visually-hidden">Loading...</span> */}
            </Spinner>
            <div className="ml-3 fs-4 text-primary font-weight-bold">Loading...</div>
        </div>
    );
}
