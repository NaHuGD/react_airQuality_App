import React, {useEffect, useState} from 'react';
import {Grid, Box} from '@material-ui/core';
import TableContainer from './cmponents/TableContainer'
import MainListContainer from './cmponents/MainListContainer'
// breakpoints
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
// getAPI
import { getAirData } from './common/api'
// interface
import { IAirInfo } from './interface/props'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    airqualityContainer: {
      width: '80%',
      margin: '0 auto',
      fontSize: '16px',
      lineHeight: '1.5',
      background: '#66666620',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      }
    },
    dateInfo: {
      [theme.breakpoints.up('xs')]: {
        marginBottom: theme.spacing(2)
      },
      [theme.breakpoints.up('sm')]: {
        margin: `${theme.spacing(2)}px 0`
      },
    },
  }),
);


const App = () => {
  const classes = useStyles();
  const [cityList, setCityList] = useState([])
  const [cityName, setCityName] = useState('None')

  useEffect( () => {
    const fetchData = async () => {
      await getAirData()
        .then(res => {
          if(res.status === 200){
            setCityList(res.data.records)
          }
        })
        .catch(rej => console.log(rej))
    }
    fetchData()
  },[])

  const getCurrentCity = (city:string) => {
    setCityName(city)
  }
  // 取得城市個別資訊
  const cityInfo =  cityList.filter((item:IAirInfo) => {
    if(item.County === cityName) return item 
  })

  return (
    <Grid className={classes.airqualityContainer}>
      <Grid container alignItems="center">
        { cityList && <TableContainer cityList={cityList} getCurrentCity={getCurrentCity}/> }
      </Grid>
      <Grid item xs={12} className={classes.dateInfo}>
        <Box>{cityName} / 2019-01-24 14:00 更新</Box>
      </Grid>
      {
        cityInfo.length > 0 ?
        <Grid container>
          <MainListContainer cityInfo={cityInfo} />
        </Grid>
        : null
      }
    </Grid>
  );
}

export default App;
