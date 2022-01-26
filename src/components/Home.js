import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Home.css";
import Login from "./Login";

const Home = () => {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  const [tokenData, setTokenData] = useState(null);
  const [ifControl, setIfControl] = useState(true);
  const [isUserStudent, setIsUserStudent] = useState(null);
  const [isUserUniversityPerson, setIsUserUniversityPerson] = useState(null);

  var decoded;
  if (!token) {
    history.push("/login");
  }
  if (token && ifControl) {
    decoded = jwt_decode(token);
    setTokenData(decoded);
    setIfControl(false);

    if (isUserStudent === null) {
      if (decoded.role === 1) {
        setIsUserStudent(true);
      } else {
        setIsUserStudent(false);
      }
    }
    if (isUserUniversityPerson === null) {
      if (
        decoded.role === 2 ||
        decoded.role === 3 ||
        decoded.role === 4 ||
        decoded.role === 5
      ) {
        setIsUserUniversityPerson(true);
      } else {
        setIsUserUniversityPerson(false);
      }
    }
  }
  return (
    <div className="home-container">
      {tokenData && (
        <div className="home-container">
          <div className="Navbar-Part">
            <Navbar token={tokenData}></Navbar>
          </div>
          <div className="home-content">
            <h1 className="home-content-header">Home Page</h1>
            <div className="home-description">
              {isUserStudent && (
                <div className="home-student-description">
                  <p>
                    <h4>Staj saşvuru sistemine hoş geldiniz </h4>
                    {"->"} Forms başlığı altında 6 tane belge bulunmaktadır ve
                    staj öncesinde her bir stajınız için , İş Veren Bilgi Formu
                    ve Zorunlu Staj Formunu doldurma zorunluluğunuz
                    bulunmaktadır.<br></br>
                    <br></br>
                    {"->"} Doldurmak istediğiniz forma girdiğinizde choose
                    stakeholder butonunu kullanarak sisteme kayıtlı olan şirket
                    paydaşlarını görüntüleyebilir.ve seçebilirsiniz. Seçiminiz sonucunda şirket paydaşına ait
                    bilgiler formunuza eklenecektir. Şirket paydaşınızın
                    bölümlerine bir ekleme yapmanıza ihtiyaç yoktur.<br></br>
                    <br></br>
                    {"->"} Gerekli eklemeleri formunuzu onaya yolladıktan sonra şirket
                    paydaşına ait boş olan alanları şirket paydaşınız doldurup,
                    onaylayacaktır.<br></br>
                    <br></br>
                    {"->"} Doldurduğunuz belgelerinizin durumlarını profilim
                    sayfasından detaylı bir şekilde görüntüleyebilirsiniz.
                    <br></br>
                    <br></br>
                    {"->"} Gerekli olan 3 staj evrağınızın onaylanması sonucunda
                    stajınız kabul edilmiştir.<br></br>
                    <br></br>
                    {"->"} Red edilen belgeleriniz için tekrardan reddedilen
                    belge için yeni bir belge oluşturup onaya yollayabilirsiniz.
                    <br></br>
                    <br></br>
                    <h4>Staj Bitimi Sonrasında</h4>
                    {"->"} Staj raporunuzu formlar sayfası altından Staj
                    Raporunu seçerek sisteme yükleyebilirsiniz.<br></br>
                    <br></br>
                    {"->"} Staj raporunuzu sisteme yüklerken şirket paydaşınızın
                    onayına gitmesi için şirket paydaşı seçmeniz gerekmektedir.
                    <br></br>
                    <br></br>
                    Staj raporunuzu sisteme yükledikten sonra,<br></br>
                    <br></br>
                    {"->"} Değerlendirme belgesini doldurmanız beklenmektedir.
                    Şirket paydaş seçiminizi yaptıktan sonra sistemde açık
                    alanları doldurup şirket paydaşınızın onayına
                    sunabilirsiniz.<br></br>
                    <br></br>
                  </p>
                </div>
              )}
              {isUserUniversityPerson && (
                <div className="home-university-description">
                  <p>
                    <h4>Staj saşvuru sistemine hoş geldiniz </h4>
                    {"->"} Student forms başlığı altında staj belgelerini
                    doldurmuş ve gerekli onaylardan geçmiş belgelerin listesine
                    ulaşabilirsiniz<br></br>
                    <br></br>
                    {"->"} Student forms sayfası altında incelemek istediğiniz
                    formu listeden seçip show butonuna bastıdığınızda öğrencinin
                    doldurmuş olduğu formu inceleyebilirsiniz<br></br>
                    <br></br>
                    {"->"} Formda yeterli gereksinimler karşılanıyorsa approve
                    butonuna basarak formu onaylayabilirsiniz<br></br>
                    <br></br>
                    {"->"} Formda yeterli gereksinimler karşılanmıyorsa reject
                    butonuna basarak açılan pop-up'tan hangi gereksinimi
                    karşılamadığını seçerek formu reddedebilirsiniz<br></br>
                    <br></br>
                    {"->"} Kişisel bilgilerinizi güncellemek istiyorsanız
                    profile başlığı altından değiştirilebilir alanları
                    değiştirip update butonuna basabilirsiniz.<br></br>
                    <br></br>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!tokenData && <Login></Login>}
    </div>
  );
};

export default Home;
