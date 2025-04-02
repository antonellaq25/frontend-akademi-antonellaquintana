import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../store/actions/authActions";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Button, Typography, Input } from "@material-tailwind/react";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const NavList = () => {
 
  console.log(GOOGLE_CLIENT_ID);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    //google response
    console.log(credentialResponse.credential)
    //user data decoded
    console.log("decode", decoded)
    dispatch(loginAction({ uid: decoded.sub, name: decoded.name, email: decoded.email, photo: decoded.picture }));
  };

  const handleLogout = () => {
    googleLogout();
    dispatch(logoutAction());
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/laptops" className="flex items-center hover:text-blue-500 transition-colors">
            Laptops
          </Link>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/smartphones" className="flex items-center hover:text-blue-500 transition-colors">
            Smartphones
          </Link>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/tables" className="flex items-center hover:text-blue-500 transition-colors">
            Tablets
          </Link>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/tvs" className="flex items-center hover:text-blue-500 transition-colors">
            TV's
          </Link>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/headphones" className="flex items-center hover:text-blue-500 transition-colors">
            Headphones
          </Link>
        </Typography>
        <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
          <Link to="/accessories" className="flex items-center hover:text-blue-500 transition-colors">
            Accessories
          </Link>
        </Typography>

        {user ? (
          <div className="flex items-center gap-4">
            <img src={user.photo} alt="Avatar" className="w-8 h-8 rounded-full" />
            <Button onClick={handleLogout} variant="small" color="red" className="p-2 font-medium">
              Logout
            </Button>
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Error en login")} />
        )}
      </ul>
    </GoogleOAuthProvider>
  );
};

export default NavList;
