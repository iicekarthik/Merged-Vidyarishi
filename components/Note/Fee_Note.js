import React from 'react'

function Fee_Note(isAnnualFee, isSemesterFee) {
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "red",
                padding: "5px"

            }}
        >

            {/* <h3>
                Note: Payment of the{" "}
                {isAnnualFee
                    ? "annual fee "
                    : isSemesterFee
                        ? "first semester fee "
                        : "annual fee or first semester fee "}
                at the time of enrollment is mandatory to initiate and confirm student registration.
            </h3> */}

            <p>Note: Payment of the first semester or annual fee at the time of enrollment is mandatory to initiate and confirm student registration.</p>

        </div>
    )
}

export default Fee_Note