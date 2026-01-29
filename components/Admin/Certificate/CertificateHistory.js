"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const CertificateHistory = () => {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCertificates();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [search, data]);

    const fetchCertificates = async () => {
        const res = await axios.get("/api/admin/certificates/history", {
            withCredentials: true,
        });
        setData(res.data.certificates);
        setFiltered(res.data.certificates);
    };

    const applyFilters = () => {
        let temp = [...data];

        if (search) {
            temp = temp.filter(c =>
                c.student?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                c.student?.email?.toLowerCase().includes(search.toLowerCase()) ||
                c.student?.phone?.includes(search)
            );
        }

        setFiltered(temp);
    };


    const clearFilters = () => {
        setSearch("");
        setFiltered([...data]);
    };

    const downloadCertificatesExcel = async () => {
        const dataToExport = filtered.length ? filtered : data;

        if (!dataToExport.length) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Certificates");

        worksheet.columns = [
            { header: "Sr No", key: "sr", width: 6 },
            { header: "Student Name", key: "name", width: 25 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 14 },
            { header: "Course", key: "course", width: 50 },
            { header: "Certificate ID", key: "certificateId", width: 40 },
            { header: "Issued On", key: "issuedOn", width: 14 },
        ];

        dataToExport.forEach((c, index) => {
            worksheet.addRow({
                sr: index + 1,
                name: c.student?.fullName || "—",
                email: c.student?.email || "—",
                phone: c.student?.phone || "—",
                course: c.courseTitle,
                certificateId: c.certificateId,
                issuedOn: new Date(c.createdAt).toLocaleDateString(),
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
            `certificates_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    return (
        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
            <div className="d-flex justify-content-between align-items-center mb--20">
                <h4 className="rbt-title-style-3 mb-0">Certificate Issue History</h4>

                <button
                    className="btn btn-primary"
                    onClick={downloadCertificatesExcel}
                    disabled={!data.length}
                >
                    <i className="feather-download me-2"></i>
                    Download Excel
                </button>
            </div>

            <div className="row g-3 mb--20">
                <div className="col-md-9">
                    <input
                        className="form-control"
                        placeholder="Search name / email / phone"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        style={{ height: "40px", fontSize: "14px" }}

                        onClick={clearFilters}
                        disabled={!search}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className="rbt-table table-responsive">
                <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Certificate ID</th>
                                <th>Issued On</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map(c => (
                                <tr key={c._id}>
                                    <td>
                                        <strong>{c.student?.fullName}</strong>

                                        <div className="small text-muted">
                                            {c.student?.email}
                                        </div>

                                        <div className="small">
                                            📞 <a href={`tel:${c.student?.phone}`}>
                                                {c.student?.phone || "—"}
                                            </a>
                                        </div>
                                    </td>
                                    <td>{c.courseTitle}</td>
                                    <td>{c.certificateId}</td>
                                    <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <a
                                            href={`/verify/${c.certificateId}`}
                                            target="_blank"
                                            className="btn btn-sm btn-primary"
                                        >
                                            Verify
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <p className="text-center mt--20">No certificates found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertificateHistory;
