import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import api from "@/vidyarishiapi/lib/axios";
import { deleteProduct } from "@/redux/action/CartAction";
import { useRouter } from "next/router";
import { fetchUserCart } from "@/redux/action/CartAction";

const ViewCart = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { cart, total_amount } = useSelector(
    (state) => state.CartReducer
  );

  useEffect(() => {
    dispatch(fetchUserCart()); // 🔥 FETCH CART DATA
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
  }, [cart, dispatch]);

  const removeItem = async (id) => {
    try {
      await api.delete("/api/dashboard/view_cart", {
        data: { courseId: id },
      });
      dispatch(deleteProduct(id));
    } catch (err) {
      console.error("Remove cart item failed", err);
    }
  };
  const courseIds = cart.map(item => item.id);
  const courseNames = cart.map(item => item.product.courseTitle).join(", ");

  return (

    <div className="rbt-section-gap">
      <div className="container">
        <div className="row mb--40">
          <div className="col-lg-12">
            <h3 className="title">Your Cart</h3>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center">
            <h5>Your cart is empty</h5>
            <Link href="/vidyarishi-courses" className="rbt-btn btn-gradient mt--20">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="rbt-cart-table table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      const product = item.product || {};
                      const thumbnail =
                        product.courseImg?.url ||
                        product.courseImg ||
                        "/images/course/course-online-01.jpg";
                      return (
                        <tr key={index}>
                          <td>
                            <div className="rbt-cart-product d-flex align-items-center">
                              <Image
                                src={thumbnail}
                                width={80}
                                height={60}
                                alt={product.courseTitle || "Course"}
                                style={{ objectFit: "contain" }}
                              />
                              <Link
                                href={`/course-details/${item.id}`}
                                className="ms-3"
                              >
                                {product.courseTitle || "Course"}
                              </Link>
                            </div>
                          </td>
                          <td>₹{item.price || product.price || 0}</td>
                          <td>
                            <button
                              className="rbt-round-btn"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="feather-x"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="rbt-cart-summary rbt-shadow-box">
                <h5 className="title mb--20">Cart Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{total_amount}</span>
                </div>
                <hr />
                <button
                  className="rbt-btn btn-gradient w-100 mt--20"
                  onClick={() => {
                    if (!cart.length || total_amount <= 0) return;

                    router.push({
                      pathname: "/pay-online",
                      query: {
                        courseIds: JSON.stringify(courseIds),
                        courseName: courseNames,
                        courseFee: total_amount,
                      },
                    });

                  }}

                >
                  Proceed to Pay Online
                </button>
                {/* 
                <Link href="/vidyarishi-courses" className="rbt-btn btn-border w-100 mt--10">
                  Continue Shopping
                </Link> */}
                <div className="view-cart-btn">
                  <Link
                    href="/vidyarishi-courses"
                    className="rbt-btn btn-border w-100 mt--10 d-flex align-items-center justify-content-between"
                  >
                    <span className="btn-text">Continue Shopping</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default ViewCart;