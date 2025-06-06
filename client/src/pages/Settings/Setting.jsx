import React from "react";
import Header from "../../components/Header/Header";
import SettingCard from "./components/SettingCard/SettingCard";
import "./Setting.css";
import {
  FolderOpenOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function Setting() {
  return (
    <>
      <Header />
      <div className="settings__container">
        <h2 className="settings__title">Ayarlar</h2>

        <div className="settings__cards">
          <SettingCard
            icon={FolderOpenOutlined}
            title="Projelerim"
            description="Tüm projelerinizi görüntüleyin ve yönetin."
          />
          <SettingCard
            icon={SettingOutlined}
            title="Genel Ayarlar"
            description="Hesap, sistem ve bildirim ayarlarını kontrol edin."
          />
            <SettingCard
            icon={SettingOutlined}
            title="Profilim"
            description="Kişisel bilgilerinizi ve tercihlerinizi yönetin."
          />
        </div>
      </div>
    </>
  );
}

export default Setting;
