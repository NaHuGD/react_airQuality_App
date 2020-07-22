import React,{useState, useEffect} from 'react'
// Table
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Box, Typography} from '@material-ui/core';
// select
import { Select, MenuItem , FormControl, InputLabel  } from '@material-ui/core';
// interface
import { IAirInfo } from '../interface/props'

const useStyles = makeStyles((theme: Theme) => ({

    formControl: {
        width: '100%',
        minWidth: 120,
    },
    table: {
        textAlign: 'center',
        alignSelf: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            margin: `${theme.spacing(2)}px 0`,
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(2),
        },
        '& > div:nth-child(1)': {
            // table表格顏色(第一層table)
            minHeight: 50,
            '& > div:nth-child(1)': {
                background: theme.custom.green,
            },
            '& > div:nth-child(2)': {
                background: theme.custom.yellow,
            },
            '& > div:nth-child(3)': {
                background: theme.custom.orange,
            },
            '& > div:nth-child(4)': {
                background: theme.custom.red,
            },
            '& > div:nth-child(5)': {
                background: theme.custom.blue,
            },
            '& > div:nth-child(6)': {
                background: theme.custom.purple,
            },
        },
        '& > div': {
            [theme.breakpoints.down('sm')]: {
                maxWidth: '50%',
                flexDirection: 'column',
                display: 'inline-flex'
            },
            '& > div': {
                // 文字解說table
                margin: '0 -1px -1px 0',
                border: '1px solid',
                minHeight: 50,
                [theme.breakpoints.down('sm')]: {
                    marginBottom: '-1px',
                },
            },
            '&:nth-child(even) div': {
                // 清除手機尺寸table邊框
                [theme.breakpoints.down('sm')]: {
                    marginLeft: '-1px',
                },
            },
        }
    },
}));

const airs = [
    '0~50',
    '51~100',
    '101~150',
    '151~200',
    '201~250',
    '251~300'
]

const rows = [
    '良好',
    '普通',
    '對敏感族群不健康',
    '對所有族群不健康',
    '非常不健康',
    '危害'
];

interface IProps {
    cityList: IAirInfo[]
    getCurrentCity: Function
}

const TableContainer = (props:IProps) => {
    const classes = useStyles()
    // 過濾重複的縣市
    const cityName = props.cityList.map((item: IAirInfo, index, arr) => {
        return item.County
    })
    const filterCityName = cityName.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
    // 顯示第一筆資料
    // useEffect(() => {
    //     props.getCurrentCity(filterCityName[0])
    // },[])

    const [age, setAge] = useState('')
    const changeCity = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string)
        props.getCurrentCity(event.target.value)
    }

    return (
        <>
            <Grid item xs={12} md={5}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2">空氣品質指標(AQI)</Typography>
                </Grid>
                <Grid item xs={12}>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">請選擇地區</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={changeCity}
                    >
                        <MenuItem value="null">
                            <em>None</em>
                        </MenuItem>
                        {filterCityName.map(name => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} md={7} className={classes.table}>
                <Grid container>
                    {
                        airs.map(air => (
                            <Grid container item alignItems="center" md={2} key={air}>
                                <Box width="100%">{air}</Box>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container>
                    {
                        rows.map(row => (
                            <Grid container item alignItems="center" md={2} key={row}>
                                <Box width="100%">{row}</Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default TableContainer