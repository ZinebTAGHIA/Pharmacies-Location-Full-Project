import React from "react";
import "./footer.css";
import fb from "../assets/fbimg.png";
import twitter from "../assets/twitterimg.png";
import linkedin from "../assets/linkedinimg.png";
import insta from "../assets/instaimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-title">
          <h1>PharmOuvert</h1>
        </div>
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>Liens</h4>
            <a href="/">
              <p>Accueil</p>
            </a>
            <a href="/about">
              <p>A propos</p>
            </a>
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Réseaux sociaux</h4>
            <div className="social-media">
              <p>
                <img src={fb} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={linkedin} alt="" />
              </p>
              <p>
                <img src={insta} alt="" />
              </p>
            </div>
          </div>
          <div className="sb_footer-links_div contact">
            <h4>Contact</h4>
            <p>
              <FontAwesomeIcon icon={faLocationArrow} />
              <span>&nbsp; 123 Rue de la Paix 75008 Paris France</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              <span>&nbsp; +1 (555) 555-5555</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>&nbsp; example@gmail.com</span>
            </p>
          </div>
        </div>

        <hr />

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>&copy;{new Date().getFullYear()} Team 15 All right reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
