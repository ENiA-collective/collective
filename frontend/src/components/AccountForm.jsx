import UploadWidget from "../components/buttons/UploadWidget"

const AccountForm = ({ handleSubmit, formData, setFormData, newUser }) => {

	const handleChange = event => {
		const { name, value } = event.target
		setFormData(prevData => ({
			...prevData,
			[name]: value,
    }))
    console.log(formData)
	}

	const handleImageUpload = secure_url => {
		setFormData(prevData => ({
			...prevData,
			pfp_src: secure_url,
		}))
	}

	return (
		<form onSubmit={handleSubmit} aria-labelledby='form-heading'>
      <h2 id='form-heading'>{newUser ? 'Create' : 'Edit' } Account</h2>
			<label htmlFor='username'>Username</label>
			<input
				autoComplete='off'
				type='text'
				id='username'
				name='username'
				onChange={handleChange}
				value={formData.username}
				required
			/>

			<label htmlFor='display-name'>Display Name</label>
			<input
				autoComplete='off'
				type='text'
				id='display-name'
				name='display_name'
				onChange={handleChange}
				value={formData.display_name}
			/>

			<label htmlFor='pronouns'>Pronouns</label>
			<input
				autoComplete='off'
				type='text'
				id='pronouns'
				name='pronouns'
				onChange={handleChange}
				value={formData.pronouns}
      />
      
      { !newUser && <>
        <label htmlFor='bio'>Bio</label>
        <input
          id='bio'
          onChange={handleChange}
          name='bio'
          value={formData.bio} />
        </>
      }

			<label htmlFor='password'>Password</label>
			<input
				autoComplete='off'
				type='password'
				id='password'
				name='password'
				onChange={handleChange}
				value={formData.password}
				required
			/>

			<label htmlFor='confirm-password'>Confirm Password</label>
			<input
				autoComplete='off'
				type='password'
				id='confirm-password'
				name='confirmPassword'
				onChange={handleChange}
				value={formData.confirmPassword}
				required
			/>

			<label htmlFor='profile-picture'>Profile Picture:</label>
			<UploadWidget id='profile-picture' onUpload={handleImageUpload} />

			{/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
            <label htmlFor="password-confirm">Password Confirm</label>
            <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
        */}

			<button>Submit</button>
		</form>
	)
}

export default AccountForm