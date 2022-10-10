import { Grid, makeStyles, createStyles, Theme, GridSize, Card, CardActionArea, CardMedia, Typography, CardContent, } from "@material-ui/core"
import { Pagination } from '@material-ui/lab';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/routesConsts";
import { deviceAPI } from "../api/deviceAPI";
import useWinWidth from "../hooks/useWinWidth";
import CircleLoader from "./loaders/CircleLoader";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      item: {
      },
      card: {
         textAlign: 'center',
         color: theme.palette.text.secondary,
         width: '100%',
         height: 230,
         '@media(max-width: 800px)': {
            height: 430,
         },
         position: 'relative'
      },
      deleteBtn: {
         position: 'absolute',
         top: 5,
         right: 5,
         zIndex: 99,
         cursor: 'pointer',
         transition: 'transform 200ms',
         '&:hover': {
            transform: 'scale(1.2)'
         },
         '&:active svg': {
            color: 'grey'
         }
      },
      media: {
         width: '100%',
         height: '70%',
         '&img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
         }
         ,
         '@media(max-width: 800px)': {
            height: '90%',
         }
      },
      flexArea: {
         display: 'flex',
         justifyContent: 'space-between'
      }
   }),
)

const DeviceList = observer(() => {
   const classes = useStyles();
   const { device, user } = useContext(Context)
   const [isFetching, setIsFetching] = useState(true)

   const navigate = useNavigate()

   useEffect(() => {
      setIsFetching(true)

      deviceAPI.getDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit)
         .then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
         })
         .then(() => setIsFetching(false))
   }, [device, device.page, device.limit, device.selectedType, device.selectedBrand, device.totalCount])

   const pageCount = Math.ceil(device.totalCount / device.limit)

   //get window width
   const winWidth = useWinWidth()

   //grid items columns depend on window width
   const calcGridSize = (winWidth: number) => {
      let gridSize: GridSize
      if (winWidth > 1200) {
         gridSize = 3
      } else if (winWidth < 1200 && winWidth >= 930) {
         gridSize = 4
      } else if (winWidth < 930 && winWidth >= 800) {
         gridSize = 6
      } else {
         gridSize = 12
      }
      return gridSize
   }

   const handleChange = (page: number) => {
      device.setPage(page)
   }

   const toDevicePage = (deviceId: number) => {
      if (!user.editMode) {
         navigate(DEVICE_ROUTE + '/' + deviceId)
      }
   }

   const deleteDevice = async (deviceId: number) => {
      console.log('delete', deviceId)
      await deviceAPI.deleteOneDevice(deviceId)
      device.setTotalCount(device.totalCount - 1)
      // console.log(device.devices.filter(d => d.id !== id))
   }

   if (isFetching) {
      return <CircleLoader />
   }

   return <>
      <Grid container spacing={3} style={{ paddingBottom: '3%' }}>
         {device.devices.map(device => {
            return <Grid item
               xs={calcGridSize(winWidth)}
               key={device.id + Date.now()}
               onClick={() => toDevicePage(device.id)}
               className={classes.item}
            >
               <Card className={classes.card}>
                  {user.editMode &&
                     <div className={classes.deleteBtn} onClick={() => deleteDevice(device.id)}>
                        <CancelIcon color="error" />
                     </div>}

                  <CardActionArea style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                     <CardMedia
                        className={classes.media}
                        image={process.env.REACT_APP_API_URL + device.img}
                        title={device.name}
                     />
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                           {device.name}
                        </Typography>
                        <div className={classes.flexArea}>
                           <Typography variant="body2" color="textSecondary" component="p">
                              Price: <b>{device.price}</b>
                           </Typography>
                           <Typography variant="body2" color="textSecondary" component="p" className={classes.flexArea}>
                              {device.rating} <StarRateIcon />
                           </Typography>
                        </div>

                     </CardContent>
                  </CardActionArea>
               </Card>
            </Grid>
         })}
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <Pagination
            count={pageCount}
            page={device.page}
            onChange={(e: ChangeEvent<unknown>, page: number) => handleChange(page)}

            variant="outlined"
            shape="rounded"
            style={{ display: 'inline-block' }} />
      </div>
   </>
})

export default DeviceList