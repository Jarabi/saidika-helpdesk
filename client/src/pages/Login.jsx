import { useNavigate } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData(e.target);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email address
        </label>
        <input type='email' className='form-control' id='email' />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input type='password' className='form-control' id='password' />
      </div>
      <div className='mb-3 form-check'>
        <input type='checkbox' className='form-check-input' id='chek-me-out' />
        <label className='form-check-label' htmlFor='chek-me-out'>
          Check me out
        </label>
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default Login;
