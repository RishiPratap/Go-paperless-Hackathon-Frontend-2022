import 'bootstrap/dist/css/bootstrap.min.css';
import World from '../../assets/world.mp4';
import './home.css';

const Home = () => {
    return (
        <div className='Home'>
        <video height="100%" width="100%" controls={false} loop={true} autoPlay={true}>
        <source src={World} type="video/mp4"/>
        </video>
        <div className='Home__content'>
        <p>Welcome to your very own personal form status checker</p>
        </div>
        </div>
    );
}

export default Home