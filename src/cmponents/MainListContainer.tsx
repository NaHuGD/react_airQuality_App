import React,{ useState, useEffect } from 'react'
import {Grid, Box, makeStyles, Theme} from '@material-ui/core'
// interface
import { IAirInfo } from '../interface/props'

const useStyles = makeStyles((theme: Theme) => ({
    airList: {
        padding: theme.spacing(2),
        border: '1px solid',
        marginBottom: theme.spacing(2),
        '& > div': {
            padding: `${theme.spacing(1)}px 0`,
            borderBottom: '1px solid'
        },
        '& > div:last-child': {
            border: 0
        }
    },
    cityContainer: {
        alignItems: 'start',
        '& > div': {
            '&:nth-child(odd)':{
                // mob中間間距
                '& > div ': {
                    [theme.breakpoints.down('sm')]: {
                        marginRight: theme.spacing(1),
                    },
                },
            },
            '&:nth-child(even)':{
                // mob中間間距
                '& > div ': {
                    [theme.breakpoints.down('sm')]: {
                        marginLeft: theme.spacing(1),
                    },
                },
            },
            '& > div ': {
                marginLeft: 0,
                display: 'flex',
                cursor: 'pointer',
                [theme.breakpoints.up('md')]: {
                    marginLeft: theme.spacing(2),
                },
                '& > div ': {
                    padding: `${theme.spacing(1)}px 0`,
                }
            }
        }
    }
}));

interface IProps {
    cityInfo: IAirInfo[]
}

const MainListContainer = (props:IProps) => {
    const classes = useStyles()
    const {cityInfo} = props
    const [singleInfo, setSingleInfo] = useState<IAirInfo | undefined>(undefined)

    const getSingleInfo = (index:number) => {
        setSingleInfo(cityInfo[index])
    }

    useEffect(() => {
        setSingleInfo(cityInfo[0])
    }, [cityInfo[0]])

    return (
        <>
            {singleInfo !== undefined ?
            <Grid container item xs={12} md={5}>
                <Grid item xs={6}>
                    <Box py={2} textAlign="center" border={1} mr={'-.5px'} mb={'-1px'}>{singleInfo.SiteName}</Box>
                </Grid>
                <Grid item xs={6}>
                    <Box py={2} textAlign="center" border={1} ml={'-.5px'} mb={'-1px'}>{singleInfo.AQI}</Box>
                </Grid>
                <Grid item xs={12} className={classes.airList}>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">臭氧O3(ppb)</Box>
                        <Box width="50%" textAlign="right">{singleInfo.O3 || '-'}</Box>
                    </Box>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">懸浮微粒PM10</Box>
                        <Box width="50%" textAlign="right">{singleInfo.PM10 || '-'}</Box>
                    </Box>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">細懸浮微粒PM2.5</Box>
                        <Box width="50%" textAlign="right">{singleInfo['PM2.5']}</Box>
                    </Box>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">一氧化碳CO</Box>
                        <Box width="50%" textAlign="right">{singleInfo.CO}</Box>
                    </Box>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">二氧化硫SO2</Box>
                        <Box width="50%" textAlign="right">{singleInfo.SO2}</Box>
                    </Box>
                    <Box display="flex" width="100%">
                        <Box width="50%" textAlign="left">二氧化氮NO2</Box>
                        <Box width="50%" textAlign="right">{singleInfo.NO2}</Box>
                    </Box> 
                </Grid>
            </Grid>
            : null }
            <Grid item xs={12} md={7} className={classes.cityContainer}>
                {
                    cityInfo.map((item, index) => (
                        <Box width="50%" display="inline-block" mb={2} key={item.SiteName} onClick={() => getSingleInfo(index)}>
                            <Box textAlign="center">
                                <Box border={1} mr={'-.5px'} width="50%">{item.SiteName}</Box>
                                <Box border={1} ml={'-.5px'} width="50%">{item.AQI}</Box>
                            </Box>
                        </Box>
                    ))
                }
            </Grid>
        </>
    )
}

export default MainListContainer