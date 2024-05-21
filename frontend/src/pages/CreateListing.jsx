import React, { useState, useEffect, useContext } from "react"
import ListingForm from "../components/ListingForm"
import CurrentUserContext from "../contexts/CurrentUserContext"
import { createListing } from "../adapters/listing-adapter"
import { useNavigate } from "react-router-dom"

const CreateListing = () => {
	const navigate = useNavigate()

	const { currentUser } = useContext(CurrentUserContext)
	const [errorText, setErrorText] = useState("")
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image_src: "",
		latitude: "",
		longitude: "",
		user_id: currentUser.id,
  })
  
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setFormData(prevData => ({
						...prevData,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					}))
				},
				error => {
					setErrorText("Error getting user location:", error)
				}
			)
		} else {
			setErrorText("Geolocation not supported by browser")
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()

		const { title, description, image_src } = formData

		if (!title) return setErrorText("Missing title")
		if (!description) return setErrorText("Missing description")
		if (!image_src) return setErrorText("Please upload an image")

		const [listing, error] = await createListing(formData)
		if (error) return setErrorText(error.message)

		navigate(-1)
	}

	//todo: make the words log in/ sign up links
	if (!currentUser) return <p>Please log in or sign up to be able to post.</p>

	return (
		<> {/*Replaced div with fragment as there's only two or 3 components here that do not
    need to be grouped together for styling*/}
	<div className="form">
			<center>
      <ListingForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {errorText && <p>{errorText}</p>} </center>
	  </div>
		</>
	)
}

export default CreateListing