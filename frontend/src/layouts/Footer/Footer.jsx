import React from "react";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__col footer__logo">
          <div className="footer__img">
            <Link to="/" className="link">
              <img src="/uploads/images/logo.png" alt="" />
            </Link>
          </div>
          <div className="footer__applis">
            <Link
              to="https://apps.apple.com/app/netflix/id363590051"
              target="_blank"
              className="link"
            >
              <img src="/uploads/images/app-store.png" alt="" />
            </Link>
            <Link
              to="https://play.google.com/store/apps/details?id=com.netflix.mediaclient"
              target="_blank"
              className="link"
            >
              <img src="/uploads/images/google-play.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="footer__col footer__nav">
          <div className="footer__element">
            <p className="footer__element__title">Service</p>
            <ul className="links">
              <li>
                <Link to="/" className="link">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Tv Streaming
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Cinema Ticket
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__element">
            <p className="footer__element__title">Company</p>
            <ul className="links">
              <li>
                <Link to="/" className="link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Carers
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__element">
            <p className="footer__element__title">Information</p>
            <ul className="links">
              <li>
                <Link to="/" className="link">
                  Faq
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Contact Help
                </Link>
              </li>
              <li>
                <Link to="" className="link">
                  Custom Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__col footer__medias">
          <Link to="">
            <Button
              type="icon"
              backgroundColor="#fff"
              color="hsl(0, 93%, 42%)"
              border="1px solid #fff"
              icon={FaInstagram}
            />
          </Link>
          <Link to="">
            <Button
              type="icon"
              backgroundColor="#fff"
              color="hsl(0, 93%, 42%)"
              border="1px solid #fff"
              icon={FaYoutube}
            />
          </Link>
          <Link to="">
            <Button
              type="icon"
              backgroundColor="#fff"
              color="hsl(0, 93%, 42%)"
              border="1px solid #fff"
              icon={FaGithub}
            />
          </Link>
        </div>
      </div>
      <div className="footer__conditions">
        <div>
          <Link to="" className="link">
            Terms and Conditions
          </Link>
        </div>
        <div>&copy; Copyright 2025</div>
        <div>
          <Link to="" className="link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
