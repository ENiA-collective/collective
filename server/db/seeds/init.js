const User = require('../models/User');
const Listing = require('../models/Listing');
const Order = require('../models/Order');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('messages').del()
  await knex('orders').del();
  await knex('listings').del();
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE messages_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE listings_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // username, password, display name, pronouns, pfp_src, bio (optional)
  await User.create('cheeseburger', 'cheeseburger', 'Beese Churger', 'they/them', '');
  await User.create('nicole', 'nicole', 'Nicole!!', 'she/her', 'https://ca.slack-edge.com/TKZN62HDF-U05P4B24RTJ-ea65cd513e5d-512', 'Based in NYC | Looking for sweaters :)');
  await User.create('aleleoto', 'aleleoto', 'AL', 'she/they', 'https://t.ly/W7pWo', "I'm passionate about sustainable living and community sharing. My hobbies include fiber arts, gardening, reading, and DIY projects. I'm always looking for ways to contribute to a more eco-friendly neighborhood.");
  await User.create('epi', 'epi', 'Epi <3', 'she/her', 'https://res.cloudinary.com/ddynov0dn/image/upload/ahqtpuhodgjyllhm3p6p.png');
  await User.create('dualvector', '123', 'Steve', 'he/them', 'https://res.cloudinary.com/ddynov0dn/image/upload/zrvsucxcxtonemqrjkxc.png', "I love upcycling old clothes and finding new homes for items. I enjoy making music, creating art, and taking walks around the city. Committed to helping others and making the world a better place through generosity and kindness.");
  await User.create('eafrifa', 'manu89', 'eafrifa', 'He/His/Him', 'https://res.cloudinary.com/ddynov0dn/image/upload/v1716328069/zv0wlnke7wdvzw3sjzga.jpg', 'I am man.');
  await User.create('mekhim', 'TimeToLearn882', 'Mekhi M.', 'he/him', 'https://res.cloudinary.com/ddynov0dn/image/upload/v1716330045/htoj9wmdzredfni2vxht.png', "Reese's is my favorite chocolately flavor! I do like fruity candies more though. So I'll take any sweet clothing!");

  await Listing.create("Funny Hat", "Never used - Like new. Available for pickup in Sunset Park, Brooklyn.", 2, 40.7128, -74.0060, 'https://res.cloudinary.com/ddynov0dn/image/upload/g91od3e8rjzdx8ojujlj.png');
  await Listing.create("Cat hat", "Adorable knit cat hat! Available for pickup in Washington Heights.", 5, 40.7580, -73.9855, 'https://res.cloudinary.com/ddynov0dn/image/upload/wsek12m0nn3wgb4osqjo.png');
  await Listing.create("Milk Sweater", "Fun sweater for cat lovers - Pick up can be arranged near Industry City", 4, 40.7580, -73.9855, 'https://res.cloudinary.com/ddynov0dn/image/upload/vgztuuvfsf6tvyceatng.png');

  await Listing.create("Summer Dress", "Light and breezy dress, perfect for hot days.", 2, 40.7128, -74.0060, "https://i.ebayimg.com/images/g/MrUAAOSwK1pi3JU7/s-l1600.webp");
  await Listing.create("Cozy Sweater", "Soft and warm sweater, great for chilly evenings.", 3, 40.7580, -73.9855, "https://i.ebayimg.com/images/g/48cAAOSwr55mNkxV/s-l1600.webp");
  await Listing.create("Denim Jeans", "Classic denim jeans, in good condition.", 3, 40.7128, -74.0060, "https://i.ebayimg.com/images/g/KS4AAOSwL5pmTS25/s-l1600.webp");
  await Listing.create("Formal Shirt", "Crisp formal shirt, suitable for office wear.", 4, 40.7306, -73.9352, "https://res.cloudinary.com/ddynov0dn/image/upload/kbvzjsqogj4oaahfrjzj.png");
  await Listing.create("Athletic Shorts", "Comfortable athletic shorts, perfect for workouts.", 5, 40.7419, -74.0048, "https://res.cloudinary.com/ddynov0dn/image/upload/eyrvb39ql86yueiw5pno.png");
  await Listing.create("Casual T-Shirt", "Casual t-shirt, great for everyday wear.", 6, 40.7128, -74.0060, "https://res.cloudinary.com/ddynov0dn/image/upload/i3pcorpxcp94jw0tsaff.png");
  await Listing.create("Winter Coat", "Insulated winter coat, ideal for cold weather.", 7, 40.7558, -73.9862, "https://res.cloudinary.com/ddynov0dn/image/upload/k5xuq2rdivmjnbhj5oh8.png");
  await Listing.create("Party Dress", "Stylish party dress, perfect for special occasions.", 5, 40.7128, -74.0060, "https://res.cloudinary.com/ddynov0dn/image/upload/h73ofmmcieewrhkkkvaj.png");
  await Listing.create("Vintage Jacket", "Unique vintage jacket, adds character to any outfit.", 2, 40.7580, -73.9855, "https://res.cloudinary.com/ddynov0dn/image/upload/ruibo8ea6igoaf67alyo.png");
  await Listing.create("Kids' Overalls", "Adorable kids' overalls, gently used and still in good shape.", 3, 40.7128, -74.0060, "https://res.cloudinary.com/ddynov0dn/image/upload/eyehs9oh2akvuhgznemj.png");
  await Listing.create("Designer Handbag", "Luxurious designer handbag, looking for a new owner.", 5, 40.7419, -74.0048, "https://res.cloudinary.com/ddynov0dn/image/upload/zbfsu0eaqzytm39vuopb.png");

  // don't include orders
};