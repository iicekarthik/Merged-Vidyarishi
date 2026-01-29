import PageHead from "./Head";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import Separator from "@/components/Common/Separator";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import NotFound from "@/components/NotFound/NotFound";
import FooterThree from "@/components/Footer/Footer-Three";

const ErrorPage = () => {
  return (
    <Provider store={Store}>
      <Context>
        <PageHead title="Page not found" />
        <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

        <NotFound />

        <Separator />
        <FooterThree />
      </Context>
    </Provider>
  );
};

export default ErrorPage;
