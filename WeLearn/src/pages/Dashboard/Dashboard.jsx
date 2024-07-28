import CourseCard from "../../assets/components/CourseCard/CourseCard";
import { CourseData } from "../../context/CourseContext";

const Dashboard = ({ user }) => {
  const { myCourse } = CourseData();
  console.log(myCourse);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Enrolled Courses</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myCourse && myCourse.length > 0 ? (
          myCourse.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">Please enroll in a course</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
