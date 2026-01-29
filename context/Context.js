import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreateContext = createContext();

export const useAppContext = () => useContext(CreateContext);

const Context = ({ children }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const [Courses, setCourses] = useState(true);
  const [cartToggle, setCart] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [search, setSearch] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [smallMobileMenu, setsmallMobileMenu] = useState(true);
  const [pricing, setPricing] = useState(true);
  const [pricingTwo, setPricingTwo] = useState(true);
  const [pricingThree, setPricingThree] = useState(true);
  const [pricingFour, setPricingFour] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [IsOpenSelectedCourse, setIsOpenSelectedCourse] = useState(false);

  // FOR LOGIN & REGISTER
  const [IsOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [IsPhoneNumber, setIsPhoneNumber] = useState("");
  const [IsUserExist, setIsUserExist] = useState(null);
  const [IsCurrentStep, setIsCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  // const [Isotp, setIsOtp] = useState("");

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
  }, [cart]);
  
  return (
    <CreateContext.Provider
      value={{
        toggle,
        setToggle,
        mobile,
        setMobile,
        smallMobileMenu,
        setsmallMobileMenu,
        cartToggle,
        setCart,
        search,
        setSearch,
        pricing,
        setPricing,
        pricingTwo,
        setPricingTwo,
        pricingThree,
        setPricingThree,
        pricingFour,
        setPricingFour,
        Courses,
        setCourses,
        isOpen,
        setIsOpen,
        IsOpenSelectedCourse,
        setIsOpenSelectedCourse,

        // for login

        IsOpenLoginModal,
        setIsOpenLoginModal,
        IsPhoneNumber,
        setIsPhoneNumber,
        IsUserExist,
        setIsUserExist,
        IsCurrentStep,
        setIsCurrentStep,
        user,
        setUser,
        // Isotp,
        // setIsOtp,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
};

export default Context;
