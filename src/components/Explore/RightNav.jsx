import React from 'react';

import './Explore.css';
import { Grid, Typography, GridList } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';


class RightNav extends React.Component {

  componentDidUpdate( prevProps ) {
    if (prevProps.currentNeighborhood !== this.props.currentNeighborhood) {
      return this.props.restosList.filter(r => {
        return r.restaurant.location.locality === this.props.currentNeighborhood;
      });
    }
  };   // end of componentDidUpdate()

  render() {
    return (
    <div className="right-nav">
    <GridList spacing={8} className="resto-list">
    {
      this.props.restosList.filter(r => r.restaurant.location.locality === this.props.currentNeighborhood)
      .map(r => (
        <Grid item key={r.restaurant.id} className="resto-item">
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={r.restaurant.name}
                width="320" height="240"
                image={r.restaurant.featured_image} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  {r.restaurant.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="body2">
                  {r.restaurant.location.address}
                </Typography>
                <br/><br/>
                <Typography gutterBottom variant="body2" component="body2">
                  Cuisine types: {r.restaurant.cuisines}
                </Typography>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography variant="body2" component="body2">
                    Zomato rating: {r.restaurant.user_rating.aggregate_rating}
                    &nbsp;&nbsp;
                    <Rating name="user-rating" readOnly value={r.restaurant.user_rating.aggregate_rating} />
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
  
            <CardActions>
              <Box component="fieldset" mb={3} borderColor="transparent" alignItems="right">
                <Button size="small" variant="outlined" color="secondary" href={r.restaurant.url} target="_blank">Book a table</Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))
    }
    </GridList>
    </div>
    );
  }   // end of render()
}

export default RightNav;