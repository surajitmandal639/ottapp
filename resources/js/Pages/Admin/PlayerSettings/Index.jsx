import { showSuccessAlert } from '@/Components/SweetAlert';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        ...settings,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('player-settings.save'), {
            onSuccess: () => {
                showSuccessAlert('Settings updated successfully.');
            },
            onError: () => {
                showSuccessAlert('Something went wrong');
            }
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Player Settings" />
            <div className="card-box">
                <form
                    onSubmit={handleSubmit}
                    acceptCharset="UTF-8"
                    className="form-horizontal"
                    name="player_settings"
                    id="player_settings"
                    role="form"
                    encType="multipart/form-data"
                >
                    <input type="hidden" name="id" value="1" />

                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="m-t-0 m-b-30 header-title" style={{ fontSize: '20px' }}>Player Options</h4>

                            <br />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Player Style</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="style"
                                        value={data.style || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="classic_skin_dark">Classic Dark</option>
                                        <option value="metal_skin_dark">Metal Dark</option>
                                        <option value="minimal_skin_dark">Minimal Dark</option>
                                        <option value="modern_skin_dark">Modern Dark</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Vector Icons</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="vector_icons"
                                        value={data.vector_icons || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="no">NO</option>
                                        <option value="yes">YES</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Autoplay</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="autoplay"
                                        value={data.autoplay || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="yes">YES</option>
                                        <option value="no">NO</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Rewind and Forward</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="rewind_forward"
                                        value={data.rewind_forward || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="no">NO</option>
                                        <option value="yes">YES</option>
                                    </select>
                                </div>
                            </div>

                            <hr />

                            <h4 className="m-t-0 header-title">Player Watermark</h4>

                            <br />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Watermark</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="watermark"
                                        value={data.watermark || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="no">NO</option>
                                        <option value="yes">YES</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Player Logo</label>
                                <div className="col-sm-8">
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="logo"
                                            // value={data.logo || ''}
                                        />

                                    </div>
                                    <small className="form-text text-muted">(Recommended resolution : 180x50)</small>
                                    <div id="logo_holder" style={{ marginTop: '5px', maxHeight: '100px' }}></div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">&nbsp;</label>
                                <div className="col-sm-8">

                                    <img src={data.logo || '/images/player_logo.png'} alt="video image" className="img-thumbnail" width="160" style={{ backgroundColor: 'transparent' }}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Logo Position</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="logo_position"
                                        value={data.logo_position || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="topRight">Top Right</option>
                                        <option value="topLeft">Top Left</option>
                                        <option value="bottomRight">Bottom Right</option>
                                        <option value="bottomLeft">Bottom Left</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Player URL*</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="url"
                                        className="form-control"
                                        value={data.url || 'http://exampleurl.com'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <hr />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Default Ads</label>
                                <div className="col-sm-8">
                                    <select
                                        className="form-control"
                                        name="default_ads"
                                        value={data.default_ads || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="None">None (No Ads)</option>
                                        <option value="Custom">Built-in Advertisement</option>
                                        <option value="Vast">VAST, VMAP and IMA</option>
                                    </select>
                                    <small className="form-text text-muted">(Based on your Player Ads settings)</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">&nbsp;</label>
                                <div className="col-sm-8">
                                    <button
                                        type="submit"
                                        className="btn btn-primary waves-effect waves-light pull-right"
                                        disabled={processing}
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

                <div className="alert alert-danger">
                    <b>Note:</b> These settings only work with the web player
                </div>
            </div>
        </Authenticated>
    );
}
