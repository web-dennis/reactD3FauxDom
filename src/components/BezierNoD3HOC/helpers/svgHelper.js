export const setSize = (obj, { width, height }) => {
  obj.attr('width', width).attr('height', height)
}

export default '3'
import moment from 'moment'
export const weekInSecs = 3600 * 24 * 7
export const getWeekNum = ({ year, week }) => {
  return Math.ceil(
    moment().year(year).week(week).startOf('week').unix() / weekInSecs
  )
}
