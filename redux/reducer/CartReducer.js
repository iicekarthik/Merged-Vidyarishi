const init = {
  cart: [],                 // 🔥 user-specific cart (from backend)
  total_items: 0,
  total_amount: 0,
  shipping_fee: 80,
  loading: false,
  error: false,
  msg: "",
};

export const CartReducer = (state = init, action) => {
  switch (action.type) {
    case "CART_REQ":
      return {
        ...state,
        loading: true,
      };

    case "CART_REQ_OUT":
      return {
        ...state,
        loading: false,
      };

    // ✅ SET CART (AFTER LOGIN / PAGE REFRESH)
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };

    // ✅ RESET CART (ON LOGOUT)
    case "RESET_CART":
      return {
        ...state,
        cart: [],
        total_items: 0,
        total_amount: 0,
      };

    // ➕ ADD TO CART (FRONTEND OPTIMISTIC UPDATE)
    case "ADD_TO_CART": {
      const { id, amount, product } = action.payload;

      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, amount: item.amount + amount }
              : item
          ),
          msg: "Already in cart",
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id,
            amount,
            price: product.price,
            product,
          },
        ],
        msg: "Item added successfully",
      };
    }

    // 🔼 🔽 INCREASE / DECREASE QUANTITY
    case "TOGGLE_CART_AMOUNT": {
      const { id, value } = action.payload;

      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === id) {
            const newAmount =
              value === "inc"
                ? item.amount + 1
                : Math.max(item.amount - 1, 1);
            return { ...item, amount: newAmount };
          }
          return item;
        }),
      };
    }

    // 🧮 COUNT TOTALS
    case "COUNT_CART_TOTALS": {
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          total.total_items += item.amount;
          total.total_amount += item.price * item.amount;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );

      return {
        ...state,
        total_items,
        total_amount,
      };
    }

    // ❌ REMOVE ITEM
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "SET_CART_ERROR":
      return {
        ...state,
        error: true,
      };

    case "CLEAR_CART_ERROR":
      return {
        ...state,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
};
