import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

// import { useNavigate } from 'react-router-dom';

function Home() {
  
  // const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Testagram!</h1>
        <p style={styles.subtitle}>
          Plan your meals, eat healthy, and track your nutrition effortlessly.
        </p>
        <div style={styles.buttonsContainer}>
          <button
            // onClick={() => navigate('/register')}
            onClick={() => (window.location.href = '/register')}
            style={{ ...styles.button, ...styles.registerButton }}
            aria-label="Register"
          >
            <FaUserPlus style={styles.icon} /> Register
          </button>
          <button
            // onClick={() => navigate('/login')}
            onClick={() => (window.location.href = '/login')}
            style={{ ...styles.button, ...styles.loginButton }}
            aria-label="Login"
          >
            <FaSignInAlt style={styles.icon} /> Login
          </button>
        </div>
        <p style={styles.footerText}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Login here</a>
        </p>
      </div>
      {/* Inline CSS for hover/active effects */}
      <style>{`
        .home-btn:hover {
          background-color: #ff5722 !important;
          transform: translateY(-2px) scale(1.03);
        }
        .home-btn:active {
          background-color: #e64a19 !important;
        }
        .home-link:hover {
          color: #ff5722 !important;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    padding: '40px 30px',
    borderRadius: '18px',
    boxShadow: '0 10px 32px rgba(0, 0, 0, 0.18)',
    textAlign: 'center',
    minWidth: '320px',
    maxWidth: '95vw',
    width: '370px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.3rem',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: '1.08rem',
    color: '#444',
    marginBottom: '28px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '12px',
    marginBottom: '12px',
  },
  button: {
    padding: '13px 0',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    transition: 'background-color 0.2s, transform 0.2s',
    outline: 'none',
    marginBottom: '0',
    marginTop: '0',
  },
  registerButton: {
    backgroundColor: '#FF7043',
    marginBottom: '5px',
  },
  loginButton: {
    backgroundColor: '#FF7043',
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  footerText: {
    fontSize: '15px',
    marginTop: '18px',
    color: '#333',
  },
  link: {
    color: '#FF6347',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.2s',
    cursor: 'pointer',
  }
};

export default Home;
