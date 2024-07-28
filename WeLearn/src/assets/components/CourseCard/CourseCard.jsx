import { useNavigate } from "react-router-dom";
import { UserData } from "../../../context/UserContext";
import { server } from "../../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../../context/CourseContext";

const CourseCard = ({ course }) => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const { fetchAllCourses } = CourseData();

  const deleteHandler = async (course) => {
    if (confirm("Are you sure you want to delete the lecture?")) {
      try {
        const { data } = await axios.delete(
          `${server}/api/course/${course._id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchAllCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={`${server}/${course.image}`} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600">Instructor: {course.createdBy}</p>
        <p className="text-gray-600">Duration: {course.duration} weeks</p>
        <p className="text-blue-600 font-bold mt-2">Rs. {course.price}</p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.courses.includes(course._id) ? (
                  <button
                    onClick={() => {
                      navigate(`/course/study/${course._id}`);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/course/${course._id}`);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate(`/course/study/${course._id}`);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
                >
                  Study
                </button>
                <button
                  onClick={() => {
                    deleteHandler(course);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </>
            )}
          </>
        ) : (
          <button
            onClick={() => {
              navigate(`/login`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
