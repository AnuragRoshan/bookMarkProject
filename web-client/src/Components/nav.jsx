import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBookmarksOutline, IoBookmarksSharp } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { IoIosFolder } from "react-icons/io";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(isOpen);
  const [activeLink, setActiveLink] = useState("/");
  const [collectionList, setcollectionList] = useState([]);
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    getCollectionList();
  }, []);

  const getCollectionList = async () => {
    const user_id = "6608f182472c4f5e0dda23b7";
    const data = await axios.post(
      "http://localhost:5000/api/v1/collections/fetch",
      {
        user_id,
      }
    );
    console.log(data.data.collection_list);
    setcollectionList(data.data.collection_list);
  };

  const menuItem = [
    //   {
    //     // bookmark/:origin/:id
    //     path: "/bookmark/collection/collection1",
    //     name: "collection1",
    //   },
    //   {
    //     path: "bookmark/collection/collection2",
    //     name: "collection2",
    //   },
    //   {
    //     path: "bookmark/collection/collection3",
    //     name: "collection3",
    //   },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div className="user">
            <div className="user-logo">
              <FaRegUserCircle />
            </div>
            <div>anurag15</div>
          </div>
          {/* <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div> */}
        </div>
        <Link
          to={"/bookmark/allbokmarks/true"}
          // key={}
          className={activeLink === "AllBookmarks" ? "active link" : "link"}
          onClick={() => handleLinkClick("AllBookmarks")}
        >
          {activeLink === "AllBookmarks" ? (
            <div className="icon">
              <IoBookmarksSharp />
            </div>
          ) : (
            <div className="icon">
              <IoBookmarksOutline />
            </div>
          )}
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            All Bookmarks
          </div>
        </Link>
        {collectionList && collectionList.length > 0 ? (
          <>
            <div className="collections">Collections</div>
            {collectionList.map((item, index) => (
              <Link
                to={`/bookmark/collection/${item}`}
                key={index}
                className={activeLink === item.path ? "active link" : "link"}
                onClick={() => handleLinkClick(`/bookmark/collection/${item}`)}
              >
                <div className="icon">
                  {activeLink === `/bookmark/collection/${item}` ? (
                    <div className="icon">
                      <IoIosFolder />
                    </div>
                  ) : (
                    <div className="icon">
                      <FaRegFolder />
                    </div>
                  )}
                  {/* <FaRegFolder /> */}
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item}
                </div>
                {/* <div className="link_dot">
                  <HiOutlineDotsVertical onClick={{}} />
                </div> */}
              </Link>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
