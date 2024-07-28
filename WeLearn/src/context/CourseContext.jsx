import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import { toast, Toaster } from "react-hot-toast";

const CourseContext = createContext();
export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  async function fetchAllCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      console.log(data);
      setCourses(data.allCourses);
      //toast.success()
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  }
  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      console.log(data);
      setCourse(data.singleCourse);
      console.log("course:", course);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/myCourses`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyCourse(data.myCourses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchAllCourses,
        fetchCourse,
        course,
        myCourse,
        fetchMyCourse,
      }}
    >
      {children}
      <Toaster />
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
