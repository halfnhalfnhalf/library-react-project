import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import { books } from "./data";
import Cart from "./pages/Cart";
import React, { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function removeFromCart(book) {
    setCart(cart.filter((item) => item.id !== book.id));
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item,
      ),
    );
  }

  function cartQuantity() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav cartQuantity={cartQuantity()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo addToCart={addToCart} cart={cart} books={books} />
            }
          />
          <Route
            path="/Cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
