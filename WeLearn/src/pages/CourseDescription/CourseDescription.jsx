import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import { useEffect } from "react";
import { CartData } from "../../context/CartContext";

export const CourseDescription = ({ user }) => {
  const { id } = useParams("id");
  const { handleAddCourse } = CartData();
  const navigate = useNavigate();
  const { fetchCourse, course, fetchMyCourse, myCourse } = CourseData();

  useEffect(() => {
    fetchCourse(id);
    fetchMyCourse();
  }, [fetchCourse, fetchMyCourse, id]);

  return (
    <>
      {course && (
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={`${server}/${course.image}`} 
              alt={course.title} 
              className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0"
            />
            <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-600">{course.title}</h2>
              <p className="text-lg text-gray-700">Instructor: {course.createdBy}</p>
              <p className="text-lg text-gray-700">Duration: {course.duration} weeks</p>
            </div>
          </div>
          <p className="mt-6 text-xl text-gray-800">Let us get started at just Rs.{course.price}</p>
          {user && user.courses.includes(course._id) ? (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Study
            </button>
          ) : (
            <button
              onClick={() => {
                handleAddCourse(course);
                navigate("/user/cart");
              }}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      )}
    </>
  );
};
