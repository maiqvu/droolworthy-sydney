import React from 'react';
import axios from 'axios';

import './Explore.css';
import { Grid, Typography, GridList } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";


class RightNav1 extends React.Component {
  state = {
    restaurants: []
  };

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = () => {
    const baseURL = 'https://api.foursquare.com/v2/venues';

    const params = {
      client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
      client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
      section: 'food',
      near: 'Sydney',
      v: '20200226'   // version (today's date)
    };

    axios.get( `${baseURL}/explore?near=${params.near}&client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}&section=${params.section}&limit=5` )
      .then( res => {
        console.log(res.data.response.groups[0].items);
        
        // let restos = [];
        // for (let i = 0; i < res.data.response.groups[0].items.length; i++) {
        //   let resto = {};
        //   const currentRestoObject = res.data.response.groups[0].items[i];
        //   resto.id = currentRestoObject.venue.id;
        //   resto.name = currentRestoObject.venue.name;
        //   // console.log(resto);
        //   axios.get( `${baseURL}/${resto.id}/photos?client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}&limit=1` )
        //     .then( res => {
        //       // console.log(res.data.response.photos.items[0]);
        //       console.log(res);
        //       resto.photoURL = ...
        //     })
        //     .catch( err => console.warn('Error fetching photo: ', err) );
        //   restos.push( resto );
        // }   // end of for loop
        // this.setState({
        //   restaurants: restos
        // });

        this.setState({
          restaurants: res.data.response.groups[0].items
        });
      })
      .catch( error => console.warn('Error fetching foursquare data: ', error) );
  };   // end of getRestaurants()

  render() {
    return (
    <div className="right-nav">
      <GridList spacing={8} className="resto-list">
        {this.state.restaurants.map( r => (
          <Grid item key={r.venue.id} className="resto-item">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={r.venue.name}
                  width="600"
                  image={`https://loremflickr.com/320/240/restaurant?random=${r.venue.id}`} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {r.venue.name}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" color="primary">Share</Button>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </GridList>
    </div>
    );
  }   // end of render()
}

export default RightNav1;