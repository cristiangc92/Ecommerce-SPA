import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío. <Link to="/">Ver productos</Link></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom p-2">
              <img src={item.image} alt={item.name} width="50" />
              <span>{item.name}</span>
              <span>${item.price}</span>
              <div>
                <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
