import { useState, useEffect } from 'react';

const ImageList = ({ forceRefresh, setForceRefresh }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:3000/images');
                if (response.ok) {
                    const imageData = await response.json();
                    setImages(imageData);
                } else {
                    console.error('Failed to fetch images');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
            setForceRefresh(false)
        };

        fetchImages();
        console.log(images)
    }, [forceRefresh]);

    const handleDownload = async (imageId, imageName) => {
        try {
            const response = await fetch(`/images/download/${imageId}`);
            if (!response.ok) {
                throw new Error('Failed to download image');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = imageName;
            anchor.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div className="w-full flex justify-center items-center flex-col gap-2 pt-5">
            <h2 className="font-bold text-lg">Image List</h2>
            <ul className="flex flex-wrap gap-2 flex-row">
                {images.map((image) => (
                    <li key={image._id} className="max-w-sm py-2 px-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-1 justify-center items-center">
                        <img className="rounded-t-lg" src={`http://localhost:3000/uploads/${image.filename}`} alt={image.originalname} />
                        <button onClick={() => handleDownload(image._id, image.originalname)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Download
                        </button>
                    </li>
                ))
                }
            </ul >
        </div >
    );
};

export default ImageList;