import React from "react";
import CartItem from "../components/ui/CartItem";
import EmptyCart from "../assets/empty_cart.svg";
import { Link } from "react-router-dom";

export default function Cart({ cart, changeQuantity, removeFromCart }) {
  const subTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += (item.salePrice || item.originalPrice) * item.quantity;
    });
    return sum;
  };
  const tax = subTotal() * 0.1;
  const total = subTotal() + tax;
  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              <div className="cart__body">
                {cart.map((book) => (
                  <CartItem
                    book={book}
                    changeQuantity={changeQuantity}
                    removeFromCart={removeFromCart}
                    key={book.id}
                  />
                ))}
              </div>
            </div>
            {!cart.length ? (
              <div className="cart__empty">
                <img src={EmptyCart} alt="" className="cart__empty--img" />
                <h2>You don't have any books in your cart!</h2>
                <Link to="/books">
                  <button className="btn">Browse books</button>
                </Link>
              </div>
            ) : (
              <div className="total">
                <div className="total__item total__sub-total">
                  <span>Subtotal</span>
                  <span>${subTotal().toFixed(2)}</span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="btn btn__checkout no-cursor"
                  onClick={() => alert(`Haven't made this`)}
                >
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
