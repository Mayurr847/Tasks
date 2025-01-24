import React from "react";

const CartPage = ({ cartItems, updateQuantity, removeItem }) => {
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ${calculateTotalPrice().toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;
