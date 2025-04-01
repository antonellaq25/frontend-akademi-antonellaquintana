import React from "react";
import {
  Navbar,
  Button,
  Typography,
  IconButton
} from "@material-tailwind/react";
import NavList from "./NavList";

const Header = () => {
  return (
     <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
     <div className="flex items-center justify-between text-blue-gray-900">
       <Typography
         as="a"
         href="/"
         variant="h6"
         className="mr-6 cursor-pointer py-2"
       >
         Vortex Tech
       </Typography>
       <div className="hidden lg:block">
         <NavList />
       </div>
     </div>
   </Navbar>
  )
};

export default Header;