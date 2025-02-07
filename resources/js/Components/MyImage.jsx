import React, { useEffect, useState } from 'react';

export default function MyImage({
    type = '',
    filename = '',
    fallbackImage = 'no_img.png',
    altText,
    ...props
}) {
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        const fetchImageUrl = async () => {
            
            // Define the fallback image path
            const fallbackPath = `${asset_url}/images/${fallbackImage}`;
            
            // If the filename is missing, invalid, or null, use the fallback image immediately
            if (filename == '' || filename == 'null' || filename == null) {
                setImageUrl(fallbackPath);
                return;
            }

            // Construct the file path based on the type and filename
            const filePath = type
                ? `${asset_url}/storage/upload/images/${type}/${filename}`
                : `${asset_url}/images/${filename}`;

            try {
                // Fetch the image to check if it exists
                const response = await fetch(filePath);

                if (response.ok) {
                    setImageUrl(filePath);  // Set image URL if the file is found
                } else {
                    setImageUrl(fallbackPath); // Fallback if the image is not found
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageUrl(fallbackPath); // Fallback in case of an error
            }
        };

        // Call the fetchImageUrl function
        fetchImageUrl();
    }, [type, filename, fallbackImage, asset_url]); // Dependency array to trigger re-fetch when any of these change

    return (
        <img
            {...props}
            src={imageUrl}
            alt={altText || `${type || 'Default'} Image`}
        />
    );
}