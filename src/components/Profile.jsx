import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const Profile = ({Hamster}) =>{
// export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`/api/hamsters/${Hamster.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {Hamster.name} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Loves: {Hamster.loves} <br/>
            Age: {Hamster.age} <br/>
            FavoFood: {Hamster.food} <br/>
            Games: {Hamster.games} <br/>
            Wins: {Hamster.wins} <br/>
            Defeats: {Hamster.defeats}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Profile;