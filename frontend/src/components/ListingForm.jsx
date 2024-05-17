import UploadWidget from "../components/buttons/UploadWidget"

const ListingForm = ({ handleSubmit, formData, setFormData }) => {
	
	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleImageUpload = secure_url => {
		setFormData(prevData => ({
			...prevData,
			image_src: secure_url,
		}))
	}


	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='title'>title</label>
				<input
					type='text'
					id='title'
					name='title'
					value={formData.title}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div>
				<label htmlFor='description'>Item Description:</label>
				<input
					type='text'
					id='description'
					name='description'
					value={formData.description}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div>
				<label htmlFor='upload-widget'>Item Image:</label>
				<UploadWidget id='upload-widget' onUpload={handleImageUpload} />
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}

export default ListingForm
