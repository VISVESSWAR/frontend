import { Link } from "react-router-dom";
import Testimonials from "../../assets/components/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center">
      <div className="bg-white text-center p-8 mt-10 rounded shadow-lg w-3/4 max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to <span className="text-blue-800">lookSkill</span>
        </h1>
        <p className="text-lg text-blue-700 mt-4">
          A Sea of Courses available to learn.
          <br />
          Pick and Learn any course of your choice.
          <br />
          Learn a new skill any day, every day.
        </p>
        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          <Link to="/register">Get Started</Link>
        </button>
      </div>
      <div className="mt-10 w-full flex justify-center">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
