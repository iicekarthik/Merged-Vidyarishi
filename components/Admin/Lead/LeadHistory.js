"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateLeadStatusModal from "@/components/Admin/Lead/UpdateLeadStatusModal";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const LeadHistory = () => {
    const [leads, setLeads] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [courseFilter, setCourseFilter] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [saving, setSaving] = useState(false);
    const [remark, setRemark] = useState("");

    /* ===================== FETCH ===================== */

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [search, statusFilter, courseFilter, leads]);

    const fetchLeads = async () => {
        try {
            const res = await axios.get("/api/admin/leads", {
                withCredentials: true,
            });

            if (res.data.success) {
                setLeads(res.data.leads);
                setFiltered(res.data.leads);
            }
        } catch (err) {
            console.error("Fetch leads error:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteLead = async (id) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;

        await axios.delete(
            "/api/admin/leads",
            {
                data: { leadId: id },
                withCredentials: true,
            }
        );

        toast.success("Lead deleted");
        fetchLeads();
    };

    /* ===================== FILTERS ===================== */

    const applyFilters = () => {
        let data = [...leads];

        if (search) {
            data = data.filter(
                l =>
                    l.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                    l.phone?.includes(search) ||
                    l.email?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            data = data.filter(l => l.leadStatus === statusFilter);
        }

        if (courseFilter) {
            data = data.filter(l => l.course === courseFilter);
        }

        setFiltered(data);
    };

    /* ===================== MODAL ===================== */

    const openStatusModal = (lead) => {
        setSelectedLead(lead);
        setNewStatus(lead.leadStatus);
        setRemark(lead.remark || ""); // ✅ fetch existing remark
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedLead(null);
        setNewStatus("");
        setRemark("");
    };

    const saveStatus = async () => {
        if (!selectedLead) return;

        // ✅ close modal immediately (unlocks scroll safely)
        closeModal();

        try {
            setSaving(true);

            await axios.patch(
                "/api/admin/leads",
                {
                    leadId: selectedLead._id,
                    leadStatus: newStatus,
                    remark, // ✅ NEW
                },
                { withCredentials: true }
            );

            setLeads(prev =>
                prev.map(l =>
                    l._id === selectedLead._id
                        ? { ...l, leadStatus: newStatus }
                        : l
                )
            );

            toast.success("Lead status updated successfully");
            // ✅ auto-refresh from server
            await fetchLeads();

        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setSaving(false);
        }
    };

    /* ===================== STATUS BADGE ===================== */

    const getStatusBadge = (status) => {
        switch (status) {
            case "converted":
                return {
                    label: "Converted",
                    className: "bg-color-success-opacity color-success",
                };

            case "contacted":
                return {
                    label: "Contacted",
                    className: "bg-primary-opacity",
                };

            case "on_hold":
                return {
                    label: "On Hold",
                    className: "bg-color-danger-opacity color-danger",
                };

            default:
                return {
                    label: "New",
                    className: "bg-color-warning-opacity color-warning",
                };
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setCourseFilter("");
        setFiltered(leads); // reset table data
    };

    const courses = [...new Set(leads.map(l => l.course))];

    if (loading) {
        return <p className="text-center">Loading leads...</p>;
    }

    /* ===================== DownloadLeadsExcel ===================== */

    const downloadLeadsExcel = async () => {
        const dataToExport = filtered.length ? filtered : leads;

        if (!dataToExport.length) {
            toast.info("No leads to download");
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Leads");

        // ================= HEADERS =================
        worksheet.columns = [
            { header: "Sr No", key: "sr", width: 6 },
            { header: "Full Name", key: "fullName", width: 25 },
            { header: "Phone", key: "phone", width: 12 },
            { header: "Alternate Phone", key: "altPhone", width: 16 },
            { header: "Email", key: "email", width: 30 },
            { header: "Alternate Email", key: "altEmail", width: 30 },
            { header: "Course", key: "course", width: 30 },
            { header: "Enrolled Courses", key: "enrolled", width: 30 },
            { header: "Completed Courses", key: "completed", width: 30 },
            { header: "Qualification", key: "qualification", width: 18 },
            { header: "City", key: "city", width: 14 },
            { header: "State", key: "state", width: 16 },
            { header: "WhatsApp Opt-in", key: "whatsapp", width: 16 },
            { header: "Phone Verified", key: "phoneVerified", width: 16 },
            { header: "Remark", key: "remark", width: 40 },
            { header: "Lead Status", key: "status", width: 12 },
            { header: "Account Created Date", key: "createdAt", width: 20 },
            { header: "Last Login", key: "lastLogin", width: 20 },
        ];

        // ================= DATA =================
        dataToExport.forEach((l, index) => {
            worksheet.addRow({
                sr: index + 1,
                fullName: l.fullName,
                phone: l.phone,
                altPhone: l.alternatePhone || "",
                email: l.email || "",
                altEmail: l.alternateEmail || "",
                course: l.course,
                enrolled: l.enrolledCourses?.map(c => c.title).join(", "),
                completed: l.completedCourses?.map(c => c.title).join(", "),
                qualification: l.qualification,
                city: l.city,
                state: l.state,
                whatsapp: l.whatsapp ? "Yes" : "No",
                phoneVerified: l.isPhoneNumberVerified ? "Yes" : "No",
                remark: l.remark || "",
                status: l.leadStatus,
                createdAt: new Date(l.createdAt).toLocaleDateString(),
                lastLogin: l.lastLoginAt
                    ? new Date(l.lastLoginAt).toLocaleString()
                    : "Never",
            });
        });

        // ================= LOCK COLUMNS =================
        // 3,4,5,6 = Phone, Alt Phone, Email, Alt Email
        [3, 4, 5, 6].forEach(colNumber => {
            worksheet.getColumn(colNumber).eachCell((cell) => {
                cell.protection = { locked: true };
            });
        });

        // Unlock all other columns
        worksheet.columns.forEach((col, index) => {
            if (![3, 4, 5, 6].includes(index + 1)) {
                col.eachCell(cell => {
                    cell.protection = { locked: false };
                });
            }
        });

        // ================= PROTECT SHEET =================
        await worksheet.protect("admin-only", {
            selectLockedCells: true,
            selectUnlockedCells: true,
        });

        // ================= DOWNLOAD =================
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(
            new Blob([buffer]),
            `leads_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    // const downloadLeadsExcel = () => {
    //     const dataToExport = filtered.length ? filtered : leads;

    //     if (!dataToExport.length) {
    //         toast.info("No leads to download");
    //         return;
    //     }

    //     const formattedData = dataToExport.map((l, index) => ({
    //         "Sr No": index + 1,
    //         "Full Name": l.fullName,
    //         "Phone": l.phone,
    //         "Alternate Phone": l.alternatePhone || "",
    //         "Email": l.email || "",
    //         "Alternate Email": l.alternateEmail || "",
    //         "Course": l.course,
    //         "Enrolled Courses": l.enrolledCourses?.map(c => c.title).join(", "),
    //         "Completed Courses": l.completedCourses?.map(c => c.title).join(", "),
    //         "Qualification": l.qualification,
    //         "City": l.city,
    //         "State": l.state,
    //         "WhatsApp Opt-in": l.whatsapp ? "Yes" : "No",
    //         "Phone Verified": l.isPhoneNumberVerified ? "Yes" : "No",
    //         "Lead Status": l.leadStatus,
    //         "Account Created Date": new Date(l.createdAt).toLocaleDateString(),
    //         "Last Login": l.lastLoginAt ? new Date(l.lastLoginAt).toLocaleString() : "Never",
    //     }));

    //     const worksheet = XLSX.utils.json_to_sheet(formattedData);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    //     // 1️⃣ Unlock ALL cells first
    //     const range = XLSX.utils.decode_range(worksheet["!ref"]);

    //     for (let R = range.s.r; R <= range.e.r; ++R) {
    //         for (let C = range.s.c; C <= range.e.c; ++C) {
    //             const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
    //             if (!worksheet[cellRef]) continue;

    //             worksheet[cellRef].s = {
    //                 protection: { locked: false }
    //             };
    //         }
    //     }

    //     // 2️⃣ Lock ONLY sensitive columns
    //     // Phone, Alt Phone, Email, Alt Email
    //     [2, 3, 4, 5].forEach(col => {
    //         for (let R = range.s.r; R <= range.e.r; ++R) {
    //             const cellRef = XLSX.utils.encode_cell({ r: R, c: col });
    //             if (!worksheet[cellRef]) continue;

    //             worksheet[cellRef].s = {
    //                 protection: { locked: true }
    //             };
    //         }
    //     });

    //     // 3️⃣ Enable sheet protection LAST
    //     worksheet["!protect"] = {
    //         sheet: true,
    //         selectLockedCells: true,
    //         selectUnlockedCells: true
    //     };

    //     worksheet["!cols"] = [
    //         { wch: 6 },   // Sr No
    //         { wch: 25 },  // Full Name 
    //         { wch: 10 },  // Phone 
    //         { wch: 14 },  // Alternate Phone
    //         { wch: 30 },  // Email
    //         { wch: 30 },  // Alternate Email
    //         { wch: 25 },  // Course
    //         { wch: 25 },  // Enrolled Courses
    //         { wch: 25 }, // Completed Courses
    //         { wch: 16 },  // Qualification
    //         { wch: 12 },  // City
    //         { wch: 15 },  // State
    //         { wch: 15 },  // WhatsApp
    //         { wch: 12 },  // Phone Verified
    //         { wch: 10 },  // Status
    //         { wch: 18 },  // Created Date
    //         { wch: 18 },  // Last Login
    //     ];

    //     // ✅ 4️⃣ WRITE FILE AT THE END
    //     XLSX.writeFile(
    //         workbook,
    //         `leads_${new Date().toISOString().slice(0, 10)}.xlsx`,
    //         { cellStyles: true }
    //     );
    // };

    /* ===================== UI ===================== */

    return (

        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
            <div className="content">
                <div className="d-flex justify-content-between align-items-center mb--20">
                    <h4 className="rbt-title-style-3 mb-0">Student Leads</h4>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={downloadLeadsExcel}
                    >
                        <i className="feather-download me-2"></i>
                        Download Leads
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
                            <option value="on_hold">On Hold</option>
                            <option value="converted">Converted</option>
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
                            type="button"
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
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Location</th>
                                    <th>Course</th>
                                    <th>Course Progress</th>
                                    <th>Last Login</th>
                                    <th>Date</th>
                                    <th>Remark</th>
                                    <th>Status</th>

                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map(l => (
                                    <tr key={l._id}>
                                        <td>
                                            <strong>{l.fullName}</strong>
                                            <div className="small text-muted">{l.qualification}</div>
                                        </td>

                                        <td>
                                            <a href={`tel:${l.phone}`}>{l.phone}</a>
                                        </td>

                                        <td>{l.email || "—"}</td>
                                        <td>{l.city}, {l.state}</td>
                                        <td>{l.course}</td>
                                        <td>
                                            {l.completedCourses?.length
                                                ? `🎓 ${l.completedCourses.length} completed`
                                                : l.enrolledCourses?.length
                                                    ? `📚 ${l.enrolledCourses.length} enrolled`
                                                    : "—"}
                                        </td>

                                        <td>{new Date(l.createdAt).toLocaleDateString()}</td>

                                        <td>
                                            {l.lastLoginAt
                                                ? new Date(l.lastLoginAt).toLocaleString()
                                                : "Never logged in"}
                                        </td>
                                        <td style={{ maxWidth: "220px" }}>
                                            <span
                                                title={l.remark || ""}
                                                style={{
                                                    display: "block",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {l.remark || "—"}
                                            </span>
                                        </td>

                                        <td className="d-flex align-items-center gap-2">
                                            <span className={`rbt-badge-5 ${getStatusBadge(l.leadStatus).className}`}>
                                                {getStatusBadge(l.leadStatus).label}
                                            </span>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link p-0"
                                                title="Edit Status"
                                                onClick={() => openStatusModal(l)}
                                            >
                                                <i className="feather-edit-2"></i>
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-link p-0 text-danger"
                                                title="Delete Lead"
                                                onClick={() => deleteLead(l._id)}
                                            >
                                                <i className="feather-trash-2"></i>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filtered.length === 0 && (
                            <p className="text-center mt--20">No leads found</p>
                        )}
                    </div>
                </div>

                {/* Modal */}
                <UpdateLeadStatusModal
                    show={showModal}
                    lead={selectedLead}
                    status={newStatus}
                    setStatus={setNewStatus}
                    remark={remark}
                    setRemark={setRemark}
                    onClose={closeModal}
                    onSave={saveStatus}
                    loading={saving}
                />
            </div>
        </div>
    );
};

export default LeadHistory;
