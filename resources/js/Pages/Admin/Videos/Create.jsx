import React, { useEffect } from "react";
import { router, useForm, Head, Link } from "@inertiajs/react";
import { showSuccessAlert } from "@/Components/SweetAlert";
import Authenticated from "@/Layouts/Admin/AuthenticatedLayout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addRequiredMarkers, encryptString } from "@/helper";
import MySelect from "@/Components/MySelect";

const Create = ({ auth, errors: propErrors, video, languages, genres, actors, directors }) => {

    const { errors: formErrors, setError, clearErrors, data, setData, reset } = useForm({
        name: video?.name || "",
        description: video?.description || "",
        upcoming: video?.upcoming || "2",
        access: video?.access || "paid",
        languages: video?.languages?.map(language => ({
            value: encryptString(language.id),
            label: language.name
        })) || [],
        genres: video?.genres?.map(genre => ({
            value: encryptString(genre.id),
            label: genre.name
        })) || [],
        actors: video?.actors?.map(actor => ({
            value: encryptString(actor.id),
            label: actor.name
        })) || [],
        directors: video?.directors?.map(director => ({
            value: encryptString(directors.id),
            label: director.name
        })) || [],
        imdb_id: video?.imdb_id || "",
        imdb_rating: video?.imdb_rating || "",
        content_rating: video?.content_rating || "",
        release_date: video?.release_date || "",
        duration: video?.duration || "",
        status: video?.status || "1",
        seo_title: video?.seo_title || "",
        meta_description: video?.meta_description || "",
        keywords: video?.keywords || "",

        thumbnail: null,
        poster: null,

        trailer_url: video?.trailer_url || "",

        video_quality: video?.video_quality || 2,
        video_type: video?.video_type || "1",
        video_local: null,
        video_local_480: null,
        video_local_720: null,
        video_local_1080: null,
        video_url: video?.video_url || '',
        video_url_480: video?.video_url_480 || '',
        video_url_720: video?.video_url_720 || '',
        video_url_1080: video?.video_url_1080 || '',
        video_hls: video?.video_hls || '',
        video_embed_code: video?.video_embed_code || '',

        download_enable: video?.download_enable || 2, // 2 is inactive 1 is active
        download_url: video?.download_url || '',

        subtitle_enable: video?.subtitle_enable || 2,

    });

    useEffect(() => {
        addRequiredMarkers();
    }, []);

    const errors = {...propErrors, ...formErrors};

    const handleImdbRatingChange = (e) => {
        const value = e.target.value;
        const regex = /^(?:[1-9]|10)(?:\.\d)?$/; // Regex for 1-10 with one decimal place

        if (value && !regex.test(value)) {
            setError('imdb_rating', "Please enter a valid rating between 1 and 10, with up to one decimal place.");
        } else {
            clearErrors("imdb_rating");
        }
        setData("imdb_rating", value);
    };

    const handleContentRatingChange = (e) => {
        const value = e.target.value;
        const minRating = 16; // Minimum allowed rating

        // Extract the numerical part from the input value
        const ratingNumber = parseInt(value.replace("+", ""), 10);

        // Check if the rating is less than the minimum allowed rating
        if (value && isNaN(ratingNumber) || value && value.length > 3) {
            setError("content_rating", "Content rating like 16+ , 13+ , 18+ ....");
        } else {
            clearErrors("content_rating");
        }
        // // Check if the rating is less than the minimum allowed rating
        // if (value && isNaN(ratingNumber) || value && ratingNumber < minRating) {
        //     setError("content_rating", "Content rating must be 16+ or higher.");
        // } else {
        //     clearErrors("content_rating");
        // }

        setData("content_rating", value);
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;
        const regex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // Ensure pattern validation

        if (value && !regex.test(value)) {
            setError('duration', "Please enter a valid duration in HH:MM:SS format.");
        } else {
            clearErrors('duration');
        }

        setData('duration', value);
    };

    const handleImageFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
            setError(name, 'Only JPEG and PNG files are allowed.');
        } else {
            clearErrors(name);
        }
        setData(name, file);

    };

    const handleTrailerUrlChange = (e) => {
        const url = e.target.value;

        // Regular expressions for supported formats
        const mp4Regex = /\.mp4$/;
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/;
        const hlsRegex = /\.m3u8$/;

        // Validate the URL
        if (!(mp4Regex.test(url) || youtubeRegex.test(url) || vimeoRegex.test(url) || hlsRegex.test(url))) {
            setError("trailer_url", "Please enter a valid URL like http://example.com/video.mp4 or https://youtube.com/watch?v=dQw4w9WgXcQ (Supported: MP4, YouTube, Vimeo, HLS/m3u8).");
        } else {
            clearErrors("trailer_url");
        }

        setData("trailer_url", url);
    };

    const handleVideoFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        const mp4Regex = /\.mp4$/;

        if (file && !mp4Regex.test(file.name)) {
            setError(name, "Invalid file type. Only MP4 files are supported.");
            return;
        }
        clearErrors(name);
        setData(name, file);
    };

    const handleDownloadUrlChange = (e) => {
        const url = e.target.value;

        // Regular expression for validating MP4 download URLs
        const mp4Regex = /\.mp4$/;

        // Validate the URL
        if (url && !mp4Regex.test(url)) {
            setError("download_url", "Please enter a valid MP4 download URL ending with .mp4. Example :: http://example.com/download/video.mp4");
        } else {
            clearErrors("download_url");
        }

        setData("download_url", url);
    };

    const handleMultiSelectChange = (name, selectedOptions) => {
        // Map through selected options and return the correct object format
        const values = selectedOptions.map((option) => ({
            value: encryptString(option.value),
            label: option.label
        }));
        // Update form data with the selected values
        setData(name, values);
    };

    const handleVideoTypeChange = (e) => {
        setData("video_type", e.target.value);
    };


    const handleImdbImport = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(route("admin.videos.import_imdb"), {
                imdb_id: data.imdb_id,
            });

            if (response.data.video) {
                setData({
                    ...data,
                    ...response.data.video,
                });
                showSuccessAlert(response.data.success);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Failed to import video.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (video) {
            await router.post(
                route("admin.videos.save", video.id),
                {
                    ...data
                },
                {
                    onSuccess: () =>
                        showSuccessAlert("Video updated successfully."),
                }
            );
        } else {
            await router.post(route("admin.videos.save"), data, {
                onSuccess: () => {
                    showSuccessAlert("Video created successfully.");
                    reset();
                },
            });
        }
    };

    const getVideoTypeLabel = (value) => {
        switch (value) {
            case '1':
                return 'Local';
            case '2':
                return 'URL';
            case '3':
                return 'HLS/m3u8 / MPEG-DASH / YouTube / Vimeo';
            case '4':
                return 'Embed Code';
            default:
                return '';
        }
    };   

console.log(data);

    return (
        <Authenticated user={auth.user}>
            <Head title={video ? "Edit Video" : "Add Video"} />

            <div className="card-box table-responsive">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb text-primary" style={{justifyContent: 'flex-end'}}>
                        <li className="breadcrumb-item"><Link href={route('admin.dashboard')}>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link href={route('admin.videos')}>Videos</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Video</li>
                    </ol>
                </nav>

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                        Import From IMDb
                    </label>
                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="imdb_id_title"
                            value={data.imdb_id}
                            onChange={(e) => setData('imdb_id', e.target.value)}
                            placeholder="Enter IMDb ID (e.g. tt1469304)"
                        />
                        <small className="form-text text-muted">
                            (Recommended: Search by IMDb ID for better results)
                        </small>
                    </div>
                    <div className="col-sm-2">
                        <button
                            onClick={handleImdbImport}
                            className="btn btn-primary mt-1 pt-2 pb-2 pl-3 pr-3"
                        >
                            Fetch
                        </button>
                    </div>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">

                
                    <div className="row">
                        <div className="col-md-6">
                            <h4
                                className="header-title m-t-0 m-b-30"
                                style={{ fontSize: "20px" }}
                            >
                                Video Info
                            </h4>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Video Names
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value) }
                                        required
                                    />
                                    {errors && errors.name && (<span className="text-danger">{errors.name}</span>)}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Description
                                </label>
                                <div className="col-sm-8">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData("description", data);
                                        }}
                                    />
                                    {errors && errors.description && (
                                        <span className="text-danger">{errors.description}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Upcoming
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        className={`${errors.upcoming ? 'is-invalid' : ''}`}
                                        name="upcoming"
                                        value={data.upcoming ? { value: data.upcoming, label: data.upcoming == '1' ? 'Yes' : 'No' } : null}
                                        onChange={(selectedOption) => setData("upcoming", selectedOption ? selectedOption.value : '')}
                                        options={[
                                            { value: '1', label: 'Yes' },
                                            { value: '2', label: 'No' },
                                        ]}
                                        isClearable={false}
                                    />
                                    {errors.upcoming && (
                                        <span className="invalid-feedback">{errors.upcoming}</span>
                                    )}
                                    <small className="form-text text-muted">
                                        (Upcoming display only on Home page)
                                    </small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Movie Access</label>
                                <div className="col-sm-8">
                                    <MySelect
                                        className={`${errors.access ? 'is-invalid' : ''}`}
                                        name="access"
                                        value={data.access ? { value: data.access, label: data.access.charAt(0).toUpperCase() + data.access.slice(1) } : null}
                                        onChange={(selectedOption) => setData("access", selectedOption ? selectedOption.value : '')}
                                        options={[
                                            { value: 'paid', label: 'Paid' },
                                            { value: 'free', label: 'Free' },
                                        ]}
                                        isClearable={false}
                                    />
                                    {errors.access && (
                                        <span className="invalid-feedback">{errors.access}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Languages
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        style={{ border: 'none' }}
                                        className={`${errors.languages ? 'is-invalid' : ''}`}
                                        name="languages"
                                        required
                                        options={languages.map(language => ({ value: encryptString(language.id), label: language.name }))}
                                        value={data.languages}
                                        isMulti={true}
                                        onChange={(selected) => handleMultiSelectChange("languages", selected)}
                                    />
                                    {errors && errors.languages && (
                                        <span className="invalid-feedback">{errors.languages}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Genres
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        style={{ border: 'none' }}
                                        className={`${errors.genres ? 'is-invalid' : ''}`}
                                        name="genres"
                                        required
                                        isMulti
                                        options={genres.map(genre => ({ value: encryptString(genre.id), label: genre.name }))}
                                        value={data.genres}
                                        onChange={(selected) => handleMultiSelectChange("genres", selected)}
                                    />
                                    {errors && errors.genres && (
                                        <span className="text-danger">{errors.genres}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Actors
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        style={{ border: 'none' }}
                                        className={`${errors.genres ? 'is-invalid' : ''}`}
                                        name="actors"
                                        isMulti
                                        options={actors.map(actor => ({ value: encryptString(actor.id), label: actor.name }))}
                                        value={data.actors}
                                        onChange={(selected) => handleMultiSelectChange("actors", selected)}
                                    />
                                    {errors && errors.actors && (<span className="text-danger">{errors.actors}</span>)}
                                </div>
                            </div>

                            {/* <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Directors
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        style={{ border: 'none' }}
                                        className={`${errors.directors ? 'is-invalid' : ''}`}
                                        name="directors"
                                        isMulti
                                        options={directors.map(director => ({ value: encryptString(director.id), label: director.name }))}
                                        value={data.directors}

                                        onChange={(selected) => handleMultiSelectChange("directors", selected)}
                                    />
                                    {errors && errors.directors && (<span className="text-danger">{errors.directors}</span>)}
                                </div>
                            </div> */}

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    IMDb Rating
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control isRating"
                                        type="text"
                                        name="imdb_rating"
                                        value={data.imdb_rating}
                                        onChange={handleImdbRatingChange}
                                        title="IMDb rating must be a decimal number between 1 and 10"
                                    />
                                    {errors.imdb_rating && (
                                        <span className="text-danger">{errors.imdb_rating}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Content Rating
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="content_rating"
                                        placeholder="16+"
                                        value={data.content_rating}
                                        onChange={handleContentRatingChange}
                                    />
                                    {errors && errors.content_rating && (
                                        <span className="text-danger">{errors.content_rating}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Release Date
                                </label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="release_date"
                                        value={data.release_date}
                                        onChange={(e) => setData("release_date", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Duration
                                </label>
                                <div className="col-sm-8">
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="duration"
                                            title="Please enter a valid duration in HH:MM:SS format."
                                            placeholder="00:00:00"
                                            value={data.duration}
                                            onChange={handleDurationChange}
                                        />
                                        {/* <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-clock-o"></i>
                                            </span>
                                        </div> */}
                                    </div>
                                    {errors.duration && (
                                        <span className="text-danger">{errors.duration}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">
                                    Status
                                </label>
                                <div className="col-sm-8">
                                    <MySelect
                                        name="status"
                                        value={data.status ? { value: data.status, label: data.status === '1' ? 'Active' : 'Inactive' } : null}
                                        onChange={(selectedOption) => setData("status", selectedOption ? selectedOption.value : '')}
                                        options={[
                                            { value: '1', label: 'Active' },
                                            { value: '2', label: 'Inactive' },
                                        ]}
                                        isClearable={false}
                                    />
                                </div>
                            </div>

                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                            <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: "20px" }} > SEO </h4>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> SEO Title </label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="seo_title"
                                        className="form-control"
                                        value={data.seo_title}
                                        onChange={(e) => setData("seo_title", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Meta Description</label>
                                <div className="col-sm-8">
                                    <textarea
                                        className="form-control"
                                        name="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) => setData("meta_description", e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Keyword</label>
                                <div className="col-sm-8">
                                    <textarea
                                        className="form-control"
                                        name="keywords"
                                        value={data.keywords}
                                        onChange={(e) => setData("keywords", e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: "20px" }} >Poster,Thumbnail &amp; Video</h4>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Video Thumb</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="thumbnail"
                                        onChange={handleImageFileChange}
                                        required={!video}
                                    />
                                    {errors && errors.thumbnail && (<span className="text-danger">{errors.thumbnail}</span>)}
                                    <small className="form-text text-muted">(Recommended resolution: 270x390)</small>
                                </div>
                            </div>

                            {data.thumbnail && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            style={{width: '110px'}}
                                            className="img-thumbnail"
                                            src={URL.createObjectURL(data.thumbnail)}
                                            alt="video thumb"
                                        />
                                    </div>
                                </div>
                            )}

                            {video?.thumbnail && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            style={{width: '110px'}}
                                            className="img-thumbnail"
                                            src={`/storage/upload/images/videos/${video.thumbnail}`}
                                            alt="video thumb"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Video Poster</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="poster"
                                        onChange={handleImageFileChange}
                                    />
                                    {errors && errors.poster && (<span className="text-danger">{errors.poster}</span>)}
                                    <small className="form-text text-muted">(Recommended resolution: 800x450)</small>
                                </div>
                            </div>

                            {data.poster && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            src={URL.createObjectURL(data.poster)}
                                            alt="video poster"
                                            className="img-thumbnail"
                                            width="160"
                                        />
                                    </div>
                                </div>
                            )}

                            {video?.poster && (
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">&nbsp;</label>
                                    <div className="col-sm-8">
                                        <img
                                            style={{width: '110px'}}
                                            className="img-thumbnail"
                                            src={`/storage/upload/images/videos/${video.poster}`}
                                            alt="video poster"
                                        />
                                    </div>
                                </div>
                            )}

                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Trailer URL</label>
                                <div className="col-sm-8">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="trailer_url"
                                        value={data.trailer_url}
                                        onChange={handleTrailerUrlChange}
                                        placeholder="Example: http://example.com/video.mp4 or https://youtube.com/watch?v=dQw4w9WgXcQ"
                                    />
                                    {errors && errors.trailer_url && (
                                        <span className="text-danger">{errors.trailer_url}</span>
                                    )}
                                </div>
                                <div className="col-sm-11">
                                    <small className="form-text text-muted">
                                        (Supported: MP4, YouTube, Vimeo, HLS / m3u8 URL. If you are using external files then those files have to be <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" className="text-info">CORS</Link> enabled otherwise they will not work.)
                                    </small><br />
                                </div>
                            </div>

                            {data.upcoming == "2" && (
                                <>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Video Upload Type</label>
                                    <div className="col-sm-8">
                                        <MySelect
                                            name="video_type"
                                            value={data.video_type ? {
                                                value: data.video_type, 
                                                label: getVideoTypeLabel(data.video_type)
                                            } : null}
                                            onChange={(selectedOption) => handleVideoTypeChange(selectedOption.value)}
                                            options={[
                                                { value: '1', label: 'Local' },
                                                { value: '2', label: 'URL' },
                                                { value: '3', label: 'HLS/m3u8 / MPEG-DASH / YouTube / Vimeo' },
                                                { value: '4', label: 'Embed Code' },
                                            ]}
                                            isClearable={false}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Video Quality
                                        <small className="form-text text-muted">(For Local and URL)</small>
                                    </label>
                                    <div className="col-sm-8">
                                        <div className="radio radio-success form-check-inline pl-2" style={{marginTop: '8px'}}>
                                            <input type="radio" value="1" name="video_quality"
                                                checked={data.video_quality == 1}
                                                onChange={() => setData("video_quality", 1)}
                                            />
                                            <label> Active </label>
                                        </div>
                                        <div className="radio form-check-inline" style={{marginTop: '8px'}}>
                                            <input type="radio" value="2" name="video_quality"
                                                checked={data.video_quality == 2}
                                                onChange={() => setData("video_quality", 2)}
                                            />
                                            <label> Inactive </label>
                                        </div>
                                    </div>
                                </div>

                                {data.video_type == "1" && (
                                    <div className="form-group row">
                                        <div className="col-sm-11">
                                            <small className="form-text text-muted">(Supported: MP4)</small><br />
                                        </div>

                                        <label className="col-sm-3 col-form-label">
                                            Video File
                                            <small className="form-text text-muted">(Default Player File)</small>
                                        </label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                type="file"
                                                name="video_local"
                                                className="form-control"
                                                onChange={handleVideoFileChange}
                                            />
                                            {errors.video_local && <span className="text-danger">{errors.video_local}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 480P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                type="file"
                                                name="video_local_480"
                                                className="form-control"
                                                onChange={handleVideoFileChange}
                                            />
                                            {errors.video_local_480 && <span className="text-danger">{errors.video_local_480}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 720P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                type="file"
                                                name="video_local_720"
                                                className="form-control"
                                                onChange={handleVideoFileChange}
                                            />
                                            {errors.video_local_720 && <span className="text-danger">{errors.video_local_720}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 1080P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                type="file"
                                                name="video_local_1080"
                                                className="form-control"
                                                onChange={handleVideoFileChange}
                                            />
                                            {errors.video_local_1080 && <span className="text-danger">{errors.video_local_1080}</span>}
                                        </div>
                                    </div>

                                )}

                                {data.video_type == "2" && (
                                    <div className="form-group row">
                                        <div className="col-sm-11">
                                            <small className="form-text text-muted">
                                                (Supported: MP4 URL. If you are using external files, they must be <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" className="text-blue-500">CORS</Link> enabled, otherwise they will not work.)
                                            </small><br />
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video URL</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video_url"
                                                value={data.video_url}
                                                onChange={(e) => setData("video_url", e.target.value)}
                                            />
                                            {errors.video_url && <span className="text-danger">{errors.video_url}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 480P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video_url_480"
                                                value={data.video_url_480}
                                                onChange={(e) => setData("video_url_480", e.target.value)}
                                            />
                                            {errors && errors.video_url_480 && <span className="text-danger">{errors.video_url_480}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 720P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video_url_720"
                                                value={data.video_url_720}
                                                onChange={(e) => setData("video_url_720", e.target.value)}
                                            />
                                            {errors && errors.video_url_720 && <span className="text-danger">{errors.video_url_720}</span>}
                                        </div>

                                        <label className="col-sm-3 col-form-label">Video File 1080P</label>
                                        <div className="col-sm-8 mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video_url_1080"
                                                value={data.video_url_1080}
                                                onChange={(e) => setData("video_url_1080", e.target.value)}
                                            />
                                            {errors && errors.video_url_1080 && <span className="text-danger">{errors.video_url_1080}</span>}
                                        </div>
                                    </div>
                                )}

                                {data.video_type === "3" && (
                                    <div className="form-group row">
                                        <div className="col-sm-11">
                                            <small className="form-text text-muted">
                                            (Supported : MP4, YouTube, Vimeo, HLS / m3u8 URL. If you are using external files then those files have to be <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" className="text-blue-500">CORS</Link> enabled otherwise they will not work.)
                                            </small><br />
                                        </div>

                                        <label className="col-sm-3 col-form-label">HLS/m3u8 URL</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="video_hls"
                                                value={data.video_hls}
                                                onChange={(e) => setData('video_hls', e.target.value)}
                                            />
                                            {errors && errors.hls_url && (
                                                <span className="text-danger">{errors.hls_url}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {data.video_type === "4" && (
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Embed Code</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                className="form-control"
                                                name="video_embed_code"
                                                value={data.embed_code}
                                                onChange={(e) => setData("video_embed_code", e.target.value)}
                                            ></textarea>
                                            {errors && errors.video_embed_code && (
                                                <span className="text-danger">{errors.video_embed_code}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Download</label>
                                    <div className="col-sm-8">
                                        <div className="radio radio-success form-check-inline pl-2" style={{marginTop: '8px'}}>
                                            <input type="radio" value="1" name="download_enable"
                                                checked={data.download_enable == 1}
                                                onChange={() => setData("download_enable", 1)}
                                            />
                                            <label > Active </label>
                                        </div>
                                        <div className="radio form-check-inline" style={{marginTop: '8px'}}>
                                            <input type="radio" value="2" name="download_enable"
                                                checked={data.download_enable == 2}
                                                onChange={() => setData("download_enable", 2)}
                                            />
                                            <label > Inactive </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Download URL</label>
                                    <div className="col-sm-8">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="download_url"
                                            value={data.download_url}
                                            onChange={handleDownloadUrlChange}
                                            placeholder="Example: http://example.com/download/video.mp4"
                                        />
                                        {errors && errors.download_url && (
                                            <span className="text-danger">{errors.download_url}</span>
                                        )}
                                    </div>
                                    <div className="col-sm-11">
                                        <small className="form-text text-muted">
                                            (Supported: Direct MP4 download links. Ensure that the URL is accessible and properly formatted.)
                                        </small><br />
                                    </div>
                                </div>

                                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                                <h4 className="m-t-0 m-b-15 header-title" style={{ fontSize: '20px' }}>Subtitles</h4>
                                <div className="col-sm-9 pl-0">
                                    <small className="form-text text-muted">
                                        (Supported: .srt or .vtt files URL only. If you are using external files then those files have to be
                                        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" className="text-blue-500"> CORS </Link>
                                        enabled otherwise they will not work.)
                                    </small>
                                </div>
                                <br />

                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Subtitles</label>
                                    <div className="col-sm-8">
                                        <div className="radio radio-success form-check-inline pl-2" style={{ marginTop: '8px' }}>
                                            <input
                                                type="radio"
                                                value="1"
                                                name="subtitle_enable"
                                                checked={data.subtitle_enable === 1}
                                                onChange={() => setData("subtitle_enable", 1)}
                                            />
                                            <label>Active</label>
                                        </div>
                                        <div className="radio form-check-inline" style={{ marginTop: '8px' }}>
                                            <input
                                                type="radio"
                                                value="2"
                                                name="subtitle_enable"
                                                checked={data.subtitle_enable === 2}
                                                onChange={() => setData("subtitle_enable", 2)}
                                            />
                                            <label>Inactive</label>
                                        </div>
                                    </div>
                                </div>

                                {[1, 2, 3].map(index => (
                                    <React.Fragment key={index}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Language {index}</label>
                                            <div className="col-sm-8">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name={`subtitle_language${index}`}
                                                    id={`subtitle_language${index}`}
                                                    placeholder={`Language ${index}`}
                                                    value={data[`subtitle_language${index}`] || ''}
                                                    onChange={(e) => setData(`subtitle_language${index}`, e.target.value)}
                                                />
                                                {errors && errors[`subtitle_language${index}`] && (
                                                    <span className="text-danger">{errors[`subtitle_language${index}`]}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">
                                                Subtitle URL {index}
                                                <small className="form-text text-muted">(URL only)</small>
                                            </label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name={`subtitle_url${index}`}
                                                    id={`subtitle_url${index}`}
                                                    value={data[`subtitle_url${index}`] || ''}
                                                    placeholder="http://example.com/demo.srt"
                                                    className="form-control"
                                                    onChange={(e) => setData(`subtitle_url${index}`, e.target.value)}
                                                />
                                                {errors && errors[`subtitle_url${index}`] && (
                                                    <span className="text-danger">{errors[`subtitle_url${index}`]}</span>
                                                )}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                                </>
                            )}

                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                {video ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;

