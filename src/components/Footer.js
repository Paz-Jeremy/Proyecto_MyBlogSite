import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { MdOutgoingMail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    return (
        <StyledFooter style={{ backgroundColor: '#031926' }}>
        <div className="container mb-4">
            <h5 className="mb-1">MyBlogSite</h5>
            <small>Compartiendo historias inspiradoras cada día</small>
            <ul className="nav justify-content-center flex-wrap mt-3">
                <li className="nav-item mx-3">
                    <button onClick={() => navigate('/')} className="nav-link text-light px-3">Blogs</button>
                </li>
                <li className="nav-item mx-3">
                    <button onClick={() => navigate('/about')} className="nav-link text-light px-3">Acerca de</button>
                </li>
                <li className="nav-item mx-3">
                    <button onClick={() => navigate('/contacts')} className="nav-link text-light px-3">Contactos</button>
                </li>
                <li className="nav-item mx-3">
                    <button onClick={() => navigate('/privacy')} className="nav-link text-light px-3">Política de privacidad</button>
                </li>
            </ul>
        </div>
        <hr className="border-light" />
        <div className="container d-flex justify-content-between align-items-center py-3">
            <div>
                <small>© {currentYear} MyBlogSite. Todos los derechos reservados.</small>
            </div>
            <SocialCard />
        </div>
        </StyledFooter>
    );
}

const SocialCard = () => (
  <StyledWrapper>
    <div className="card">
      {/* Telefono */}
      <a
        href="tel:+50497284833"
        className="socialContainer containerOne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsFillTelephoneFill />
      </a>
      {/* Facebook */}
      {/* <a
        href="https://facebook.com"
        className="socialContainer containerTwo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a> */}
      {/* Gmail  */}
      <a
        href="mailto:jeremyjosecastellanos@gmail.com"
        className="socialContainer containerThree"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MdOutgoingMail  />
      </a>
      {/* GitHub */}
      <a
        href="https://github.com/Paz-Jeremy"
        className="socialContainer containerFour"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #031926;
    border: none;
  }

  .socialContainer {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #031926;
    overflow: hidden;
    transition: background-color 0.3s, transform 0.3s;
  }

  .containerOne:hover { background-color: #008000; }
  .containerTwo:hover { background-color: #00acee; }
  .containerThree:hover { background-color: #0278d4; }
  .containerFour:hover { background-color: #333; }

  .socialContainer:active { transform: scale(0.9); }
  .socialContainer svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }

  .socialContainer:hover svg {
    animation: slide-in-top 0.3s both;
  }

  @keyframes slide-in-top {
    0% { transform: translateY(-50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

const StyledFooter = styled.footer`
  background-color: #031926;
  color: #fff;
  padding-top: 1rem;

  ul.nav {
    padding-left: 0;
    margin-bottom: 0;
  }

  .nav-link {
    position: relative;
    padding-bottom: 4px;
    transition: color 0.25s;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export default Footer;
