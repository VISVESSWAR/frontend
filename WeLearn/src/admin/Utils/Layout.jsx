import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
