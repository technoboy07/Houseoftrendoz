import React from 'react';
import { 
  FiSearch, 
  FiUser, 
  FiHeart, 
  FiShoppingBag, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiStar,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiShoppingCart,
  FiHome,
  FiGrid,
  FiFilter,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiTruck,
  FiShield,
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiLinkedin
} from 'react-icons/fi';

// Logo Component
export const LogoIcon = ({ className = "w-8 h-8" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <span className="font-serif text-2xl font-bold text-luxury-black">HOT</span>
  </div>
);

// Search Icon
export const SearchIcon = ({ className = "w-6 h-6" }) => (
  <FiSearch className={`${className} text-luxury-black hover:text-luxury-gold transition-colors duration-300`} />
);

// User Icon
export const UserIcon = ({ className = "w-6 h-6" }) => (
  <FiUser className={`${className} text-luxury-black hover:text-luxury-gold transition-colors duration-300`} />
);

// Heart/Wishlist Icon
export const HeartIcon = ({ className = "w-6 h-6", filled = false }) => (
  <FiHeart 
    className={`${className} ${filled ? 'text-red-500 fill-current' : 'text-luxury-black hover:text-red-500'} transition-colors duration-300`} 
  />
);

// Shopping Bag Icon with item count
export const BagIcon = ({ className = "w-6 h-6", itemCount = 0 }) => (
  <div className="relative">
    <FiShoppingBag className={`${className} text-luxury-black hover:text-luxury-gold transition-colors duration-300`} />
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    )}
  </div>
);

// Menu Icon
export const MenuIcon = ({ className = "w-6 h-6" }) => (
  <FiMenu className={`${className} text-luxury-black`} />
);

// Close Icon
export const CloseIcon = ({ className = "w-6 h-6" }) => (
  <FiX className={`${className} text-luxury-black`} />
);

// Chevron Down
export const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <FiChevronDown className={`${className} text-luxury-gray`} />
);

// Chevron Right
export const ChevronRightIcon = ({ className = "w-4 h-4" }) => (
  <FiChevronRight className={`${className} text-luxury-gray`} />
);

// Star Rating
export const StarIcon = ({ className = "w-4 h-4", filled = false }) => (
  <FiStar 
    className={`${className} ${filled ? 'text-luxury-gold fill-current' : 'text-luxury-gray'} transition-colors duration-300`} 
  />
);

// Plus Icon
export const PlusIcon = ({ className = "w-4 h-4" }) => (
  <FiPlus className={`${className} text-luxury-black`} />
);

// Minus Icon
export const MinusIcon = ({ className = "w-4 h-4" }) => (
  <FiMinus className={`${className} text-luxury-black`} />
);

// Trash Icon
export const TrashIcon = ({ className = "w-4 h-4" }) => (
  <FiTrash2 className={`${className} text-red-500 hover:text-red-700`} />
);

// Edit Icon
export const EditIcon = ({ className = "w-4 h-4" }) => (
  <FiEdit className={`${className} text-luxury-gray hover:text-luxury-black`} />
);

// Eye Icon
export const EyeIcon = ({ className = "w-4 h-4" }) => (
  <FiEye className={`${className} text-luxury-gray hover:text-luxury-black`} />
);

// Shopping Cart Icon
export const CartIcon = ({ className = "w-6 h-6" }) => (
  <FiShoppingCart className={`${className} text-luxury-black hover:text-luxury-gold transition-colors duration-300`} />
);

// Home Icon
export const HomeIcon = ({ className = "w-5 h-5" }) => (
  <FiHome className={`${className} text-luxury-gray`} />
);

// Grid Icon
export const GridIcon = ({ className = "w-5 h-5" }) => (
  <FiGrid className={`${className} text-luxury-gray`} />
);

// Filter Icon
export const FilterIcon = ({ className = "w-5 h-5" }) => (
  <FiFilter className={`${className} text-luxury-gray`} />
);

// Sort Icons
export const SortAscIcon = ({ className = "w-4 h-4" }) => (
  <FiTrendingUp className={`${className} text-luxury-gray`} />
);

export const SortDescIcon = ({ className = "w-4 h-4" }) => (
  <FiTrendingDown className={`${className} text-luxury-gray`} />
);

// Arrow Icons
export const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <FiArrowRight className={`${className} text-luxury-black`} />
);

export const ArrowLeftIcon = ({ className = "w-5 h-5" }) => (
  <FiArrowLeft className={`${className} text-luxury-black`} />
);

// Check Icon
export const CheckIcon = ({ className = "w-5 h-5" }) => (
  <FiCheck className={`${className} text-green-500`} />
);

// Clock Icon
export const ClockIcon = ({ className = "w-5 h-5" }) => (
  <FiClock className={`${className} text-luxury-gray`} />
);

// Truck Icon
export const TruckIcon = ({ className = "w-5 h-5" }) => (
  <FiTruck className={`${className} text-luxury-gray`} />
);

// Shield Icon
export const ShieldIcon = ({ className = "w-5 h-5" }) => (
  <FiShield className={`${className} text-luxury-gray`} />
);

// Contact Icons
export const MailIcon = ({ className = "w-5 h-5" }) => (
  <FiMail className={`${className} text-luxury-gray`} />
);

export const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <FiPhone className={`${className} text-luxury-gray`} />
);

export const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <FiMapPin className={`${className} text-luxury-gray`} />
);

// Social Media Icons
export const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <FiInstagram className={`${className} text-luxury-gray hover:text-pink-500 transition-colors duration-300`} />
);

export const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <FiFacebook className={`${className} text-luxury-gray hover:text-blue-600 transition-colors duration-300`} />
);

export const TwitterIcon = ({ className = "w-5 h-5" }) => (
  <FiTwitter className={`${className} text-luxury-gray hover:text-blue-400 transition-colors duration-300`} />
);

export const YoutubeIcon = ({ className = "w-5 h-5" }) => (
  <FiYoutube className={`${className} text-luxury-gray hover:text-red-600 transition-colors duration-300`} />
);

export const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <FiLinkedin className={`${className} text-luxury-gray hover:text-blue-700 transition-colors duration-300`} />
);
