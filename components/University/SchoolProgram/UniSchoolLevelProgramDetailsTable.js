import ReactMarkdown from "react-markdown";

const UniSchoolLevelProgramDetailsTable = ({
  CourseDetails,
  filteredUniversities,
  UniversityDetails,
  BigScreenLogic,
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
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #19233550",
              overflow: "hidden",
              tableLayout: "fixed",
            }}
          >
            {[
              "Degree",
              "Full Form",
              "Duration",
              "Eligibility",
              ...(UniversityDetails?.registrationFee ||
                CourseDetails?.overviewTableDetails[0]?.registrationFee
                ? ["Registration Fee"]
                : []),
              UniversityDetails?.isAnnualFee
                ? "Annual Fee"
                : "Semester Fee"
              ,
              ...(UniversityDetails?.examFee ||
                CourseDetails?.overviewTableDetails[0]?.examFee
                ? ["Exam Fee"]
                : []),
              "Learning Mode",
              "EMI Available",
            ].map((item, index, arr) => (
              <th
                key={index}
                style={{
                  padding: "12px 16px",
                  fontWeight: "600",
                  width: "auto",
                  border: "1px solid #19233550",
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
          {CourseDetails?.overviewTableDetails?.map((item, index) => (
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
                <ReactMarkdown>
                  {item?.degree}
                </ReactMarkdown>
              </td>

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.fullName}
                </ReactMarkdown>
              </td>

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.duration}
                </ReactMarkdown>
              </td>

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.eligibility}
                </ReactMarkdown>
              </td>

              {(UniversityDetails?.registrationFee ||
                item?.registrationFee) && (
                  <td
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #19233550",
                    }}
                  >
                    <ReactMarkdown>
                      {UniversityDetails?.registrationFee ||
                        item?.registrationFee}
                    </ReactMarkdown>
                  </td>
                )}

              <td
                style={{
                  padding: "12px 16px",
                  width: "full",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.annualFeeRange || item?.semesterFee}
                </ReactMarkdown>
              </td>

              {(UniversityDetails?.examFee || item?.examFee) && (
                <td
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #19233550",
                  }}
                >
                  <ReactMarkdown>
                    {UniversityDetails?.examFee || item?.examFee}
                  </ReactMarkdown>
                </td>
              )}

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.learningMode}
                </ReactMarkdown>
              </td>

              <td
                style={{
                  padding: "12px 16px",
                  border: "1px solid #19233550",
                }}
              >
                <ReactMarkdown>
                  {item?.emiAvailable}
                </ReactMarkdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniSchoolLevelProgramDetailsTable;
