import Tomatoes     from "../assets/Tomatoes.png";
import Spinach      from "../assets/Spinach.png";
import Potato       from "../assets/Potato.png";
import MangoSteen   from "../assets/Mangosteen.png";
import Apples       from "../assets/Apples.png"; 
import Bananas      from "../assets/Bananas.png";
import Strawberries from "../assets/Strawberries.png";
import Orange       from "../assets/Oranges.png";
import Grapes       from "../assets/Grapes.png";

import BellPeppers  from "../assets/BellPeppers.png";
import Papaya       from "../assets/Papaya.png";
import DragonFruit  from '../assets/Dragon Fruit.png';
import Kiwi         from "../assets/Kiwi.png";

import LadyFinger   from "../assets/LadyFinger.png";
import Cucumber     from "../assets/Cucumber.png";
import Onion        from "../assets/Onion.png";
import Yogurt       from "../assets/Yogurt.png";
import Garlic       from "../assets/Garlic.png";
import Ghee         from "../assets/Ghee.png";
import CheddarCheese from "../assets/CheddarCheese.png";
import Butter       from "../assets/Butter.png";
import Milk         from "../assets/Milk.png";
import Cream        from "../assets/SourCream.png";
import Paneer       from "../assets/Paneer.png";
import IceCream     from "../assets/IceCream.png";
import Water        from "../assets/Water.png";
import OrangeJuice  from "../assets/OrangeJuice.png";
import Coffee       from "../assets/Coffee.png";
import Tea          from "../assets/Tea.png";
import EnergyDrink  from "../assets/EnergyDrink.png";
import CoconutWater from "../assets/CoconutWater.png";
import Cola         from "../assets/Cola.png";
import Lassi        from "../assets/Lassi.png";
import Cookies      from "../assets/Cookies.png";
import Chips        from "../assets/PotatoChips.png";
import Nuts         from "../assets/MixedNuts.png";
import Granola      from "../assets/GranolaBars.png";
import Popcorn      from "../assets/Popcorn.png";
import ChocolateBar from "../assets/Chocolate Bar.png";
import TrailMix     from "../assets/TrailMix.png";
import Pretzels     from "../assets/Pretzels.png";
import Lobster      from "../assets/Lobster.png";
import Crab         from "../assets/Crab.png";
import Scallops     from "../assets/Scallops.png";
import Mussels      from "../assets/Mussels.png";
import Oysters      from "../assets/Oysters.png";
import KingCrab     from "../assets/KingCrab.png";
import Anchovies    from "../assets/Anchovies.png";
import SmokehouseMackerel from "../assets/SmokehouseMackerel.png";
import Sourdough    from "../assets/SourdoughLoaf.png";
import Brioche      from "../assets/BriocheBun.png";
import Baguette     from "../assets/Baguette.png";
import BananaBread  from "../assets/BananaBread.png";
import ChocolateDonut from "../assets/ChocolateDonut.png";
import Eclair       from "../assets/Eclair.png";
import PoundCake    from "../assets/PoundCake.png";
import FocacciaBread from "../assets/Focaccia.png";
import LambChops    from "../assets/Lamb Chops.png";
import TurkeyBreast from "../assets/Turkey Breast.png";
import VealCutlet   from "../assets/Veal Cutlet.png";
import BeefSteak    from "../assets/Beef Steak.png";
import DuckBreast   from "../assets/Duck Breast.png";
import Ham          from "../assets/Ham.png";
import MeatBalls    from "../assets/Meatballs.png";
import PorkRibs     from "../assets/Pork Ribs.png";

const products = [
  // 🥬 Vegetables
  { id: 65, qual:1, name: "Tomatoes", price: 40, quantity: "1 kg", category: "Vegetables", img: Tomatoes, desc: "Fresh red tomatoes perfect for salads and curries." },
  { id: 66, qual:1, name: "Spinach", price: 50, quantity: "250 g", category: "Vegetables", img: Spinach, desc: "Green leafy spinach packed with iron and nutrients." },
  { id: 67, qual:1, name: "Potato", price: 35, quantity: "1 kg", category: "Vegetables", img: Potato, desc: "Farm-fresh potatoes ideal for daily cooking." },
  { id: 10, qual:1, name: "Bell Peppers", price: 60, quantity: "500 g", category: "Vegetables", img: BellPeppers, desc: "Crisp colorful capsicum for stir-fries and salads." },
  { id: 13, qual:1, name: "Cucumber", price: 25, quantity: "500 g", category: "Vegetables", img: Cucumber, desc: "Cool and hydrating cucumbers grown organically." },
  { id: 14, qual:1, name: "Lady Finger", price: 45, quantity: "500 g", category: "Vegetables", img: LadyFinger, desc: "Tender bhindi rich in fiber and great for frying." },
  { id: 15, qual:1, name: "Onion", price: 40, quantity: "1 kg", category: "Vegetables", img: Onion, desc: "Fresh red onions with a sharp natural flavor." },
  { id: 16, qual:1, name: "Garlic", price: 60, quantity: "250 g", category: "Vegetables", img: Garlic, desc: "Aromatic garlic bulbs that enhance every dish." },

  // 🍎 Fruits
  { id: 1, qual:1, name: "Apples", price: 180, quantity: "1 kg", category: "Fruits", img: Apples, desc: "Crisp, sweet Shimla apples full of antioxidants." },
  { id: 2, qual:1, name: "Bananas", price: 50, quantity: "1 dozen", category: "Fruits", img: Bananas, desc: "Ripe yellow bananas full of potassium and energy." },
  { id: 3, qual:1, name: "Strawberries", price: 120, quantity: "250 g", category: "Fruits", img: Strawberries, desc: "Sweet and juicy strawberries fresh from farms." },
  { id: 4, qual:1, name: "Oranges", price: 80, quantity: "1 kg", category: "Fruits", img: Orange, desc: "Tangy Nagpur oranges rich in vitamin C." },
  { id: 5, qual:1, name: "Grapes", price: 90, quantity: "500 g", category: "Fruits", img: Grapes, desc: "Seedless green grapes with a sweet juicy taste." },
  { id: 6, qual:1, name: "Dragon Fruit", price: 150, quantity: "1 piece", category: "Fruits", img: DragonFruit, desc: "Exotic dragon fruit rich in antioxidants and fiber." },
  { id: 7, qual:1, name: "Kiwi", price: 120, quantity: "3 pieces", category: "Fruits", img: Kiwi, desc: "Tangy New Zealand kiwi loaded with vitamin C." },
  { id: 8, qual:1, name: "Papaya", price: 60, quantity: "1 kg", category: "Fruits", img: Papaya, desc: "Sweet, ripe papayas great for digestion." },

  // 🥛 Dairy
  { id: 17, qual:1, name: "Greek Yogurt", price: 60, quantity: "400 g cup", category: "Dairy", img: Yogurt, desc: "Thick creamy yogurt made from pure cow milk." },
  { id: 18, qual:1, name: "Organic Milk", price: 65, quantity: "1 litre", category: "Dairy", img: Milk, desc: "Farm-fresh organic milk rich in calcium and protein." },
  { id: 19, qual:1, name: "Cheddar Cheese", price: 180, quantity: "200 g pack", category: "Dairy", img: CheddarCheese, desc: "Aged cheddar with a rich and creamy texture." },
  { id: 20, qual:1, name: "Farm Butter", price: 120, quantity: "500 g", category: "Dairy", img: Butter, desc: "Pure yellow butter churned from organic milk." },
  { id: 21, qual:1, name: "Sour Cream", price: 90, quantity: "200 g", category: "Dairy", img: Cream, desc: "Smooth and tangy cream ideal for baking and dips." },
  { id: 22, qual:1, name: "Paneer", price: 110, quantity: "500 g", category: "Dairy", img: Paneer, desc: "Soft and fresh cottage cheese made daily." },
  { id: 23, qual:1, name: "Vanilla Ice Cream", price: 200, quantity: "1 litre tub", category: "Dairy", img: IceCream, desc: "Classic vanilla ice cream made from pure milk." },
  { id: 24, qual:1, name: "Ghee", price: 550, quantity: "1 litre", category: "Dairy", img: Ghee, desc: "Pure desi ghee made from cow milk for authentic taste." },

  // 🥤 Beverages
  { id: 25, qual:1, name: "Mineral Water", price: 20, quantity: "1 litre bottle", category: "Beverages", img: Water, desc: "Pure Himalayan mineral water for daily hydration." },
  { id: 26, qual:1, name: "Orange Juice", price: 90, quantity: "1 litre carton", category: "Beverages", img: OrangeJuice, desc: "100% pure orange juice with no added sugar." },
  { id: 27, qual:1, name: "Coffee", price: 300, quantity: "200 g jar", category: "Beverages", img: Coffee, desc: "Premium roasted coffee beans for rich aroma." },
  { id: 28, qual:1, name: "Green Tea", price: 180, quantity: "100 tea bags", category: "Beverages", img: Tea, desc: "Organic green tea leaves for a refreshing start." },
  { id: 29, qual:1, name: "Energy Drink", price: 110, quantity: "500 ml can", category: "Beverages", img: EnergyDrink, desc: "Boost energy instantly with essential vitamins." },
  { id: 30, qual:1, name: "Coconut Water", price: 60, quantity: "330 ml pack", category: "Beverages", img: CoconutWater, desc: "Natural coconut water for instant hydration." },
  { id: 31, qual:1, name: "Cola", price: 40, quantity: "500 ml bottle", category: "Beverages", img: Cola, desc: "Refreshing carbonated drink to cool your day." },
  { id: 32, qual:1, name: "Lassi", price: 45, quantity: "500 ml bottle", category: "Beverages", img: Lassi, desc: "Traditional sweet lassi made from fresh curd." },

  // 🍪 Snacks
  { id: 33, qual:1, name: "Chocolate Cookies", price: 70, quantity: "200 g pack", category: "Snacks", img: Cookies, desc: "Crunchy chocolate cookies baked to perfection." },
  { id: 34, qual:1, name: "Potato Chips", price: 35, quantity: "150 g", category: "Snacks", img: Chips, desc: "Crispy salted chips made from farm-fresh potatoes." },
  { id: 35, qual:1, name: "Mixed Nuts", price: 250, quantity: "500 g", category: "Snacks", img: Nuts, desc: "Healthy mix of almonds, cashews, and raisins." },
  { id: 36, qual:1, name: "Granola Bars", price: 120, quantity: "Pack of 6", category: "Snacks", img: Granola, desc: "Wholesome bars made with oats, honey, and nuts." },
  { id: 37, qual:1, name: "Popcorn", price: 40, quantity: "100 g", category: "Snacks", img: Popcorn, desc: "Ready-to-pop corn kernels for movie nights." },
  { id: 38, qual:1, name: "Pretzels", price: 90, quantity: "200 g pack", category: "Snacks", img: Pretzels, desc: "Crispy baked pretzels with a salty crunch." },
  { id: 39, qual:1, name: "Trail Mix", price: 180, quantity: "250 g", category: "Snacks", img: TrailMix, desc: "Nutritious mix of nuts and dried fruits for energy." },
  { id: 40, qual:1, name: "Chocolate Bar", price: 50, quantity: "100 g", category: "Snacks", img: ChocolateBar, desc: "Rich creamy milk chocolate for sweet cravings." },

  // 🍞 Bakery
  { id: 49, qual:1, name: "Sourdough Loaf", price: 80, quantity: "400 g", category: "Bakery", img: Sourdough, desc: "Crusty sourdough bread baked with natural yeast." },
  { id: 50, qual:1, name: "Brioche Bun", price: 60, quantity: "Pack of 4", category: "Bakery", img: Brioche, desc: "Soft buttery buns perfect for burgers or sandwiches." },
  { id: 51, qual:1, name: "Baguette", price: 55, quantity: "1 loaf", category: "Bakery", img: Baguette, desc: "Classic French baguette with crisp golden crust." },
  { id: 52, qual:1, name: "Banana Bread", price: 90, quantity: "400 g loaf", category: "Bakery", img: BananaBread, desc: "Moist banana bread with a hint of cinnamon." },
  { id: 53, qual:1, name: "Chocolate Donut", price: 45, quantity: "1 piece", category: "Bakery", img: ChocolateDonut, desc: "Soft donut coated with rich chocolate glaze." },
  { id: 54, qual:1, name: "Eclair", price: 70, quantity: "1 piece", category: "Bakery", img: Eclair, desc: "Delicate pastry filled with vanilla cream and chocolate top." },
  { id: 55, qual:1, name: "Pound Cake", price: 120, quantity: "500 g", category: "Bakery", img: PoundCake, desc: "Classic vanilla pound cake made with real butter." },
  { id: 56, qual:1, name: "Focaccia Bread", price: 100, quantity: "400 g", category: "Bakery", img: FocacciaBread, desc: "Italian flatbread with olive oil and herbs." },

  // 🍖 Meat
  { id: 57, qual:1, name: "Lamb Chops", price: 650, quantity: "500 g", category: "Meat", img: LambChops, desc: "Tender lamb chops perfect for grilling or curry." },
  { id: 58, qual:1, name: "Turkey Breast", price: 500, quantity: "500 g", category: "Meat", img: TurkeyBreast, desc: "Lean and juicy turkey breast for high-protein meals." },
  { id: 59, qual:1, name: "Veal Cutlet", price: 700, quantity: "500 g", category: "Meat", img: VealCutlet, desc: "Soft veal cutlets known for their delicate flavor." },
  { id: 60, qual:1, name: "Beef Steak", price: 950, quantity: "500 g", category: "Meat", img: BeefSteak, desc: "Premium grass-fed beef steak for a rich taste." },
  { id: 61, qual:1, name: "Duck Breast", price: 800, quantity: "500 g", category: "Meat", img: DuckBreast, desc: "Tender duck meat with a bold, savory flavor." },
  { id: 62, qual:1, name: "Ham", price: 850, quantity: "500 g", category: "Meat", img: Ham, desc: "Smoked ham slices ideal for sandwiches and salads." },
  { id: 63, qual:1, name: "Meatballs", price: 400, quantity: "12 pieces", category: "Meat", img: MeatBalls, desc: "Juicy meatballs seasoned with herbs and spices." },
  { id: 64, qual:1, name: "Pork Ribs", price: 780, quantity: "1 kg", category: "Meat", img: PorkRibs, desc: "Slow-cooked pork ribs with tender smoky flavor." },
];

export default products;
