import PageHead from "../Head";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";

import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import FooterThree from "@/components/Footer/Footer-Three";

import React from "react";
import AdminAuth from "@/components/Admin/AdminAuthentication/AdminAuth";

const Disclaimer = () => {
    return (
        <>
            <PageHead
                title="Admin Login | Vidyarishi"
                description="Secure admin authentication for Vidyarishi. Authorized administrators can log in or register to manage courses, users, and platform settings."
            />
{/* 
            <Provider store={Store}>
                <Context> */}
                    <MobileMenu />
                    <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
                    <div>
                        <AdminAuth />
                    </div>
                    <Separator />
                    <FooterThree />
                {/* </Context>
            </Provider> */}
        </>
    );
};

export default Disclaimer;
