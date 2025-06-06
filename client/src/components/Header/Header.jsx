import React from "react";
import "./Header.css";
import ImageLogo from "../../assets/notebear-logo.png";
import { NotificationOutlined } from "@ant-design/icons";
function Header() {
  return (
    <header id="header" className="header">
      <div className="header__logo__wrapper">
        <img src={ImageLogo} alt="Logo" className="header__logo" />
        <span className="header__brand-name">
          Notee<span className="highlight">Bear</span>
        </span>
      </div>

      <div className="header__navlinks__wrapper">
        <nav className="header__navlinks">
          <ul>
            <li>
              <a href="/dashboard">Projeler</a>
            </li>
            <li>
              <a href="/contact">Görevlendirme</a>
            </li>
            <li>
              <a href="/contact">Hatırlatma</a>
            </li>
            <li>
              <a href="/settings">Ayarlar</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__action__wrapper">
        <NotificationOutlined />
        <div className="header__action__wrapper__user">
          <img
            src="/user.png"
            alt="User"
            className="header__action__wrapper__user__image"
          />
          <span className="header__action__wrapper__user__name">
            Kullanıcı Adı
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
