import { useNavigate } from "react-router-dom"

const ListingCard = ({ listing }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/listings/${listing.id}`)
  }

  return <div onClick={handleClick}>
     <img src={listing.image_src} alt={listing.title} />
     <h2>{listing.title}</h2>
  </div>
}

export default ListingCard