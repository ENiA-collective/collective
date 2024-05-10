import { useEffect, useRef} from 'react'

const UploadWidget = ({onUpload}) => { 
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'ddynov0dn',
      uploadPreset: 'htlitifr',
      maxFiles: 1
    }, (error, result) => {
      if (result.event === 'success') {
        onUpload(result.info.secure_url)
        //to do: make it so that the button changes appearance depending on the upload status
      } 
    })
  }, [onUpload])

  return (
    <button onClick={() => widgetRef.current.open() }>Upload</button>
  )
};

export default UploadWidget