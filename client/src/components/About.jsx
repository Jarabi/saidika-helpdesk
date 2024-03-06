import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className='about' id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='author-img'></div>
          </div>
          <div className='col-lg-7 d-flex flex-column justify-content-start'>
            <div className='section-title'>
              <h2>About Developer</h2>
              <p>
                My name is Alex Jarabi. I am a full-stack web developer with a
                passion for creating beautiful and functional web applications.
                I am proficient in HTML, CSS, JavaScript, React, Node.js,
                Express, and MongoDB. I am also familiar with Python, Django,
                and PostgreSQL.
              </p>
            </div>
            <section className='socials'>
              <div className='row'>
                <div className='col-md-12 col-md-4 mb-3'>
                  <h4>Let&apos;s connect</h4>
                  <p>These are my links. We can connect and share ideas.</p>
                  <hr />
                </div>
                <div className='col-sm-6 col-md-4'>
                  <div className='box-shadow'>
                    <div className='icon'>
                      <i className='bi bi-github'></i>
                    </div>
                    <Link
                      className='socials-connect'
                      to='https://github.com/Jarabi'
                    >
                      <h4>Github</h4>
                    </Link>
                  </div>
                </div>
                <div className='col-sm-6 col-md-4'>
                  <div className='box-shadow'>
                    <div className='icon'>
                      <i className='bi bi-linkedin'></i>
                    </div>
                    <Link
                      className='socials-connect'
                      to='https://www.linkedin.com/in/jarabialex'
                    >
                      <h4>LinkedIn</h4>
                    </Link>
                  </div>
                </div>
                <div className='col-sm-6 col-md-4'>
                  <div className='box-shadow'>
                    <div className='icon'>
                      <i className='bi bi-twitter-x'></i>
                    </div>

                    <Link
                      className='socials-connect'
                      to='https://twitter.com/jarabialex'
                    >
                      <h4>X</h4>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
