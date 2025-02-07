import React, { useEffect, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { Form } from "react-bootstrap";
import MyImage from "@/Components/MyImage";

const Create = ({ auth, errors, actor }) => {
    const { data, setData, processing, reset } = useForm({
        name: actor?.name || "",
        bio: actor?.bio || "",
        place_of_birth: actor?.place_of_birth || "",
        date_of_birth: actor?.date_of_birth || "",
        status: actor?.status || 1,
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [imgError, setImgError] = useState("");

    useEffect(() => {
        if (actor && actor.image_urls) {
            setImagePreviews(actor.image_urls);
        }
    }, [actor]);

    useEffect(() => {
        // Handle image-related errors
        const imageErrors = Object.keys(errors).filter((key) =>
            key.startsWith("images.")
        );
        if (imageErrors.length > 0) {
            setImgError(imageErrors.map((key) => errors[key]).join(", "));
        }
    }, [errors]);

    const handleFileChange = (e) => {
        const fileArray = Array.from(e.target.files);
        setData("images", fileArray);

        const filePreviews = fileArray.map((file) => URL.createObjectURL(file));
        setImagePreviews(filePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const msg = actor ? 'Actor updated successfully.' : 'Actor created successfully.';
        
        await router.post(route("actors.save", encryptString(data?.id)), // Pass encrypted ID directly
            { ...data },
            { onSuccess: () => {
                showSuccessAlert(msg);
                if (!actor) {
                    reset();
                }
            }}
        );
    };

    console.log(actor);
    

    return (
        <Authenticated user={auth.user}>
            <Head title={actor ? "Edit Actor" : "Add Actor"} />

            <div className="card-box table-responsive">
                <div className="row">
                    <Link href="#" onClick={() => window.history.back()}>
                        <h4
                            className="header-title m-t-0 m-b-30 text-primary pull-left"
                            style={{ fontSize: "20px" }}
                        >
                            <i className="fa fa-arrow-left"></i> Back
                        </h4>
                    </Link>
                </div>

                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId="name"
                    >
                        <Form.Label className="col-sm-2 col-form-label font-weight-bold">
                            Name
                        </Form.Label>
                        <Form.Control
                            className="col-sm-10"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            isInvalid={!!errors.name}
                            placeholder="Enter name"
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className=" offset-sm-2"
                        >
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId="bio"
                    >
                        <Form.Label className="col-sm-2 col-form-label font-weight-bold">
                            Bio
                        </Form.Label>
                        <Form.Control
                            className="col-sm-10"
                            as="textarea"
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                            isInvalid={!!errors.bio}
                            placeholder="Enter bio"
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className=" offset-sm-2"
                        >
                            {errors.bio}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId="place_of_birth"
                    >
                        <Form.Label className="col-sm-2 col-form-label font-weight-bold">
                            Place of Birth
                        </Form.Label>
                        <Form.Control
                            className="col-sm-10"
                            type="text"
                            value={data.place_of_birth}
                            onChange={(e) =>
                                setData("place_of_birth", e.target.value)
                            }
                            isInvalid={!!errors.place_of_birth}
                            placeholder="Enter place of birth"
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className=" offset-sm-2"
                        >
                            {errors.place_of_birth}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId="date_of_birth"
                    >
                        <Form.Label className="col-sm-2 col-form-label font-weight-bold">
                            Date of Birth
                        </Form.Label>
                        <Form.Control
                            className="col-sm-10"
                            type="date"
                            value={data.date_of_birth}
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
                            isInvalid={!!errors.date_of_birth}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className=" offset-sm-2"
                        >
                            {errors.date_of_birth}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="row align-items-center mb-3"
                        controlId="images"
                    >
                        <Form.Label className="col-sm-2 col-form-label font-weight-bold">
                            Images
                        </Form.Label>
                        <Form.Control
                            className="col-sm-10"
                            type="file"
                            name="images[]"
                            multiple
                            onChange={handleFileChange}
                        />

                        {/* Display image upload errors */}
                        <Form.Control.Feedback
                            className={
                                imgError
                                    ? "d-block text-danger offset-sm-2"
                                    : ""
                            }
                        >
                            {imgError}
                        </Form.Control.Feedback>

                        <small className="offset-sm-2 form-text text-muted mb-3">
                            (Recommended resolution: 180x140)
                        </small>
                    </Form.Group>

                    <Form.Group className="row mb-3">
                        <label className="offset-sm-2"></label>
                        {actor?.images?.length > 0 ? (
                            actor.images.map((image, index) => (
                                <MyImage 
                                    key={index}
                                    type="actors" 
                                    filename={image.filename}
                                    altText={`Image for ${actor.name}`}
                                    class="img-thumbnail mr-1" 
                                    style={{width: '180px'}}
                                />
                            ))
                        ) : (
                            <p className="offset-sm-2">No images available for this actor.</p>
                        )}
                    </Form.Group>

                    <Form.Group className="row align-items-center mb-3">
                        <div className="offset-sm-2 col-sm-9 pl-1">
                            <button
                                type="submit"
                                className="btn btn-primary waves-effect waves-light"
                                disabled={processing}
                            >
                                {actor ? "Update" : "Save"}
                            </button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </Authenticated>
    );
};

export default Create;
