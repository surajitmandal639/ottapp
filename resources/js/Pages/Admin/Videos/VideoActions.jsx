import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import ReactSwitch from "react-switch";
import { encryptString } from "@/helper"; // Ensure encryptString is correctly imported

export default function VideoActions ({ videoId, videoStatus, handleDelete, handleStatusChange }) {
    const [encryptedVideoId, setEncryptedVideoId] = useState("");

    // Encrypt the video ID
    const encryptVideoId = async (videoId) => {
        const secretKey = '0123456789abcdef0123456789abcdef'; // Must be 32 characters for AES-256
        const encrypted = await encryptString(videoId, secretKey); // Encrypt the video ID
        setEncryptedVideoId(encrypted.encryptedData); // Store encrypted ID in state
    };

    useEffect(() => {
        if (videoId) {
            encryptVideoId(videoId); // Call encryption function with videoId
        }
    }, [videoId]);

    return (
        <div className="card-body p-3">
            <Link
                href={route("admin.videos.create", encryptedVideoId)} // Use the encrypted ID in the route
                className="btn btn-icon waves-effect waves-light btn-success m-r-5"
                data-toggle="tooltip"
                title="Edit"
            >
                <i className="fa fa-edit"></i>
            </Link>
            <button
                onClick={() => handleDelete(videoId)}
                className="btn btn-icon waves-effect waves-light btn-danger"
                data-toggle="tooltip"
                title="Remove"
            >
                <i className="fa fa-remove"></i>
            </button>
            <label className="switch-toggle m-0 p-0 fl-right">
                <ReactSwitch
                    checked={videoStatus === 1}
                    onChange={(newState) => handleStatusChange(videoId, newState)}
                />
            </label>
        </div>
    );
}
