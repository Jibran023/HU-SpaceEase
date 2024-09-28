import './Login.css'

function Login() {

    return (
      <>
        <div className='app-container'>
          <div className='image-container'>
            <h1 className='image-heading'>HU-SpaceEase</h1>
            <img src="images/audi.jpg" alt="Login Image" className="login-image" />
          </div>

          <div className='login-container'>
            <div className='form-background'>
              <h2 className='login-heading'>Login</h2>
              <form>
                <div className='input-group'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' id='email' placeholder='Enter your HU email' />
                </div>
                <div className='input-group'>
                  <label htmlFor='password'>Password</label>
                  <input type='password' id='password' placeholder='Enter your password' />
                </div>
                <button type='submit'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Login