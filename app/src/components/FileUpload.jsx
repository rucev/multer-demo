import { useState } from "react";

const FileUpload = ({ setForceRefresh }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/images/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Upload successful');
                setForceRefresh(true)
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return <>
        <div className="w-full flex justify-center items-center flex-col gap-2 pt-5">
            <h1 className="font-bold text-lg">Multer Demo</h1>
            <div className="flex items-center justify-center w-full md:w-1/2">
                <input onChange={handleFileChange} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" />
            </div>
            <button onClick={handleUpload} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Upload your Image</button>
        </div>
    </>
}

export default FileUpload;