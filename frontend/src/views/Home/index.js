import React from 'react';
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import BannerImage from '../../assets/images/main.jpeg';
import LogoImg from '../../assets/images/logo_white.png';
import BusImg from '../../assets/images/bellasbus.png';
import theme from "../../utils/theme";

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      backgroundImage: `url(${BannerImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      position: 'relative',
    },
    logo: {
      width: '100%',
      maxWidth: 120,
      margin: theme.spacing(2, 0)
    },
    busLogo: {
      width: '100%',
      maxWidth: 500,
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 1,
    },
    bannerSection: {
      position:'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: '10%',
      color: 'white',
      textAlign: 'center',
      padding: theme.spacing(8, 4),

      [theme.breakpoints.down('md')]: {
        width: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: theme.spacing(8, 1),
      },

      '&::before': {
        content: '""',
        position:'absolute',
        background: 'black',
        opacity: 0.3,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }
    },
    bannerHeader: {
      marginBottom: theme.spacing(2)
    },
    bannerHeaderTitle: {
      fontFamily: '"Playfair Display"',
      fontWeight: 700,
      fontSize: 60,
    },
    bannerHeaderSubtitle: {
      margin: 0,
      fontSize: 48,
    },
    bannerCTA: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerCTANumber: {
      fontSize: 20,
      marginLeft: theme.spacing(1)
    }
  }),
);

function Home() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.banner}>
        <img src={BusImg} className={classes.busLogo} alt="Bella Party Bus" />
        <div className={classes.bannerSection}>
          <div className={classes.bannerHeader}>
            <em className={classes.bannerHeaderTitle}>The perfect event</em>
            <p className={classes.bannerHeaderSubtitle}>for bus rental</p>
          </div>
          <div className="banner-logo">
            <img src={LogoImg} className={classes.logo} alt="Logo" />
          </div>
          <div className={classes.bannerCTA}>
            <PhoneIcon sx={{ fontSize: 40 }} />
            <a href="tel:9739790159"><p className={classes.bannerCTANumber}>973-979-0159</p></a>
          </div>
          <Link to="/booking"><Button variant="contained">Book now</Button></Link>
        </div>
      </div>
      <Container maxWidth="xl">
        <p>
          There are many reasons for which a person would rent a party bus.
          Some people celebrate festive occasions in a party bus, as they make for an excellent choice for their party conveyance.
          Most people tend to rent a limousine, although limousines are good for throwing a party,
          you can be more comfortable and would have more room in a full-sized party bus.
          There are lots of accessories that come with a party bus. A party bus can include plasma televisions, good sound systems,
          and luxury seating accommodations. Hence, one should consider party buses superior in terms of entertainment and overall comfort.
          Let’s discuss some activities that can be enhanced by a party bus:
        </p>
        <h3>Club Hopping</h3>
        <p>
          The drivers of our party buses know the hottest night-life of the city and can take you on complete tours if you are up for the adventure.
          You can also find some party bus rental companies that have specially designed club hopping packages that include plenty of entertainment
          that can lighten up the onboard experience. 
        </p>
        <h3>Bachelor and Bachelorette parties</h3>
        <p>
          Bachelor and Bachelorette parties can be made even better when you use a party bus to add to the experience when traveling to a specific location.
          And the party would not have to stop just because you are traveling.
          You can use party buses to send your close friend or relative out to the married life with an exceptional surprise.
          You can also add different types of gimmicks, libations, or entertainment that would make this a memorable occasion. 
        </p>
        <h3>Weddings</h3>
        <p>
          Weddings are very chaotic to manage, and they become a logistical nightmare when you add the crowd that is coming to the wedding.
          A common problem that everyone at the wedding may face is parking their cars. But, with a party bus,
          you can take everyone from the spot of the wedding to the reception in time and in a classy fashion.
          It would keep the special feel of the wedding intact. And it would make for a much more memorable experience for everyone.
        </p>
        <h3>Concerts</h3>
        <p>
          It is an exceptionally great choice to rent a party bus for a concert.
          If you are going to be spending the night out, you can have great entertainment on the bus,
          and you could move around from one place to another with class and comfort.
          The party bus will pick you up from your front door and drop you right at the concert location.
          After the concert is over, you could get back on the bus to go to the next location of your choice.
        </p>
        <h3>Sporting Events</h3>
        <p>
          When you are off to go for a great party with your team, there is nothing better than getting into a party bus and going to the location of your choice.
          Tailgating becomes more fun when you are sitting comfortably on a party bus and traveling in class.
          Your team would not have to face any problems with parking their vehicles.
          And a party bus would have all the sound systems, screens, eats, and drinks to party off in style.
        </p>
        <h3>Birthdays</h3>
        <p>
          If you are planning to surprise someone for their birthday, then you could not go wrong by renting a party bus.
          You could use the party bus to travel around to places that you have in your mind.
          There is no need for the party to stop, as you can keep the party rolling in the bus too.
          You can also ask the bus driver to take you on a unique tour of the beautiful city.
        </p>
        <h3>Proms</h3>
        <p>
          Arriving at a prom in a party bus can leave a great impression on the minds of your peers.
          And you could take the party out on the wheels and ensure great fun for all of your friends.
          The parents of the students can be assured that their kids are alright and safe.
        </p>
        <h3>Graduation</h3>
        <p>
          Graduation is one of the happiest moments that one can celebrate. It is the result of constant hard work and dedication.
          After the ceremony is over, you can take a party bus and go off to a party as a reward.
        </p>
        <h3>Family reunions</h3>
        <p>
          You can take your complete family out on a trip of their lifetime in a party bus.
          A party bus can hold a large crowd in it, and it is much more comfortable.
        </p>
        <h3>
          Corporate events
        </h3>
        <p>
          Corporate events are one of the most important events a manager could hold,
          and you can improve your employee’s morale by giving them a lift in a royal party bus.
          This is an excellent way to add some class to an already classy event.
        </p>
        <h4>Conclusion</h4>
        <p>
          No matter what the occasion may be, a party bus will always add to the experience positively.
          We at ULC limos can assure you an experience of a lifetime.
          You can sit calmly and relax, and be assured that your friends, colleagues, and family will enjoy every moment of the ride.
        </p>
      </Container>
    </>
  );
}

export default Home;