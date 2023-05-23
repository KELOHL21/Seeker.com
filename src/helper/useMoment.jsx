import moment from "moment/moment"


export const getTimeStamp = (timeformat) => {
   return ( moment().format(timeformat) )
}