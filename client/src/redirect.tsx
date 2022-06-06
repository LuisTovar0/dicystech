import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import js_cookie from 'js-cookie';
import uni_cookie from 'universal-cookie';

/**
 * Handles redirections according to the app state.
 */
export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('universal-cookie', new uni_cookie().getAll());
    if (js_cookie.get('refreshJwt')) {
      console.log('habemus 🍪');
      navigate('/home');
    } else {
      console.log('no 🍪');
      console.log('js-cookie', js_cookie.get());
      console.log('decoded document.cookie', decodeURIComponent(document.cookie));
      navigate('/register');
      console.log('gonna register');
    }
  });
  return <p>Redirecting...</p>;
}