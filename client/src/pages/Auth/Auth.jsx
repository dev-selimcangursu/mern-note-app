import React, { useState } from "react";
import "./Auth.css";
import AuthLogo from "../../assets/auth-logo.png";
import PrimaryButton from "../../components/UI/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/UI/Button/SecondaryButton/SecondaryButton";
import LoginModal from "./components/Login/Login";
import RegisterModal from "./components/Register/Register";
function Auth() {
  // Giriş Modali State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // Giriş Yap Modaline Basılırsa Çalışacak Fonksiyon
  function openLoginModal() {
    setIsLoginModalOpen(true);
  }
  // Giriş Yap Modeli İçerisinde Kapat İkonuna Basılırsa Çalışacak Fonksiyon
  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }
  // Demo Talebinde Bulun State
  const [isRegisterModalOpen, setisRegisterModalOpen] = useState(false);
  // Register Modaline Basılırsa Çalışacak Fonksyion
  function openRegisterModal() {
    setisRegisterModalOpen(true);
  }
  // Register Modalindeki Close İkonuna Basarsa Çalışacak Fonksiyon
  function closeRegisterModal() {
    setisRegisterModalOpen(false);
  }

  return (
    <div className="auth__screen__wrapper">
      <div className="auth__screen__image__area">
        <img className="auth__image" src={AuthLogo} alt="" />
      </div>
      <div className="auth__screen__content__area">
        <h3 className="auth__screen_content_area__title">
          NoteeBear | Notlarını Kolayca Tut, Düzenle ve Paylaş
        </h3>
        <div className="auth__screen__content__login__area">
          <small className="auth__screen__content__login__area__title">
            Verimlilik Bir Giriş Uzağında.
          </small>
          <SecondaryButton onClick={openRegisterModal}>
            Demo Hesap Talebinde Bulun!
          </SecondaryButton>
          <RegisterModal
            onRegisterModel={isRegisterModalOpen}
            onRegisterClose={closeRegisterModal}
          />
        </div>
        <div className="auth__screen__content__register__area">
          <h3 className="auth__screen__content__register__area__title">
            Zaten bir hesabın var mı?
          </h3>
          <PrimaryButton onClick={openLoginModal}>Giriş Yap</PrimaryButton>
          <LoginModal
            modalStatus={isLoginModalOpen}
            onClose={closeLoginModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
