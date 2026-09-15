// ==========================================
// MOCK DATA (temporary — will move to DB later)
// ==========================================

export const menuItems = [
    // Starters
    { id: 1, name: "Cheese Balls", category: "Starters", description: "Crispy fried cheese balls, golden and gooey.", price: 180, image: "/images/cheese-balls.jpg", status: "Available" },
    { id: 2, name: "Crispy Corn", category: "Starters", description: "Spicy tossed crispy corn, a party favorite.", price: 160, image: "/images/crispy-corn.jpg", status: "Available" },
    { id: 3, name: "Chicken Wings", category: "Starters", description: "Tandoori spiced chicken wings.", price: 260, image: "/images/chicken-wings.jpg", status: "Available" },
    { id: 4, name: "Chicken Tikka", category: "Starters", description: "Smoky char-grilled chicken tikka.", price: 280, image: "/images/chicken-tikka.jpg", status: "Available" },
    { id: 5, name: "Chicken Seekh Kebab", category: "Starters", description: "Minced chicken skewers with spices.", price: 270, image: "/images/chicken-seekh-kebab.jpg", status: "Available" },
    { id: 6, name: "Malai Seekh Kebab", category: "Starters", description: "Creamy, mild seekh kebabs.", price: 290, image: "/images/malai-seekh.jpg", status: "Available" },
    { id: 7, name: "Paneer Tikka", category: "Starters", description: "Marinated grilled cottage cheese cubes.", price: 220, image: "/images/paneer-tikka.jfif", status: "Available" },
    { id: 8, name: "Veg Cutlet", category: "Starters", description: "Classic mixed vegetable cutlets.", price: 150, image: "/images/veg-cutlet.jpg", status: "Available" },
    { id: 9, name: "Veg Spring Rolls", category: "Starters", description: "Crispy rolls with veggie stuffing.", price: 170, image: "/images/Veg-Spring-Rolls.jpg", status: "Available" },
    { id: 10, name: "Hara Bhara Kebab", category: "Starters", description: "Spinach & pea kebabs, healthy and tasty.", price: 190, image: "/images/Hara-Bhara-Kebab.jpg", status: "Available" },
    { id: 11, name: "Fish Fry", category: "Starters", description: "Coastal style spicy fried fish.", price: 320, image: "/images/fish-fry.jpg", status: "Available" },
  
    // Main Course
    { id: 12, name: "Chicken Biryani", category: "Main Course", description: "Fragrant basmati rice layered with spiced chicken.", price: 260, image: "/images/Chicken-Biryani.jpg", status: "Available" },
    { id: 13, name: "Mutton Biryani", category: "Main Course", description: "Rich, slow-cooked mutton biryani.", price: 340, image: "/images/Mutton-Biryani.jpg", status: "Available" },
    { id: 14, name: "Veg Biryani", category: "Main Course", description: "Aromatic vegetable dum biryani.", price: 220, image: "/images/Veg-Biryani.jpg", status: "Available" },
    { id: 15, name: "Chicken Seekh Biryani", category: "Main Course", description: "Biryani topped with seekh kebab pieces.", price: 300, image: "/images/chicken-seekh-biryani.jpg", status: "Available" },
    { id: 16, name: "Butter Chicken", category: "Main Course", description: "Creamy tomato-based chicken curry.", price: 290, image: "/images/butter-chicken.jpg", status: "Available" },
    { id: 17, name: "Chicken Korma", category: "Main Course", description: "Mild, rich Mughlai chicken curry.", price: 280, image: "/images/Chicken-Korma.jpg", status: "Available" },
    { id: 18, name: "Tandoori Chicken", category: "Main Course", description: "Charcoal-roasted tandoori chicken.", price: 300, image: "/images/Tandoori-Chicken.jpg", status: "Available" },
    { id: 19, name: "Paneer Butter Masala", category: "Main Course", description: "Cottage cheese in silky tomato gravy.", price: 240, image: "/images/Paneer-Butter-Masala.jpg", status: "Available" },
    { id: 20, name: "Malai Kofta", category: "Main Course", description: "Fried veg dumplings in creamy gravy.", price: 230, image: "/images/Malai-Kofta.jpg", status: "Available" },
    { id: 21, name: "Dal Makhani", category: "Main Course", description: "Slow-cooked black lentils with butter & cream.", price: 190, image: "/images/Dal-Makhani.jpg", status: "Available" },
    { id: 22, name: "Rajma Chawal", category: "Main Course", description: "Kidney beans curry served with rice.", price: 170, image: "/images/Rajma-Chawal.jpg", status: "Available" },
    { id: 23, name: "Chole Bhature", category: "Main Course", description: "Spiced chickpeas with fried bread.", price: 160, image: "/images/Chole-Bhature.jpg", status: "Available" },
  
    // Chinese
    { id: 24, name: "Chicken Noodles", category: "Chinese", description: "Indo-Chinese style stir-fried noodles.", price: 200, image: "/images/Chicken-Noodles.jpg", status: "Available" },
    { id: 25, name: "Veg Fried Rice", category: "Chinese", description: "Classic vegetable fried rice.", price: 180, image: "/images/Veg-Fried-Rice.jpg", status: "Available" },
    { id: 26, name: "Vegetable Fried Rice", category: "Chinese", description: "Loaded with fresh veggies and soy flavor.", price: 180, image: "/images/Vegetable-Fried-Rice.jpg", status: "Available" },
  
    // Desserts
    { id: 27, name: "Gulab Jamun", category: "Desserts", description: "Soft milk dumplings soaked in sugar syrup.", price: 90, image: "/images/gulab-jamun.jpg", status: "Available" },
    { id: 28, name: "Jalebi", category: "Desserts", description: "Crispy, syrupy spirals, golden and sweet.", price: 100, image: "/images/Jalebi.jpg", status: "Available" },
    { id: 29, name: "Rasgulla", category: "Desserts", description: "Spongy cheese balls in light sugar syrup.", price: 90, image: "/images/Rasgulla.jpg", status: "Available" },
    { id: 30, name: "Rasmalai", category: "Desserts", description: "Cottage cheese patties in saffron milk.", price: 110, image: "/images/Rasmalai.jpg", status: "Available" },
    { id: 31, name: "Kheer", category: "Desserts", description: "Creamy rice pudding with nuts.", price: 80, image: "/images/Kheer.jpg", status: "Available" },
    { id: 32, name: "Gajar Halwa", category: "Desserts", description: "Carrot halwa cooked in ghee & milk.", price: 110, image: "/images/Gajar-Halwa.jpg", status: "Available" },
    { id: 33, name: "Moong Dal Halwa", category: "Desserts", description: "Rich, ghee-laden lentil halwa.", price: 120, image: "/images/Moong-Dal-Halwa.jpg", status: "Available" },
    { id: 34, name: "Shahi Tukda", category: "Desserts", description: "Fried bread soaked in rabri & nuts.", price: 100, image: "/images/Shahi-Tukda.jpg", status: "Available" },
    { id: 35, name: "Chocolate Brownie", category: "Desserts", description: "Fudgy chocolate brownie bites.", price: 90, image: "/images/Chocolate-Brownie.jpg", status: "Available" },
    { id: 36, name: "Fruit Custard", category: "Desserts", description: "Chilled custard loaded with fresh fruits.", price: 90, image: "/images/Fruit-Custard.jpg", status: "Available" },
    { id: 37, name: "Mango Mousse", category: "Desserts", description: "Light, airy mango mousse cups.", price: 110, image: "/images/Mango-Mousse.jpg", status: "Available" },
    { id: 38, name: "Ice Cream", category: "Desserts", description: "Assorted flavor scoops.", price: 70, image: "/images/Ice-Cream.jpg", status: "Available" },
  ];
  
  export const packages = [
    { id: 1, name: "Silver Package", category: "Basic", price_per_person: 350, max_guests: 100, status: "Available", includes: ["4 Starters", "3 Main Course", "1 Dessert", "Basic Setup"] },
    { id: 2, name: "Gold Package", category: "Standard", price_per_person: 550, max_guests: 200, status: "Available", includes: ["6 Starters", "5 Main Course", "2 Desserts", "Live Counter", "Standard Decoration"] },
    { id: 3, name: "Platinum Package", category: "Premium", price_per_person: 800, max_guests: 300, status: "Available", includes: ["8 Starters", "7 Main Course", "3 Desserts", "2 Live Counters", "Premium Decoration", "Waiter Service"] },
    { id: 4, name: "Wedding Special", category: "Event", price_per_person: 1200, max_guests: 500, status: "Available", includes: ["Full Menu Access", "3 Live Counters", "Theme Decoration", "Dedicated Staff", "Photography Add-on"] },
    { id: 5, name: "Birthday Special", category: "Event", price_per_person: 400, max_guests: 80, status: "Available", includes: ["5 Starters", "3 Main Course", "Cake & Dessert Table", "Balloon Decoration"] },
    { id: 6, name: "Corporate Package", category: "Event", price_per_person: 500, max_guests: 250, status: "Available", includes: ["Buffet Setup", "Tea/Coffee Counter", "Professional Staff", "Minimal Decoration"] },
  ];
  
  export const services = [
    { id: 1, name: "Live Counter", description: "Chefs prepare food fresh in front of guests (chaat, dosa, pasta counters).", price: 8000, status: "Available" },
    { id: 2, name: "Waiter Service", description: "Trained staff for table & buffet service.", price: 3000, status: "Available" },
    { id: 3, name: "Decoration", description: "Theme-based stage and hall decoration.", price: 15000, status: "Available" },
    { id: 4, name: "DJ & Music", description: "Professional DJ setup with sound & lighting.", price: 12000, status: "Available" },
    { id: 5, name: "Photography", description: "Event photography & videography coverage.", price: 10000, status: "Available" },
    { id: 6, name: "Tent & Furniture", description: "Tables, chairs, tent/canopy setup.", price: 9000, status: "Available" },
  ];
  
  // Admin credentials (temporary, hardcoded for testing)
  export const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };
  
  // Seed customers (temporary, used only if localStorage is empty)
  export const seedCustomers = [
    { id: 1, name: "Test Customer", email: "customer@test.com", phone: "9999999999", password: "123456" },
  ];