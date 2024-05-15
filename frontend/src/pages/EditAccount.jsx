import { useContext, useState } from "react"
import { useNavigate, Navigate, Link } from "react-router-dom"
import CurrentUserContext from "../contexts/CurrentUserContext.jsx"
import { createUser } from "../adapters/user-adapter"
import AccountForm from "../components/AccountForm.jsx";
//TODO: ...this is just a copy and paste of the sign up form! refactor to handle edits instead of creating
//a brand new resource
const EditAccount = () => {
	const navigate = useNavigate()
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
	const [errorText, setErrorText] = useState("")
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		display_name: "",
		pronouns: "",
		pfp_src: "",
	})

	if (currentUser) return <Navigate to='/' />

	const handleSubmit = async event => {
		event.preventDefault()
		setErrorText("")
		const { username, password, confirmPassword } = formData
		if (!username || !password)
			return setErrorText("Missing username or password")
		if (password !== confirmPassword)
			return setErrorText("Passwords do not match")

		const [user, error] = await createUser(formData)

		if (error) return setErrorText(error.message)
		if (!user) return setErrorText("Username taken")

		setCurrentUser(user)
		navigate("/")
	}

	return (
		<>
      <h1>Sign Up</h1>
      <AccountForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
			{errorText && <p>{errorText}</p>}
			<p>
				Already have an account with us? <Link to='/login'>Log in!</Link>
			</p>
		</>
	)
}

export default EditAccount
