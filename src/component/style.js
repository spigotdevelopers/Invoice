import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
        minWidth: '99%',
        maxWidth: '99%',
        minHeight: '94vh',
        border: '2px solid #005eb2'
      },
      invoive: {
        paddingTop: '1vh',
        paddingBottom: '1vh',
        marginLeft: '1%',
        justifyContent: 'center',
      },
      Button: {
        marginTop: '2vh',
        marginLeft: 20,
      },
      title: {
       float: 'left',
      },
      titles: {
        float: 'right',
       },
      details: {
        marginTop: '4vh',
      },
      TableCellhead: {
        fontSize: '14px',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
}));
