import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./car.css";
import { useGetBlogTag } from "../../hooks/api";
import moment from "moment";
import { Avatar, CircularProgress } from "@mui/material";
const Cars = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const { isLoading, error, data, refetch } = useGetBlogTag(
    "car",
    currentPage?.selected + 1,
    itemsPerPage
  );

  const handlePageClick = (selectedPage) => {
    if (selectedPage !== currentPage) {
      setCurrentPage(selectedPage);
      refetch({ page: selectedPage + 1 });
    }
  };

  return (
    <div className="max-w-[1040px] mt-5 mx-auto h-auto">
      {isLoading && <CircularProgress color="secondary" />}
      {error && <h3>Error Loading data</h3>}

      <h3 className="text-md font-bold uppercase text-orange-500">
        Latest on cars
      </h3>

      <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data &&
          data?.data?.map((item, index) => (
            <div key={index} className="rounded-md shadow-lg flex flex-col">
              <img
                className="h-[120px] w-full"
                src={item.image}
                alt={`car Post ${index + 1}`}
              />
              <div className="m-2">
                <div className="flex flex-row gap-1">
                  {item &&
                    item?.tags?.map((tag, i) => (
                      <h8
                        key={i}
                        className="text-xs text-white bg-blue-500 rounded-full p-1 m-1">
                        {tag}
                      </h8>
                    ))}
                </div>
                <h4 className="text-xs mt-2 font-bold">{item?.text}</h4>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">
                    {moment(item?.publishDate).format("LL")}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs flex justify-center gap-1 items-center">
                    <Avatar
                      alt="Remy Sharp"
                      src={item?.owner?.picture}
                      sx={{ width: 24, height: 24 }}
                    />
                    {item?.owner?.title +
                      " " +
                      item?.owner?.firstName +
                      " " +
                      item?.owner?.lastName}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(data?.total / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
      />
    </div>
  );
};

export default Cars;
