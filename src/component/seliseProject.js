import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { withStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import reactLogo from '../logo.svg'

const styles = theme=> ({
    root: {
        width: '50%',
        margin:'auto',
        marginTop:'50px'
    },
    container: {
        maxHeight: 440,
    },
});


class SeliseProject extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            data:['Date', 'Teams', 'Score'],
            allData: [],
            name:'',
            team:[],
        }
    }


    componentDidMount() {
        //this.getAllData()
        this.getsketchupReqList()
    }

    /*getAllData=()=>{
        axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json',
            {}, {})
            .then((jsonData) => {
                //console.log('print value', response.data.rounds.map(val=> val.matches));
                console.log('print value', jsonData.data.rounds);
                var teamNamesTemp = [];
                var teamNames = [];
                /!*for (var i=0; i<jsonData.data.rounds.length; i++){
                    for(var j=0; j<jsonData.data.rounds[i].matches.length; j++){
                        teamNamesTemp.push(jsonData.rounds[i].matches[j].team1.name,jsonData.rounds[i].matches[j].team2.name);
                        console.log("got temp",teamNamesTemp)
                    }
                }*!/

                for (let i=0; i<= jsonData.data.rounds.length; i++){
                    console.log('print team', teamNames[i])
                }
                /!*this.setState({name: response.data.name});
                this.setState({allData: response.data.rounds});
                this.setState({team: response.data.rounds.map(val=> val.matches)});
                console.log('all team', this.state.team)*!/

            }).catch((error) => {
            console.log("error", error);
            this.setState({allData: []});
        });

    };*/

    getsketchupReqList = () => {
        fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json")
            .then(response => response.json())
            .then((jsonData) => {
                console.log('matchData:',jsonData)
                //this.receivedData(jsonData.rounds)
                var teamNamesTemp = [];
                var teamNames = [];
                for (var i=0; i<jsonData.rounds.length; i++){
                    for(var j=0; j<jsonData.rounds[i].matches.length; j++){
                        teamNamesTemp.push(jsonData.rounds[i].matches[j].team1.name,jsonData.rounds[i].matches[j].team2.name);

                    }
                }
                console.log('get value:', teamNamesTemp);
                teamNames = teamNamesTemp.filter(function(value, index, array){
                    return (array.indexOf(value) === index);
                });
                console.log('get filter team name:', teamNames);

                var teamDetails = [];
                for(var i=0; i<teamNames.length; i++){
                    teamDetails.push({
                        name   :teamNames[i],
                        played : 0,
                        goals  : 0,
                        won    : 0,
                        lost   : 0,
                        drawn  : 0
                    });
                }
                console.log("got round length",jsonData.rounds.length)
                for (var i=0; i<jsonData.rounds.length; i++){
                    for(var j=0; j<jsonData.rounds[i].matches.length; j++){
                        if (!jsonData.rounds[i].matches[j].team1.score1 && !jsonData.rounds[i].matches[j].team2.score2) {
                            for(var k=0; k<teamDetails.length; k++){
                                if(jsonData.rounds[i].matches[j].team1.name === teamDetails[k].name &&jsonData.rounds[i].matches[j].score1 !==null){
                                    teamDetails[k].played++;
                                    teamDetails[k].goals = teamDetails[k].goals +jsonData.rounds[i].matches[j].score1
                                    if (jsonData.rounds[i].matches[j].score1 > jsonData.rounds[i].matches[j].score2){
                                        teamDetails[k].won++;
                                    }
                                    else if(jsonData.rounds[i].matches[j].score1 < jsonData.rounds[i].matches[j].score2){
                                        teamDetails[k].lost++;
                                    }
                                    else if(jsonData.rounds[i].matches[j].score1 !==null){
                                        teamDetails[k].drawn++;
                                    }
                                }
                                else if(jsonData.rounds[i].matches[j].team2.name === teamDetails[k].name && jsonData.rounds[i].matches[j].score2 !==null){
                                    teamDetails[k].played++;
                                    teamDetails[k].goals =teamDetails[k].goals + jsonData.rounds[i].matches[j].score2;
                                    if (jsonData.rounds[i].matches[j].score2 > jsonData.rounds[i].matches[j].score1){
                                        teamDetails[k].won++;
                                    }
                                    else if(jsonData.rounds[i].matches[j].score2 <jsonData.rounds[i].matches[j].score1){
                                        teamDetails[k].lost++;
                                    }
                                    else if(jsonData.rounds[i].matches[j].score2 !==null){
                                        teamDetails[k].drawn++;
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(teamDetails)
                console.log("got teammaes",teamNames)
                this.setState({
                    name: jsonData.name,
                    rounds: jsonData.rounds,
                    teamDetails:teamDetails
                })
                console.log(this.state.name)
                console.log(this.state.teamDetails)
            })
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })
    };

    getInnerText=(code)=>{
        const text = code;
        const myArray = this.state.allData.filter(val=> val.team)
    };

    render() {
        const { classes } = this.props;
        const { allData, data } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <div style={{display:'flex'}}>
                                <img src={reactLogo}  alt={reactLogo} style={{height:'50px', width:'50px', marginTop:'9px', marginBottom:'0px'}}/>
                                <span style={{marginTop:'20px'}}>
                                    Welcome
                                </span>
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>

               {/* <div>
                    {this.state.name}

                    {this.state.allData.map((football, index)=>
                        <div key={index}>{football.matches.map((team1, key)=>
                            <div>{team1.date}</div>
                        )}

                        </div>
                    )}

                </div>*/}

                <Paper className={classes.root}>
                    <span style={{color:'#0089ff', fontWeight:'600', fontSize:'18px'}}>{this.state.name}</span>
                    <TableContainer className={classes.container} style={{marginTop:'10px'}}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                {/*<TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Teams</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>*/}

                            </TableHead>


                            <TableBody>
                                {/*{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}*/}

                                {allData.map((football, index)=>{
                                    return(
                                        <TableRow key={index}>
                                            {football.matches.map((match, key)=>
                                                <TableRow key={key}>
                                                    <TableCell>{match.date} </TableCell>

                                                    <TableCell>
                                                        <span style={{backgroundColor:'rgba(0, 137, 255, 0.15)', cursor:'pointer'}} onClick={()=>this.getInnerText(match.team1.code)}>
                                                            {match.team1.name}
                                                        </span>  VS
                                                        <span style={{backgroundColor:'rgba(0, 137, 255, 0.15)', cursor:'pointer'}} onClick={()=>this.getInnerText(match.team2.code)}>
                                                            {match.team2.name}
                                                        </span>
                                                    </TableCell>
                                                        <TableCell>
                                                            <b style={{color:'red'}}>{match.score1}-{match.score2}
                                                            </b>
                                                        </TableCell>

                                                    {
                                                        match.score1 > match.score2?
                                                        <TableCell>win {match.team1.code} and lose {match.team2.code}</TableCell>
                                                        :
                                                        match.score1 < match.score2 ?
                                                            <TableCell>Lose {match.team1.code} and Win {match.team2.code}</TableCell>
                                                            :
                                                            <TableCell>Draw</TableCell>
                                                    }

                                                </TableRow>
                                            )}
                                        </TableRow>
                                    )
                                })}

                                {/*{allData.map((football, index)=>
                                    <TableRow key={index}>
                                        <TableCell>{football.name}</TableCell>
                                    </TableRow>
                                )}*/}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*<TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />*/}
                </Paper>
            </div>
        );
    }
}

SeliseProject.propTypes = {
    allData: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(SeliseProject);
