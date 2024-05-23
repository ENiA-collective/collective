import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:transform hover:translate-y-[-5px] mb-4 break-inside-avoid-column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={listing.image_src} 
        alt={listing.title}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg text-text font-semibold mb-2">{listing.title}</h2>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start p-4 text-text">
          <div className="flex items-center space-x-2">
            {/* <img src={listing.profile_picture} alt={listing.username} className="w-10 h-10 rounded-full" /> */}
            <span>{listing.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingCard;
