/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Explore(props) {
  return (
    <div className="flex  items-center gap-3">
      <Link to={"/chats"}>
        <div
          className={`p-3 cursor-pointer ${props.bgColor}  flex items-center justify-center rounded-lg hover:brightness-90 transition-all duration-150`}
        >
          <img
            className="md:w-6  md:h-6 w-10 h-6 cursor-pointer hover:scale-125 transitions-all duration-150"
            src={props.img}
            alt=""
          />
        </div>
      </Link>
      <div>
        <p className="text-gray-200 text-xs md:text-xl">{props.head}</p>
        <p className="text-[10px] font-extralight">{props.body}</p>
      </div>
    </div>
  );
}
