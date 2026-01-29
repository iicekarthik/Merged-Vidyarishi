"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [statusFilter, payments]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/admin/payments", {
        withCredentials: true,
      });

      if (res.data.success) {
        setPayments(res.data.payments);
        setFiltered(res.data.payments);
      }
    } catch (err) {
      console.error("Fetch payments error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== FILTER ===================== */

  const applyFilter = () => {
    if (statusFilter === "all") {
      setFiltered(payments);
    } else {
      setFiltered(payments.filter(p => p.orderStatus === statusFilter));
    }
  };

  /* ===================== STATUS BADGE ===================== */

  const getStatusBadge = status => {
    switch (status) {
      case "PAID":
        return "bg-color-success-opacity color-success";
      case "FAILED":
        return "bg-color-danger-opacity color-danger";
      default:
        return "bg-color-warning-opacity color-warning";
    }
  };

  /* ===================== EXCEL EXPORT ===================== */

  const downloadPaymentsExcel = async () => {
    const dataToExport = filtered.length ? filtered : payments;

    if (!dataToExport.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Payments");

    worksheet.columns = [
      { header: "Sr No", key: "sr", width: 6 },
      { header: "Student Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 12 },
      { header: "Course", key: "course", width: 50 },
      { header: "Order ID", key: "orderId", width: 22 },
      { header: "Amount", key: "amount", width: 8 },
      { header: "Status", key: "status", width: 10 },
      { header: "Payment Date", key: "date", width: 20 },
    ];

    dataToExport.forEach((p, index) => {
      worksheet.addRow({
        sr: index + 1,
        name: p.userId?.fullName || p.customerName || "—",
        email: p.userId?.email || p.customerEmail || "—",
        phone: p.userId?.phone || p.customerPhone || "—",
        course: p.orderNote || "—",
        orderId: p.orderId,
        amount: p.orderAmount,
        status: p.orderStatus,
        date: new Date(p.createdAt).toLocaleString(),
      });
    });

    // 🔒 Lock all cells
    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.protection = { locked: true };
      });
    });

    // 🔐 Protect sheet
    await worksheet.protect("admin-only", {
      selectLockedCells: true,
      selectUnlockedCells: true,
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `payments_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  if (loading) return <p className="text-center">Loading payments...</p>;

  /* ===================== UI ===================== */

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb--20">
          <h4 className="rbt-title-style-3 mb-0">All Purchased Courses</h4>

          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadPaymentsExcel}
          >
            <i className="feather-download me-2"></i>
            Download Excel
          </button>
        </div>

        {/* Filters */}
        <div className="row g-3 mb--20">
          <div className="col-md-3">
            <select
              className="form-control"
              style={{ height: "50px", fontSize: "14px" }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rbt-table table-responsive">

          <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Student</th>
                  {/* <th>Email</th> */}
                  <th>Phone</th>
                  <th>Course Name</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(p => (
                  <tr key={p._id}>
                    <td>
                      <strong>{p.userId?.fullName || p.customerName || "—"}</strong>

                      <div className="small text-muted">
                        {p.userId?.email || p.customerEmail || "—"}
                      </div>

                    </td>
                    {/* <td>{p.userId?.fullName || p.customerName || "—"}</td> */}
                    {/* <td>{p.userId?.email || p.customerEmail || "—"}</td> */}
                    <td>{p.userId?.phone || p.customerPhone || "—"}</td>
                    <td>{p.orderNote}</td>
                    <td>{p.orderId}</td>
                    <td>₹{p.orderAmount}</td>
                    <td>
                      <span className={`rbt-badge-5 ${getStatusBadge(p.orderStatus)}`}>
                        {p.orderStatus}
                      </span>
                    </td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-center mt--20">No payment records found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;