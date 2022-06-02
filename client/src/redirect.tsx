import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

/**
 * Will be handling redirects. For now just redirects to registration.
 */
export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => navigate('/register'));
  return (<></>);
}