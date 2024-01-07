import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SectionTop = ({ img, text, tags, date, id }) => {
  let nav = useNavigate();
  return (
    <div
      className="border-b border-gray-200 p-4 flex items-start gap-4 cursor-pointer"
      onClick={() => nav(`/single-post/${id}`)}>
      <img
        className="w-16 h-16 object-cover rounded"
        src={
          img ||
          "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
        }
        alt="Blog Cover"
      />
      <div className="flex flex-col">
        <div className="flex gap-2 mb-2">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h5 className="text-sm font-semibold mb-1">{text}</h5>
        <h6 className="text-xs text-gray-500">{moment(date).format("LL")}</h6>
      </div>
    </div>
  );
};

export default SectionTop;
