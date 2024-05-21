import { useEffect, useRef, useState } from 'react';

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const [buttonText, setButtonText] = useState('Upload Image');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'ddynov0dn',
      uploadPreset: 'htlitifr',
      maxFiles: 1
    }, (error, result) => {
      if (result.event === 'success') {
        onUpload(result.info.secure_url);
        setButtonText('Uploaded!');
      }
    });
  }, [onUpload, buttonText]);

  return (
    <button
      type="button"
      onClick={() => widgetRef.current.open()}
      className="bg-white text-black rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
    >
      {buttonText}
    </button>
  );
};

export default UploadWidget;