import React from 'react';
import './../CSS/About.css'; // Assuming you have a separate CSS file for styles

function About() {
  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="assets/css/styles.css" />
  {/* =====BOX ICONS===== */}
  <link
    href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
    rel="stylesheet"
  />

  <main className="l-main">
    {/*===== HOME =====*/}
  
    {/*===== ABOUT =====*/}
    <section className="about section " id="about">
      <h2 className="section-title">About Us</h2>
      <div className="about__container bd-grid">
        <div className="about__img">
          <img src="assets/img/Profile.jpg" alt="" />
        </div>
        <div>
          <h2 className="about__subtitle">It's Kaustubh Enterprize  </h2>
          <p className="about__text">
            As a passionate coding enthusiast, I immerse myself in the dynamic
            worlds of Java, React.js, Spring Boot, and MySQL, crafting seamless
            web solutions that captivate users. Beyond coding, I find solace in
            the art of photography, where every frame tells a unique story,
            echoing the creativity and precision I bring to web development.
          </p>
          <br />
          <a
            href="https://drive.google.com/drive/folders/1RTY-GgOcoqLQHvfLSIb1qnuPdHsF1B8z?usp=sharing"
            className="button"
          >
            My Achivements
          </a>
        </div>
      </div>
    </section>
    {/*===== SKILLS =====*/}
    <section className="skills section" id="skills">
      <h2 className="section-title">Services</h2>
      <div className="skills__container bd-grid">
        <div>
          <h2 className="skills__subtitle">Profesional Skills</h2>
          <p className="skills__text">
            "Experienced web developer proficient in HTML, CSS, JavaScript,
            React.js, Java, and MySQL." "Skilled in crafting dynamic and
            responsive web solutions, with a strong foundation in front-end and
            back-end technologies."
          </p>
        
        
        </div>
        <div>
          <img src="assets/img/work3.jpg" alt="" className="skills__img" />
        </div>
      </div>
    </section>
    <section className="product section" id="products">
  <h2 className="section-title">Steel Sheets</h2>
  <div className="product__container bd-grid">
    <div className="product__item">
      <img src="assets/img/steel_sheet1.jpg" alt="Galvanized Steel Sheet" className="product__img" />
      <div className="product__info">
        <h3 className="product__title">Galvanized Steel Sheet</h3>
        <p className="product__description">
          Galvanized steel sheets are steel sheets coated with a protective layer of zinc through a process called galvanization. They are highly resistant to corrosion and widely used in construction, automotive, and manufacturing industries.
        </p>
      </div>
    </div>
    <div className="product__item">
      <img src="assets/img/steel_sheet2.jpg" alt="Cold Rolled Steel Sheet" className="product__img" />
      <div className="product__info">
        <h3 className="product__title">Cold Rolled Steel Sheet</h3>
        <p className="product__description">
          Cold rolled steel sheets are produced by rolling hot rolled coils at room temperature, resulting in a smoother surface finish and tighter dimensional tolerances. They are commonly used in appliances, automotive panels, and furniture manufacturing.
        </p>
      </div>
    </div>
    <div className="product__item">
      <img src="assets/img/steel_sheet3.jpg" alt="Hot Rolled Steel Sheet" className="product__img" />
      <div className="product__info">
        <h3 className="product__title">Hot Rolled Steel Sheet</h3>
        <p className="product__description">
          Hot rolled steel sheets are produced at high temperatures and are less precise in dimension and surface finish compared to cold rolled sheets. They are used in applications such as structural components, pipelines, and railway tracks.
        </p>
      </div>
    </div>
  </div>
</section>

  
    {/*===== CONTACT =====*/}
    <section className="contact section" id="contact">
      <h2 className="section-title">Contact</h2>
      <div className="contact__container bd-grid">
      <div className="contact__info">
  <i className="bx bx-map contact__icon" />
  <h3 className="contact__subtitle">Location</h3>
  <p className="contact__text">
  
    <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15122.501320846526!2d73.82877051738281!3d18.635914500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8718f966ba1%3A0xd59bcd99f4e4c98!2sKaustubh%20Enterprises!5e0!3m2!1sen!2sin!4v1711392279842!5m2!1sen!2sin" target="_blank" rel="noopener noreferrer">
      Pune, India
    </a>
  </p>
</div>

        <div className="contact__info">
          <i className="bx bx-phone contact__icon" />
          <h3 className="contact__subtitle">Phone</h3>
          <p className="contact__text">
            <a href="tel://0101010101">+91 9970745450</a>
          </p>
        </div>
        <div className="contact__info">
  <i className="bx bx-download contact__icon" />
  <h3 className="contact__subtitle">Email</h3>
  <p className="contact__text">
    <a href="mailto:kaustubh.km@gmail.com">
      kaustubh.km@gmail.com
    </a>
  </p>
</div>
        <div className="contact__info">
          <i className="bx bxl-linkedin-square contact__icon" />
          <h3 className="contact__subtitle">Instagram</h3>
          <p className="contact__text">
            <a href="https://in.linkedin.com/company/kaustubh-enterprises">
              Our linkedin Profile
            </a>
          </p>
        </div>
      </div>
    </section>
  </main>
  {/*===== FOOTER =====*/}
 
  {/*===== SCROLL REVEAL =====*/}
  {/*===== MAIN JS =====*/}
</>

   
  );
}

export default About;
