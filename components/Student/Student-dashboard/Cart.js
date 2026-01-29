import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/context/Context";
import { deleteProduct } from "@/redux/action/CartAction";
import api from "@/vidyarishiapi/lib/axios";

const Cart = () => {
  const router = useRouter();
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const dispatch = useDispatch();
  const { cart, total_amount } = useSelector((state) => state.CartReducer);

  const { cartToggle, setCart } = useAppContext();

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });

    if (path === "/cart") {
      setCart(true);
    }
  }, [cart, path, dispatch, setCart]);

  const courseIds = cart.map(item => item.id);
  const courseNames = cart.map(item => item.product.courseTitle).join(", ");

  return (
    <>
      <div className={`${!cartToggle ? "cart-sidenav-menu-active" : ""}`}>
        <div
          className={`rbt-cart-side-menu ${!cartToggle ? "side-menu-active" : ""
            }`}
        >
          <div className="inner-wrapper">
            <div className="inner-top">
              <div className="content">
                <div className="title">
                  <h4 className="title mb--0">Your shopping cart</h4>
                </div>
                <div className="rbt-btn-close" id="btn_sideNavClose">
                  <button
                    className="minicart-close-button rbt-round-btn"
                    onClick={() => setCart(!cartToggle)}
                  >
                    <i className="feather-x"></i>
                  </button>
                </div>
              </div>
            </div>
            <nav className="side-nav w-100">
              <div className="rbt-minicart-wrapper">
                {cart &&
                  cart.map((data, index) => {
                    const product = data.product || {};
                    const isEvent = !!product.title;
                    const thumbnail =
                      product.courseImg?.url ||
                      product.courseListImg ||
                      product.eventImg?.url ||
                      product.eventImg ||
                      "/images/course/course-online-01.jpg";

                    return (
                      <li className="minicart-item" key={index}>
                        <div className="thumbnail">
                          <Link
                            href={
                              isEvent
                                ? `/event-details/${data.id}`
                                : `/course-details/${data.id}`
                            }
                          >
                            <Image
                              src={thumbnail}
                              width={80}
                              height={64}
                              alt={product.courseTitle || product.title || "Product"}
                              style={{ objectFit: "contain" }}
                            />
                          </Link>
                        </div>

                        <div className="product-content">
                          <h6 className="title">
                            <Link
                              href={
                                isEvent
                                  ? `/event-details/${data.id}`
                                  : `/course-details/${data.id}`
                              }
                            >
                              {product.courseTitle || product.title || "Course"}
                            </Link>
                          </h6>

                          <span className="quantity">
                            {data.amount} *
                            <span className="price">
                              ₹{data.price || product.price || 0}
                            </span>
                          </span>
                        </div>

                        <div className="close-btn">
                          <button
                            className="rbt-round-btn"
                            onClick={async () => {
                              await api.delete("/api/dashboard/view_cart", {
                                data: { courseId: data.id },
                              });
                              dispatch(deleteProduct(data.id));
                            }}

                          >
                            <i className="feather-x"></i>
                          </button>
                        </div>
                      </li>
                    );
                  })}

              </div>
            </nav>

            <div className="rbt-minicart-footer">
              <hr className="mb--0" />
              <div className="rbt-cart-subttotal">
                <p className="subtotal">
                  <strong>Subtotal:</strong>
                </p>
                <p className="price">₹{total_amount}</p>
              </div>
              <hr className="mb--0" />
              <div className="rbt-minicart-bottom mt--20">
                <div className="view-cart-btn">
                  <Link
                    className="rbt-btn btn-border icon-hover w-100 text-center"
                    href="/view-cart"
                  >
                    <span className="btn-text">View Cart</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </Link>
                </div>
                <div className="checkout-btn mt--20">
                  <button
                    className="rbt-btn btn-gradient w-100 mt--20"
                    onClick={() =>
                      router.push({
                        pathname: "/pay-online",
                        query: {
                          courseIds: JSON.stringify(courseIds),
                          courseName: courseNames,
                          courseFee: total_amount,
                        },
                      })
                    }
                  >
                    <span className="btn-text">Checkout</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="close_side_menu"
          href=""
          onClick={() => setCart(!cartToggle)}
        ></Link>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
