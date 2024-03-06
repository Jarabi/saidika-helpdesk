const Services = () => {
  return (
    <section className='services' id='services'>
      <div className='container'>
        <div className='section-title'>
          <h2>Our Services</h2>
          <p className='col-md-8 offset-md-2'>
            We provide quick and reliable solutions for all your IT needs. Below
            are some of the services you are guaranteed to get from us. Our team
            of experts is always ready to help you with any IT issues you may
            have.
          </p>
        </div>
        <div className='row'>
          <div className='col-lg-4 col-md-12' data-aos='fade-up'>
            <div className='service-box'>
              <i className='bi bi-clock'></i>
              <h4>
                <a href=''>24/7 Support</a>
              </h4>
              <p>
                We are here whenever you need us. Our team of experts is always
                ready to help you with any IT issues you may have.
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-md-6' data-aos='fade-up'>
            <div className='service-box'>
              <i className='bi bi-globe'></i>
              <h4>
                <a href=''>Remote Assistance</a>
              </h4>
              <p>
                Get quick fixes without having to leave your home. We have
                specialized tools to help you remotely.
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-md-6' data-aos='fade-up'>
            <div className='service-box'>
              <i className='bi bi-tools'></i>
              <h4>
                <a href=''>Hardware and Software Troubleshooting</a>
              </h4>
              <p>
                From desktops to servers, we have the expertise to troubleshoot
                a wide range of hardware and software issues.
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-md-6' data-aos='fade-up'>
            <div className='service-box'>
              <i className='bi bi-wifi'></i>
              <h4>
                <a href=''>Network Setup and Maintenance</a>
              </h4>
              <p>
                Keep your business running smoothly with our expert network
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
