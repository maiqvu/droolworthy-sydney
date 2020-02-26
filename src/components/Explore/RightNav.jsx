import React from 'react';
import Firebase from '../Firebase/firebase';
import axios from 'axios';

import './Explore.css';
import { Grid, Typography, GridList } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";


class RightNav extends React.Component {
  state = {
    restaurants: []
  };

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = () => {
    axios.get( 'https://droolworthy-sydney.firebaseio.com/restos.json?orderBy=%22$key%22&limitToFirst=2&print=pretty' )
      .then( res => {
        console.log(res.data[1].restaurants);
        this.setState({ restaurants: res.data[1].restaurants });
      })
      .catch( err => console.warn(err) );
  }
  
  render() {
    return (
    <div className="right-nav">
      <GridList spacing={8} className="resto-list">
        {this.state.restaurants.map( r => (
          <Grid item key={r.restaurant.id} className="resto-item">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={r.restaurant.name}
                  width="500"
                  image={r.restaurant.featured_image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {r.restaurant.name}
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

export default RightNav;