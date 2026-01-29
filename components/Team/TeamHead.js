const TeamHead = ({
  BeforeJointtitle,
  subTitle,
  title,
  desc,
  isTheme,
  Jointtitle,
  isPurpuleHeading1 = false,
  isPurpuleHeading2 = false,
}) => {
  return (
    <>
      <div className="row mt--10 mb--50">
        <div className="col-lg-12">
          <div className="section-title text-center">
            {isTheme === "theme1" && subTitle ? (
              <span
                className="rbt-badge-6 bg-secondary-opacity"
                style={{ fontWeight: "bolder" }}
              >
                {subTitle}
              </span>
            ) : isTheme === "theme2" && subTitle ? (
              <span
                className="subtitle bg-pink-opacity"
                style={{ fontWeight: "bolder" }}
              >
                {subTitle}
              </span>
            ) : (
              <span
                className="rbt-badge-4 mb--10"
                style={{ fontWeight: "bolder" }}
              >
                {subTitle}
              </span>
            )}
            <h4 className="title">
              <span>{BeforeJointtitle}</span>
              <span style={{ color: isPurpuleHeading1 && "#b966e7" }}>
                {title}
              </span>
              <span style={{ color: isPurpuleHeading2 && "#b966e7" }}>
                {Jointtitle}
              </span>
            </h4>
            <p
              style={{ padding: "10px", fontWeight: "500" }}
              className="description mt--10"
            >
              {desc &&
                desc?.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < desc.length - 1 && <br />}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamHead;
