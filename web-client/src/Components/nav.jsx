import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaBitcoin,
} from "react-icons/fa";

import { FaRegUserCircle } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { GrLink } from "react-icons/gr";
import { FaChartSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoBookmarksOutline, IoBookmarksSharp } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import { IoIosFolder } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(isOpen);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const menuItem = [
    {
      // bookmark/:origin/:id
      path: "/bookmark/collection/chart",
      name: "collection1",
    },
    {
      path: "bookmark/collection/crypto",
      name: "collection2",
    },
    {
      path: "bookmark/collection/hello",
      name: "collection3",
    },
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
        {menuItem && menuItem.length > 0 ? (
          <>
            <div className="collections">Collections</div>
            {menuItem.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={activeLink === item.path ? "active link" : "link"}
                onClick={() => handleLinkClick(item.path)}
              >
                <div className="icon">
                  {activeLink === item.path ? (
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
                  {item.name}
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
