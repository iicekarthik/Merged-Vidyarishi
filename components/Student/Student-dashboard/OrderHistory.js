import { useEffect, useState } from "react";
import api from "@/vidyarishiapi/lib/axios";
import Link from "next/link";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/dashboard/student/orders/my-orders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const getOrderStatusBadge = (status) => {
    switch (status) {
      case "PAID":
      case "SUCCESS":
        return {
          label: "Paid",
          className: "bg-color-success-opacity color-success",
        };

      case "PENDING":
        return {
          label: "Pending",
          className: "bg-color-warning-opacity color-warning",
        };

      case "FAILED":
        return {
          label: "Failed",
          className: "bg-color-danger-opacity color-danger",
        };

      default:
        return {
          label: status,
          className: "bg-secondary-opacity",
        };
    }
  };

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Order History</h4>
          </div>

          <div className="rbt-dashboard-table table-responsive mobile-table-750">
            <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
              <table className="rbt-table table table-borderless">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Course Name</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <th>{order.orderId}</th>
                      <td>
                        {order.courseId ? (
                          <Link
                            href={`/course-details/${order.courseId}`}
                            className="color-primary"
                          >
                            {order.orderNote}
                          </Link>
                        ) : (
                          <span>{order.orderNote}</span>
                        )}

                      </td>

                      <td>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td>₹{order.orderAmount}</td>
                      <td>
                        <span
                          className={`rbt-badge-5 ${getOrderStatusBadge(order.orderStatus).className}`}
                        >
                          {getOrderStatusBadge(order.orderStatus).label}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
