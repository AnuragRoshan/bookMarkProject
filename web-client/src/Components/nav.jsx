import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBookmarksOutline, IoBookmarksSharp } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { IoIosFolder } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";

import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [rotate, setRotate] = useState(false); // State to manage rotation
  const toggle = () => setIsOpen(isOpen);
  const [activeLink, setActiveLink] = useState("/");
  const [collectionList, setcollectionList] = useState([]);
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    getCollectionList();
  }, [rotate]);

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

  const handleReloadClick = () => {
    setRotate(true); // Start rotation
    setTimeout(() => {
      setRotate(false); // Stop rotation after a certain time
    }, 1000); // Adjust time as needed
    // Add your reload logic here
  };

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
          <div className="reload-ico" onClick={handleReloadClick}>
            <IoReload className={rotate ? "rotate" : ""} />
          </div>
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
        <Link
          to={"/bookmark/allbokmarks/true"}
          // key={}
          className={activeLink === "Favorite" ? "active link" : "link"}
          onClick={() => handleLinkClick("Favorite")}
        >
          {activeLink === "Favorite" ? (
            <div className="icon">
              <MdOutlineFavorite />
            </div>
          ) : (
            <div className="icon">
              <MdOutlineFavoriteBorder />
            </div>
          )}
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Favorites
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
