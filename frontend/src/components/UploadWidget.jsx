import { useEffect, useRef, useState} from 'react'

const UploadWidget = ({onUpload}) => { 
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [buttonText, setButtonText] = useState('Upload Image')

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'ddynov0dn',
      uploadPreset: 'htlitifr',
      maxFiles: 1
    }, (error, result) => {
      if (result.event === 'success') {
        onUpload(result.info.secure_url)
        setButtonText('Uploaded!')
      } 
    })
  }, [onUpload, buttonText])

  return (
    <button type="button" onClick={() => widgetRef.current.open()}>{buttonText}</button>
  )
};

export default UploadWidget