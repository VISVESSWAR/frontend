import { useNavigate, useParams, Link } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { useEffect } from "react";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, params.id]);

  if (user && user.role !== "admin" && !user.courses.includes(params.id)) {
    navigate("/");
  }

  return (
    <>
      {course && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <img src={`${server}/${course.image}`} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="text-gray-700 mb-4">By: <span className="font-semibold">{course.createdBy}</span></p>
            <p className="text-gray-700 mb-4">Duration: <span className="font-semibold">{course.duration} weeks</span></p>
            <Link to={`/lectures/${course._id}`} className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Begin Lectures
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
