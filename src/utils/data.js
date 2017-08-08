export const setSize = (obj, { width, height }) => {
  obj.attr('width', width).attr('height', height)
}
import moment from 'moment'
export const weekInSecs = 3600 * 24 * 7
export const getWeekNum = ({ year, week }) => {
  return Math.ceil(
    moment().year(year).week(week).startOf('week').unix() / weekInSecs
  )
}

const data = {
  projects: [
    {
      title: 'ISGM Phase 1',
      type: 'Primary build',
      total_budget: 180,
      current_date: 'June 26, 2017',
      start_week: {
        year: 2017,
        week: 25
      },
      end_week: {
        year: 2017,
        week: 33
      },
      end_week_num: 32,
      controlX: getWeekNum({ year: 2017, week: 31 }),
      controlY: 40,
      zoomX: 1.5,
      zoomY: 1.5,
      startPoint: getWeekNum({ year: 2017, week: 22 }),
      endPoint: getWeekNum({ year: 2017, week: 35 }),
      hours: [
        { year: 2017, week: 25, value: 5 },
        { year: 2017, week: 26, value: 9 },
        { year: 2017, week: 27, value: 12 },
        { year: 2017, week: 28, value: 18 },
        { year: 2017, week: 29, value: 22 },
        { year: 2017, week: 30, value: 25 },
        { year: 2017, week: 31, value: 28 },
        { year: 2017, week: 32, value: 11 }
      ],
      resources: [
        {
          label: 'Claire Coltrane',
          value: 50,
          role: 'Programmer',
          color: '#499bb1',
          locked: false
        },
        {
          label: 'Brigitte Bardot',
          value: 70,
          role: 'Project Manager',
          color: '#b0385f',
          locked: false
        },
        {
          label: 'Monica Belucci',
          value: 40,
          role: 'Senior Designer',
          color: '#868035',
          locked: false
        },
        {
          label: 'Unassigned (Reserve)',
          value: 20,
          role: 'Unassigned',
          color: '#efe24a',
          locked: true
        }
      ]
    },
    {
      title: 'ISGM Phase 2',
      type: 'Primary build 2222',
      total_budget: 100,
      current_date: 'June 26, 2017',
      start_week: {
        year: 2017,
        week: 27
      },
      end_week: {
        year: 2017,
        week: 35
      },
      end_week_num: 35,
      controlX: getWeekNum({ year: 2017, week: 33 }),
      controlY: 40,
      zoomX: 1.5,
      zoomY: 1.5,
      startPoint: getWeekNum({ year: 2017, week: 24 }),
      endPoint: getWeekNum({ year: 2017, week: 37 }),
      hours: [
        { year: 2017, week: 27, value: 5 },
        { year: 2017, week: 28, value: 9 },
        { year: 2017, week: 29, value: 12 },
        { year: 2017, week: 30, value: 18 },
        { year: 2017, week: 31, value: 22 },
        { year: 2017, week: 32, value: 25 },
        { year: 2017, week: 33, value: 28 },
        { year: 2017, week: 34, value: 11 }
      ]
    }
  ]
}

export default data
