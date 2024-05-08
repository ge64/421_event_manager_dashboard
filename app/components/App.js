import '../css/App.css';
import Navbar from './Navbar';
import HeroSection from './Hero';
import EventGrid from './EventGrid.jsx';
import eventData from '../data/events.json';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <EventGrid events={eventData} />
      <Footer />
    </div>
  );
}

export default App;
