import api from "@/vidyarishiapi/lib/axios";

// -----------------> FETCH USER CART
export const fetchUserCart = () => async (dispatch) => {
  try {
    dispatch({ type: "CART_REQ" });

    const res = await api.get("/api/dashboard/view_cart");

    dispatch({
      type: "SET_CART",
      payload: res.data.data, // ONLY logged-in user's cart
    });

    dispatch({ type: "CART_REQ_OUT" });
  } catch (error) {
    dispatch({ type: "SET_CART_ERROR" });
  }
};

// -----------------> RESET CART (on logout)
export const resetCart = () => (dispatch) => {
  dispatch({ type: "RESET_CART" });
};


// -----------------> ADD_TO_CART (Redux + Backend)
export const addToCartAction = (id, amount, product) => async (dispatch) => {
  try {
    dispatch({ type: "CART_REQ" });

    // ✅ SAVE TO BACKEND
    await api.post("/api/dashboard/view_cart", {
      courseId: id,
    });

    // ✅ SAVE TO REDUX
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, amount, product },
    });

    dispatch({ type: "CART_REQ_OUT" });
  } catch (error) {
    dispatch({ type: "SET_CART_ERROR" });
  }
};


// -----------------> Inc/Dec Cart Amount
export const toggleAmount = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: "CART_REQ" });

    dispatch({ type: "TOGGLE_CART_AMOUNT", payload: { id, value } });

    dispatch({ type: "CART_REQ_OUT" });
  } catch (error) {
    dispatch({ type: "SET_CART_ERROR" });
  }
};

// -----------------> Delete_Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CART_REQ" });

    dispatch({ type: "DELETE_CART_ITEM", payload: id });

    dispatch({ type: "CART_REQ_OUT" });
  } catch (error) {
    dispatch({ type: "SET_CART_ERROR" });
  }
};
