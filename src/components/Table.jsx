import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

// const  Table= ({Tabledata}) =>{
//   const classes = useStyles();

  return (
<div> {data ? <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Games</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Losses</TableCell>
                        <TableCell align="right">Winrate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.TopFive.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.games}</TableCell>
                            <TableCell align="right">{row.wins}</TableCell>
                            <TableCell align="right">{row.defeats}</TableCell>
                            <TableCell align="right">{Math.floor(row.wins / row.games * 100)}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : 'no data'}
        </div>
  );
}

export default Table;

// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// const useStyles = makeStyles({
//     table: {
//         minWidth: 300,
//     },
// });
// const TopFiveHamsters = () => {
//     const url = 'api/charts/top';
//     const [data, setData] = useState(null);
//     const classes = useStyles();
//     useEffect(() => {
//         async function fetchData() {
//             const response = await fetch(url);
//             const json = await response.json();
//             setData({ TopFive: json });
//         }
//         fetchData();
//     }, [])
//     return (
//         <div> {data ? <TableContainer component={Paper}>
//             <Table className={classes.table} size="small" aria-label="a dense table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="right">Games</TableCell>
//                         <TableCell align="right">Wins</TableCell>
//                         <TableCell align="right">Losses</TableCell>
//                         <TableCell align="right">Winrate</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.TopFive.map((row) => (
//                         <TableRow key={row.name}>
//                             <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell>
//                             <TableCell align="right">{row.games}</TableCell>
//                             <TableCell align="right">{row.wins}</TableCell>
//                             <TableCell align="right">{row.defeats}</TableCell>
//                             <TableCell align="right">{Math.floor(row.wins / row.games * 100)}%</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer> : 'no data'}
//         </div>
//     );
// }
// export default TopFiveHamsters;