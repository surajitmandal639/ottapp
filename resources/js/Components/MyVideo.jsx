import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

export default function MyVideo({
    filename = '',
    fallbackVideo = 'no_video.mp4',
    altText = 'Video',
    ...props
}) {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
            // Define the fallback video path
            const fallbackPath = `${asset_url}/videos/${fallbackVideo}`;
            
            // If the filename is missing, invalid, or null, use the fallback video immediately
            if (!filename || filename === 'null') {
                setVideoUrl(fallbackPath);
                return;
            }

            // Construct the file path based on the type and filename
            const filePath = `${asset_url}/storage/upload/videos/${filename}`;

            try {
                // Fetch the video to check if it exists
                const response = await fetch(filePath);
                if (response.ok) {
                    setVideoUrl(filePath); // Set video URL if the file is found
                } else {
                    setVideoUrl(fallbackPath); // Use fallback if the video is not found
                }
            } catch (error) {
                console.error('Error fetching video:', error);
                setVideoUrl(fallbackPath); // Use fallback in case of an error
            }
        };

        fetchVideoUrl();
    }, [filename, fallbackVideo]);

    return (
        <>
            {videoUrl ? (
                <ReactPlayer 
                    url={videoUrl}
                    controls
                    width='100%'
                    height="auto"
                    {...props}
                />
            ) : (
                <p>{altText || 'Loading video...'}</p>
            )}
            </>
    );
}
