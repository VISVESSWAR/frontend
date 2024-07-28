import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../assets/components/CourseCard/CourseCard";
import { useEffect } from "react";

const Courses = () => {
  const { courses, fetchAllCourses } = CourseData();
  useEffect(() => {
    fetchAllCourses();
  },[]);
  console.log(courses);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">No Courses Available Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
