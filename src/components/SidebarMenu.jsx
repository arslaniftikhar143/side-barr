import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function SidebarMenu({ textAnimate, route, isOpen,SetIsopen }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  function toggleMenu() {
    SetIsopen(true)
    setIsMenuOpen(!isMenuOpen);
  }
  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  const menuAnimate = {
    hidden: {
      opacity: 0,
      height: "0px",
      transition: {
        duration: 0.4,
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        when: "beforeChildren",
      },
    },
  };
  const menuLinkAnimate = {
    hidden: (index) => ({
      padding: "0px",
      x: "-100%",
      transition: {
        duration: (index + 1) * 0.1,
      },
    }),
    visible: (index) => ({
      padding: "0px",
      x: "0%",
      transition: {
        duration: (index + 1) * 0.1,
      },
    }),
  };

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu__item">
          <div className="route__icon">{route.icon}</div>
          <AnimatePresence>
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
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div animate={isMenuOpen?{rotate:-90}:{rotate:0}}>
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimate}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="menu__container">
            {route.subRoutes.map((subRoute, index) => {
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={menuLinkAnimate}
                  initial="hidden"
                  animate="visible"
                  exit="hidden">
                  <NavLink
                    activeClassName="active"
                    className="route"
                    to={subRoute.path}>
                    <div className="route__icon">{subRoute.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={textAnimate}
                          className="route__text">
                          {subRoute.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SidebarMenu;
