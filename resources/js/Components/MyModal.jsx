import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MyModal = ({
    show,
    onHide,
    title,
    formData,
    setFormData,
    handleSubmit,
    errors,
    mode,
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId={`form${mode}GenreName`}
                    >
                        <Form.Label className="col-sm-4 col-form-label">
                            Genre Title
                        </Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                type="text"
                                placeholder="Enter genre title"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData("name", e.target.value)
                                }
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId={`form${mode}GenreStatus`}
                    >
                        <Form.Label className="col-sm-4 col-form-label">
                            Status
                        </Form.Label>
                        <div className="col-sm-8">
                            <Form.Control
                                as="select"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData("status", e.target.value)
                                }
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </Form.Control>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;
