import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:'15px 0px'
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        fontSize:'30px',
      },
      image: {
        marginLeft: '10px',
      },
      [theme.breakpoints.down("sm")]:{
        mainContainer:{
          flexDirection:"column-reverse"
        }
      }
}));