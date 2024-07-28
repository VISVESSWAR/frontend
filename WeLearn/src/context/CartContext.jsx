import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "./UserContext";
import { server } from "../main";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = UserData();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(
            `${server}/api/user/cart/${user._id}`
          );
          setCart(response.data.cart);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const handleAddCourse = async (course) => {
    if (user && user._id) {
      console.log(course._id, course.title, course.price, user._id);
      try {
        const response = await axios.post(`${server}/api/user/cart/add`, {
          userId: user._id,
          course: {
            _id: course._id,
            title: course.title,
            price: course.price,
            duration: course.duration,
            image: course.image,
            createdBy: course.createdBy,
          },
        });
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error adding course to cart:", error);
      }
    }
  };

  const handleRemoveCourse = async (courseId) => {
    if (user && user._id) {
      try {
        const response = await axios.post(`${server}/api/user/cart/remove`, {
          userId: user._id,
          courseId,
        });
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error removing course from cart:", error);
      }
    }
  };

  const handlePay = async () => {
    if (user && user._id) {
      try {
        console.log(user._id, server);
        const response = await axios.post(`${server}/api/user/cart/checkout`, {
          userId: user._id,
        });
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddCourse, handleRemoveCourse, handlePay }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
