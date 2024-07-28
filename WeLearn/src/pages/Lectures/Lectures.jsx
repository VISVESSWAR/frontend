import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import Loading from "../../assets/components/Loading/Loading";
import toast from "react-hot-toast";

const Lectures = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLectures();
  }, []);

  if (user && user.role !== "admin" && !user.courses.includes(params.id))
    return navigate("/");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myform = new FormData();
    myform.append("title", title);
    myform.append("description", description);
    myform.append("file", video);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myform,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setBtnLoading(false);
      setShow(!show);
      fetchLectures();
      setDescription("");
      setTitle("");
      setVideo("");
      setVideoPreview("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteLecture = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchLecture(id) {
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLoading(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPreview("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 md:pr-4">
              {lecLoading ? (
                <Loading />
              ) : (
                <div className="bg-white p-4 rounded shadow-md mb-4">
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        width="100%"
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        className="mb-4 rounded"
                      ></video>
                      <h1 className="text-2xl font-bold">{lecture.title}</h1>
                      <p className="text-gray-700">{lecture.description}</p>
                    </>
                  ) : (
                    <h1 className="text-2xl font-bold">Please select a lecture</h1>
                  )}
                </div>
              )}
            </div>
            <div className="md:w-1/3">
              {user && user.role === "admin" && (
                <button
                  disabled={btnLoading}
                  onClick={handleShow}
                  className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                >
                  {btnLoading ? "Please wait..." : "Add new Lecture"}
                </button>
              )}
              {show && (
                <div className="bg-white p-4 rounded shadow-md mb-4">
                  <h2 className="text-xl font-bold mb-4">Add Lecture</h2>
                  <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                        Video
                      </label>
                      <input
                        type="file"
                        onChange={changeVideoHandler}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    {videoPreview && (
                      <div className="mt-4">
                        <video src={videoPreview} controls width={300} className="rounded"></video>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Add
                    </button>
                  </form>
                </div>
              )}
              <div className="space-y-2">
                {lectures && lectures.length > 0 ? (
                  lectures.map((lec, i) => (
                    <div key={lec._id} className="flex items-center justify-between bg-gray-100 p-2 rounded shadow-md">
                      <div onClick={() => fetchLecture(lec._id)} className="cursor-pointer">
                        {i + 1}. {lec.title}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          onClick={() => deleteLecture(lec._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">More Lectures to be added!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lectures;
