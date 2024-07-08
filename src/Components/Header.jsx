import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
    toast.success("Logout");
    navigate("/");
  };

  return (
    <div className="flex justify-between mr-2 gap-2 items-center  text-sm  mt-2">
      <div className="flex items-center">
        <Link to={"/"}>
          <h1 className="cursor-pointer ml-4 md:text-xl text font-extrabold">
            My-GPT
          </h1>
        </Link>
      </div>
      <ul className="md:flex flex gap-6 cursor-pointer items-center">
        {token ? (
          <>
            <li
              onClick={deleteToken}
              className="select-none text-black text-xs md:text-md hover:text-white transition-all duration-500 md:inline  cursor-pointer px-3 py-1 rounded-md bg-green-600"
            >
              Logout
            </li>
            <Link to={"/chats"}>
              <li className="text-black text-xs md:text-md select-none  md:inline  hover:text-white transition-all duration-500 px-3 py-1 rounded-md bg-green-600">
                Use MyGpt
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/signUp"}>
              <li className="text-black text-xs md:text-md select-none md:inline-  hover:text-white transition-all duration-500 cursor-pointer px-5 py-1 rounded-md bg-green-600">
                Register
              </li>
            </Link>
            <Link to={"/chats"}>
              <li className="text-black text-xs md:text-md text-nowrap select-none md:inline  hover:text-white transition-all duration-500 px-5 py-1 f rounded-md bg-green-600">
                Use MyGpt
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
