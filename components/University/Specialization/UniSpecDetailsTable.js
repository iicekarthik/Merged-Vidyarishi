import React from "react";

const UniSpecializationDetailsTable = ({
  CourseDetails,
  filteredUniversities,
  UniversityDetails,
  BigScreenLogic,
  specializationDetails,
}) => {
  return (
    <div
      style={{
        marginTop: "40px",
        marginBottom: "-40px",
        width: "100%",
        overflow: "hidden",
        overflowX: BigScreenLogic ? "hidden" : "scroll",
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: "0",

          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #19233550",
          fontSize: "14px",
          color: "black",
        }}
      >
        <thead
          style={{
            fontSize: "16px",
            color: "black",
          }}
        >
          <tr
            style={{
              backgroundColor: "#b966e721",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {[
              "Degree",
              "Full Form",
              "Specialization",
              "Duration",
              "Eligibility",
              ...(UniversityDetails?.registrationFee
                ? ["Registration Fee"]
                : []),
              UniversityDetails?.isAnnualFee
                ? "Annual Fee"
                : "Semester Fee",

              ...(UniversityDetails?.examFee || specializationDetails?.overviewTableDetails[0]?.examFee ? ["Exam Fee"] : []),
              "Learning Mode",
              "EMI Available",
            ].map((item, index, arr) => (
              <th
                key={index}
                style={{
                  padding: "12px 16px",
                  fontWeight: "600",
                  border: "1px solid #19233550", // Header border
                  borderTopLeftRadius: index === 0 ? "12px" : "0",
                  borderTopRightRadius:
                    index === arr?.length - 1 ? "12px" : "0",
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specializationDetails?.overviewTableDetails?.map((item, index) => (
            <tr
              key={index}
              style={{ backgroundColor: "#fff", textAlign: "center" }}
            >
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.degree}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.fullName}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {specializationDetails.specialization_name}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.duration}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.eligibility}
              </td>
              {(UniversityDetails?.registrationFee ||
                item?.registrationFee) && (
                  <td
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #19233550",
                    }}
                  >
                    {UniversityDetails?.registrationFee || item?.registrationFee}
                  </td>
                )}
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.annualFeeRange || item?.semesterFee}
              </td>
              {(item?.examFee) && (
                <td
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #19233550",
                  }}
                >
                  {item?.examFee}
                </td>
              )}

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.learningMode}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                {item?.emiAvailable}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniSpecializationDetailsTable;
