"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const EnquiredHistory = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        applyFilters();
    }, [search, courseFilter, statusFilter, enquiries]);

    /* ===================== FETCH ===================== */
    useEffect(() => {
        fetchEnquiries();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [search, courseFilter, enquiries]);

    const fetchEnquiries = async () => {
        try {
            const res = await axios.get("/api/admin/enquiries", {
                withCredentials: true,
            });

            if (res.data.success) {
                setEnquiries(res.data.enquiries);
                setFiltered(res.data.enquiries);
            }
        } catch (err) {
            toast.error("Failed to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        return status === "contacted"
            ? "bg-primary-opacity"
            : "bg-color-warning-opacity color-warning";
    };

    const updateStatus = async (id, status) => {
        await axios.patch(
            "/api/admin/enquiries",
            { enquiryId: id, status },
            { withCredentials: true }
        );

        toast.success("Status updated");
        fetchEnquiries();
    };

    const convertToLead = async (id) => {
        await axios.post(
            "/api/admin/enquiries",
            { enquiryId: id },
            { withCredentials: true }
        );

        toast.success("Converted to lead");
        fetchEnquiries();
    };

    const deleteEnquiry = async (id) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;

        await axios.delete(
            "/api/admin/enquiries",
            {
                data: { enquiryId: id },
                withCredentials: true,
            }
        );

        toast.success("Enquiry deleted");
        fetchEnquiries();
    };

    /* ===================== FILTERS ===================== */
    const applyFilters = () => {
        let data = [...enquiries];

        if (search) {
            data = data.filter(
                e =>
                    e.name?.toLowerCase().includes(search.toLowerCase()) ||
                    e.phone?.includes(search) ||
                    e.email?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (courseFilter) {
            data = data.filter(e => e.courseName === courseFilter);
        }

        if (statusFilter !== "all") {
            data = data.filter(e => e.status === statusFilter);
        }

        setFiltered(data);
    };


    const clearFilters = () => {
        setSearch("");
        setCourseFilter("");
        setFiltered(enquiries);
    };

    const courses = [...new Set(enquiries.map(e => e.courseName))];

    /* ===================== EXCEL DOWNLOAD ===================== */
    const downloadEnquiriesExcel = async () => {
        if (!filtered.length) {
            toast.info("No enquiries to download");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Enquiries");

        worksheet.columns = [
            { header: "Sr No", key: "sr", width: 6 },
            { header: "Name", key: "name", width: 25 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Email", key: "email", width: 30 },
            { header: "Course", key: "course", width: 25 },
            { header: "Enquiry Date", key: "date", width: 20 },
        ];

        filtered.forEach((e, index) => {
            worksheet.addRow({
                sr: index + 1,
                name: e.name,
                phone: e.phone,
                email: e.email || "—",
                course: e.courseName,
                date: new Date(e.createdAt).toLocaleString(),
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer]),
            `enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    if (loading) {
        return <p className="text-center">Loading enquiries...</p>;
    }

    /* ===================== UI ===================== */
    return (
        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
            <div className="content">
                <div className="d-flex justify-content-between align-items-center mb--20">
                    <h4 className="rbt-title-style-3 mb-0">Course Enquiries</h4>

                    <button className="btn btn-primary" onClick={downloadEnquiriesExcel}>
                        <i className="feather-download me-2"></i>
                        Download Enquiries
                    </button>
                </div>

                {/* Filters */}
                <div className="row g-3 mb--20">
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            style={{ height: "50px", fontSize: "14px" }}
                            placeholder="Search name, phone, email"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-control"
                            style={{ height: "50px", fontSize: "14px" }}
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <select
                            className="form-control"
                            style={{ height: "50px", fontSize: "14px" }}
                            value={courseFilter}
                            onChange={e => setCourseFilter(e.target.value)}
                        >
                            <option value="">All Courses</option>
                            {courses.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2 d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary w-100"
                            style={{ height: "50px", fontSize: "14px" }}
                            onClick={clearFilters}
                            disabled={!search && statusFilter === "all" && !courseFilter}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="rbt-table table-responsive">
                    <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Email & Phone</th>
                                    {/* <th>Email</th> */}
                                    <th>Course</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(e => (
                                    <tr key={e._id}>
                                        <td>
                                            <strong>{e.name}</strong>
                                            <div className="small text-muted">Enquiry</div>
                                        </td>

                                        <td>
                                            <div className="small text-muted">
                                               {e.email || "—"}
                                            </div>

                                            <div className="small">
                                                📞 <a href={`tel:${e.phone}`}>{e.phone}</a>
                                            </div>
                                        </td>

                                        {/* <td>
                                            <a href={`tel:${e.phone}`}>{e.phone}</a>
                                        </td>

                                        <td>{e.email || "—"}</td> */}
                                        <td>{e.courseName}</td>
                                        <td>{new Date(e.createdAt).toLocaleDateString()}</td>

                                        <td className="d-flex align-items-center gap-2">
                                            <span className={`rbt-badge-5 ${getStatusBadge(e.status)}`}>
                                                {e.status}
                                            </span>

                                            {/* Edit Status */}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link p-0"
                                                title="Update Status"
                                                onClick={() =>
                                                    updateStatus(
                                                        e._id,
                                                        e.status === "new" ? "contacted" : "new"
                                                    )
                                                }
                                            >
                                                <i className="feather-edit-2"></i>
                                            </button>

                                            {/* Convert */}
                                            {!e.convertedToLead && (
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-link p-0 text-success"
                                                    title="Convert to Lead"
                                                    onClick={() => convertToLead(e._id)}
                                                >
                                                    <i className="feather-user-plus"></i>
                                                </button>
                                            )}

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link p-0 text-danger"
                                                title="Delete Enquiry"
                                                onClick={() => deleteEnquiry(e._id)}
                                            >
                                                <i className="feather-trash-2"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        {filtered.length === 0 && (
                            <p className="text-center mt--20">No enquiries found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiredHistory;
