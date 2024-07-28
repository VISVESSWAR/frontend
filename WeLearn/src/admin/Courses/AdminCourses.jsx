import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../assets/components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [show, setShow] = useState(false);
  const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
  ];

  const { fetchAllCourses, courses } = CourseData();

  if (user && user.role !== "admin") {
    return navigate("/");
  }

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myform = new FormData();
    myform.append("title", title);
    myform.append("description", description);
    myform.append("category", category);
    myform.append("duration", duration);
    myform.append("createdBy", createdBy);
    myform.append("price", price);
    myform.append("file", image);
    try {
      const { data } = await axios.post(`${server}/api/course/add`, myform, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(!show);

      setTitle("");
      setCategory("");
      setDuration("");
      setCreatedBy("");
      setDuration("");
      setImage("");
      setImagePreview("");
      fetchAllCourses();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard course={course} key={course._id} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No courses available yet!</p>
          )}
        </div>
        <div className="text-center mb-8">
          <button
            disabled={btnLoading}
            type="submit"
            onClick={handleShow}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {btnLoading ? <p>Please wait...</p> : <p>Add new Course</p>}
          </button>
        </div>
        {show && (
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Course</h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                >
                  <option value="">Select a Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-gray-700 font-semibold">Duration</label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  required
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 font-semibold">Price</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="createdBy" className="block text-gray-700 font-semibold">Creator</label>
                <input
                  type="text"
                  id="createdBy"
                  value={createdBy}
                  required
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-gray-700 font-semibold">Image</label>
                <input
                  type="file"
                  id="image"
                  placeholder="Choose an image file"
                  required
                  onChange={changeImageHandler}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
                {image && (
                  <button
                    onClick={() => {
                      setImage("");
                      setImagePreview("");
                    }}
                    className="mt-2 text-red-600 hover:underline"
                  >
                    Remove image
                  </button>
                )}
              </div>
              <div className="text-center">
                <button
                  disabled={btnLoading}
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                  {btnLoading ? <p>Please wait...</p> : <p>Add new Course</p>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminCourses;
