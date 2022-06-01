import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaHome, FaUserAlt, FaLock } from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { ImExit } from "react-icons/im";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/anlytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <FiSettings />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile",
        icon: <FaUserAlt />,
      },
      { path: "/settings/security", name: "Security", icon: <FaLock /> },
      { path: "/settings/logout", name: "LogOut", icon: <ImExit /> },
    ],
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />,
  },
];
function Sidebar({ children }) {
  const [isOpen, SetIsopen] = useState(true);
  function toggle() {
    SetIsopen(!isOpen);
  }
  const inputAnimate = {
    hidden: {
      opacity: 0,
      width: "0px",
      padding: "0px",
      margin: "0px",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      width: "140px",
      padding: "0.5rem",
      margin: "0px 10px 0px 0px",
      transition: {
        duration: 0.3,
      },
    },
  };
  const textAnimate = {
    hidden: {
      opacity: 0,
      with: "0px",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div className="sidebar__container">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: {
            duration: 0.4,
            type: "spring",
            damping: 10,
          },
        }}
        className="sidebar">
        <div className="logo__container">
          <AnimatePresence>
            {isOpen && <h1 className="logo">SideBarr</h1>}
          </AnimatePresence>
          <motion.div onClick={toggle} className="top__icon">
            <FaBars />
          </motion.div>
        </div>
        <div className="search__container">
          <div className="search__icon">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div className="search__box">
                <motion.input
                  variants={inputAnimate}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  placeholder="Search"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  textAnimate={textAnimate}
                  key={route.name}
                  route={route}
                  isOpen={isOpen}
                  SetIsopen={SetIsopen}
                />
              );
            }

            return (
              <NavLink
                activeClassName="active"
                to={route.path}
                className="route"
                key={index}>
                <div className="route__icon">{route.icon}</div>
                {isOpen && (
                  <motion.div
                    variants={textAnimate}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="route__text">
                    {route.name}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </motion.div>

      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
