import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrashAlt, FaLock, FaArrowRight } from 'react-icons/fa'; // Added icons

function Cart() {
  // Destructure updateQuantity from useCart
  const { cart, removeFromCart, getCartTotal, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  // --- CHANGES START HERE ---
  // 1. Removed platformFee and gst calculation/variables
  const total = subtotal; // Total is now just the subtotal
  // --- CHANGES END HERE ---

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyCart}>
          <span style={styles.emptyIcon}>🛒</span>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Add some awesome projects to get started!</p>
          <Link to="/projects">
            <button className="shop-button" style={styles.shopButton}>Browse Projects</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}><FaShoppingCart style={{marginRight: 10}}/> Shopping Cart</h1>
        <p style={styles.subtitle}>{cart.length} unique item(s) in your cart</p>
      </div>

      <div style={styles.cartLayout}>
        
        {/* Cart Items List */}
        <div style={styles.cartItems}>
          <h3 style={styles.listTitle}>Review Items</h3>
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card" style={styles.cartItem}>
              
              <span style={styles.itemIcon}>{item.icon}</span>
              
              <div style={styles.itemDetails}>
                <h4 style={styles.itemTitle}>{item.title}</h4>
                <p style={styles.itemDomain}>{item.domain}</p>
                <div style={styles.techTags}>
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div style={styles.itemControls}>
                {/* Quantity Control */}
                <div style={styles.quantityControl}>
                  <label style={styles.quantityLabel}>Qty:</label>
                  <select 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="quantity-select"
                    style={styles.quantitySelect}
                  >
                    {[1, 2, 3, 4, 5].map(q => ( 
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                
                <div style={styles.price}>{formatCurrency(item.price * item.quantity)}</div> 
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                  style={styles.removeButton}
                >
                  <FaTrashAlt size={12}/> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          
          <div style={styles.summaryDetails}>
            
            {/* Display Subtotal */}
            <div style={styles.summaryRow}>
              <span>Subtotal ({cart.reduce((count, item) => count + item.quantity, 0)} projects):</span> 
              <strong style={{color: 'var(--text-primary)'}}>{formatCurrency(subtotal)}</strong>
            </div>

            {/* --- REMOVED: Platform Fee and GST rows --- */}
            
            <div style={styles.summaryDivider}></div>
            
            {/* Final Total */}
            <div style={styles.summaryRow}>
              <strong style={{fontSize: '20px'}}>Total Payable:</strong>
              <strong style={styles.finalTotal}>
                {formatCurrency(total)}
              </strong>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="checkout-button"
            style={styles.checkoutButton}
          >
            Proceed to Checkout <FaArrowRight style={{marginLeft: 10}}/>
          </button>

          <button 
            onClick={clearCart}
            className="clear-cart-button"
            style={styles.clearCartButton}
          >
            Clear Cart
          </button>

          <div style={styles.securityNote}>
            <FaLock style={{marginRight: 8}}/>
            Secure and Encrypted Checkout
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    color: 'var(--primary)',
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '16px'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '60px 20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)'
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  emptyTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    marginBottom: '10px'
  },
  emptyText: {
    color: 'var(--text-secondary)',
    marginBottom: '30px'
  },
  shopButton: {
    padding: '12px 30px',
    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cartLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'start'
  },
  listTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '20px',
      color: 'var(--text-primary)'
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  cartItem: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid var(--border)',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  itemIcon: {
    fontSize: '36px',
    flexShrink: 0
  },
  itemDetails: {
    flex: 1
  },
  itemTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    margin: '0 0 8px 0',
    fontWeight: '700'
  },
  itemDomain: {
    color: 'var(--primary)',
    fontSize: '14px',
    marginBottom: '10px',
    fontWeight: '600'
  },
  techTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  techTag: {
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  itemControls: {
    textAlign: 'right',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-end'
  },
  price: {
    color: 'var(--success)',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  quantityLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  quantitySelect: {
    padding: '6px 10px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none'
  },
  removeButton: {
    padding: '8px 16px',
    border: 'none',
    backgroundColor: 'var(--error)',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'background-color 0.3s ease'
  },
  orderSummary: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    border: '2px solid var(--primary)', // Enhanced Border
    position: 'sticky',
    top: '100px', // Adjusted sticky position to account for header
    background: 'linear-gradient(145deg, var(--surface), #e0f2fe)'
  },
  summaryTitle: {
    color: 'var(--primary)',
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '800',
    borderBottom: '2px solid #e0e7ff',
    paddingBottom: '10px'
  },
  summaryDetails: {
    marginBottom: '25px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '16px',
    color: 'var(--text-secondary)'
  },
  summaryDivider: {
    height: '2px',
    backgroundColor: '#dbeafe',
    margin: '15px 0'
  },
  finalTotal: {
    color: 'var(--success)',
    fontSize: '28px',
    fontWeight: '800'
  },
  checkoutButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(90deg, #16a34a, #059669)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearCartButton: {
    width: '100%',
    padding: '12px',
    border: '2px solid var(--border)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s ease'
  },
  securityNote: {
    textAlign: 'center',
    color: 'var(--primary)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .cart-item-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    }
    
    .remove-button:hover {
      background-color: #b91c1c; /* Darker red */
    }
    
    .checkout-button:hover {
      background: linear-gradient(90deg, #059669, #16a34a);
      box-shadow: 0 4px 15px rgba(22, 163, 74, 0.5);
    }
    
    .clear-cart-button:hover {
      background-color: var(--hover-bg);
      color: var(--text-primary);
      border-color: var(--primary);
    }
    
    .shop-button:hover {
      opacity: 0.9;
    }
    
    .quantity-select:focus {
      border-color: var(--primary);
    }
    
    .cart-indicator-float:hover {
      transform: scale(1.05);
      background-color: var(--primary-dark);
    }
  }
  
  @media (max-width: 900px) {
    ${styles.cartLayout.gridTemplateColumns} {
      grid-template-columns: 1fr;
    }
    ${styles.orderSummary} {
      top: 20px; /* Adjust sticky position for mobile */
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Cart;