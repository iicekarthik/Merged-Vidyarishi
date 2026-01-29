import React, { useState } from "react";
import AmityMarketingMain from "@/components/Marketing/AmityUniversity/Main";
import { useScreenSize } from "@/hooks/screenSize";
import Loader from "@/components/Common/Loader";

const Index = () => {
    const screenSize = useScreenSize();
    const [loading, setLoading] = useState(true);

    // Map screen sizes to iframe heights
    const getIframeHeight = () => {
        switch (screenSize) {
            case "xxl":
            case "xl":
                return "99vh";
            case "lg":
            case "md":
            case "sm":
                return "98vh";
            case "xs":
                return "96vh";
            default:
                return "99vh";
        }
    };

    return (
        <div style={{ position: "relative", width: "100%", height: getIframeHeight() }}>
            {/* Loader Spinner */}
            {loading && (<Loader />)}
            {/* Iframe */}
            <iframe
                src="https://imaginative-kulfi-024a06.netlify.app/"
                title="Amity Landing Page"
                style={{
                    width: "100%",
                    height: getIframeHeight(),
                    border: "0",
                }}
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                onLoad={() => setLoading(false)} // hide loader when iframe loads
            />
        </div>
    );
};

export default Index;
