
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const WHATSAPP_NUMBER = "250792951554";
const EMAIL = "ainemutuyeyezu@gmail.com";
const LOCATION = "Kigali - Gasabo - Gisozi";

const products = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    category: "Women",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
  },
  {
    id: 2,
    name: "Classic Women's Blazer",
    category: "Women",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
  },
  {
    id: 3,
    name: "Casual Men's Shirt",
    category: "Men",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800",
  },
  {
    id: 4,
    name: "Men's Classic Suit",
    category: "Men",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
  },
  {
    id: 6,
    name: "Men's Casual Jacket",
    category: "Men",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
  },
  {
    id: 7,
    name: "Women's Fashion Top",
    category: "Women",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800",
  },
];

function formatPrice(price) {
  return `${price.toLocaleString("en-US")} RWF`;
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stylehub-cart")) || [];
    } catch {
      return [];
    }
  });

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("stylehub-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart!`);
    setTimeout(() => setMessage(""), 2500);
  };

  const updateQuantity = (id, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (cart.length === 0) {
      setMessage("Your shopping cart is empty.");
      return;
    }

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} - ${item.quantity} x ${formatPrice(item.price)}`
      )
      .join("\n");

    const whatsappMessage = `
Hello STYLEHUB! I would like to place an order.

${orderDetails}

Total: ${formatPrice(totalPrice)}

My location is:
${LOCATION}

Please contact me to confirm my order. Thank you!
    `;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <a href="#home" className="logo">
          STYLE<span>HUB</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Shop
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
          <a href="#cart" onClick={() => setMenuOpen(false)}>
            Cart ({totalItems})
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO STYLEHUB</p>
          <h1>Fashion Made Simple</h1>
          <p>
            Discover beautiful and stylish clothes for men and women.
            Find your style and express yourself with confidence.
          </p>
          <a href="#shop" className="hero-button">
            Shop Now
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="benefit">
          <span>🚚</span>
          <h3>Easy Ordering</h3>
          <p>Order your favorite clothes easily.</p>
        </div>

        <div className="benefit">
          <span>✨</span>
          <h3>Quality Fashion</h3>
          <p>Discover stylish clothing choices.</p>
        </div>

        <div className="benefit">
          <span>💬</span>
          <h3>WhatsApp Support</h3>
          <p>Contact us directly for your orders.</p>
        </div>
      </section>

      {/* Shop */}
      <section className="shop-section" id="shop">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Shop Our Clothes</h2>
          <span>Find the perfect outfit for every occasion.</span>
        </div>

        <div className="shop-controls">
          <input
            type="text"
            placeholder="Search for clothes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="category-buttons">
            {["All", "Women", "Men"].map((item) => (
              <button
                key={item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {message && <p className="success-message">{message}</p>}

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="product-price">
                    {formatPrice(product.price)}
                  </p>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-message">
              No clothes found. Try another search.
            </p>
          )}
        </div>
      </section>

      {/* Cart */}
      <section className="cart-section" id="cart">
        <div className="section-heading">
          <p>YOUR SHOPPING</p>
          <h2>Shopping Cart</h2>
        </div>

        {cart.length === 0 ? (
          <p className="empty-message">
            Your cart is empty. Start shopping!
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Total items: {totalItems}</p>
              <h2>Total: {formatPrice(totalPrice)}</h2>

              <button className="checkout-button" onClick={checkout}>
                Order on WhatsApp
              </button>
            </div>
          </>
        )}
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div className="about-content">
          <p>ABOUT US</p>
          <h2>Welcome to STYLEHUB</h2>

          <p>
            STYLEHUB is a clothing shop that makes fashion simple.
            We offer stylish clothes for men and women at affordable
            prices. Our goal is to help everyone look good and feel
            confident.
          </p>

          <a href="#shop" className="about-button">
            Explore Our Collection
          </a>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="section-heading">
          <p>GET IN TOUCH</p>
          <h2>Contact Us</h2>
          <span>We are happy to hear from you.</span>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <span>📍</span>
            <h3>Our Location</h3>
            <p>{LOCATION}</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Gisozi%2C+Gasabo%2C+Kigali%2C+Rwanda"
              target="_blank"
              rel="noreferrer"
            >
              View Location
            </a>
          </div>

          <div className="contact-card">
            <span>📱</span>
            <h3>WhatsApp</h3>
            <p>0792951554</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat With Us
            </a>
          </div>

          <div className="contact-card">
            <span>✉️</span>
            <h3>Email Address</h3>
            <p>{EMAIL}</p>
            <a href={`mailto:${EMAIL}`}>Send Email</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <a href="#home" className="logo">
          STYLE<span>HUB</span>
        </a>

        <p>Fashion Made Simple.</p>
        <p>{LOCATION}</p>
        <p>{EMAIL}</p>

        <p className="copyright">
          © {new Date().getFullYear()} STYLEHUB. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
