import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Our App</h1>
        <div style={styles.buttonsContainer}>
          <button 
            onClick={() => (window.location.href = '/register')} 
            style={{ ...styles.button, backgroundColor: '#FF7043' }} // Same color for Register and Login buttons
          >
            <FaUserPlus style={styles.icon} /> Register
          </button>
          <button 
            onClick={() => (window.location.href = '/login')} 
            style={{ ...styles.button, backgroundColor: '#FF7043' }} // Warm orange for Login button
          >
            <FaSignInAlt style={styles.icon} /> Login
          </button>
        </div>
        <p style={styles.footerText}>
          Already have an account? <a href="/login" style={styles.link}>Login here</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Ensures content is vertically centered
    alignItems: 'center',     // Centers items horizontally
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',   // Stack the buttons vertically
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',             // Ensure buttons are centered properly
  },
  button: {
    padding: '12px 25px',  // Reduced padding to decrease button length
    margin: '10px 0',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    width: '200px', // Set width to 200px for a shorter button
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
    fontSize: '18px',
  },
  footerText: {
    fontSize: '14px',
    marginTop: '20px',
    color: '#333',
  },
  link: {
    color: '#FF6347', // Tomato red for the "Login here" link
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default Home;
