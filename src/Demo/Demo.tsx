import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {generateDateRange} from "./common";
import React, {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Pagination, Popover, styled, useMediaQuery} from "@mui/material";
import './App.css'


function Demo() {
  const matches = useMediaQuery('(min-width:768px)');
  // 日历时间
  const [dateCalendarValue, setDateCalendarValue] = useState<Dayjs | null>(dayjs());
  const [dateRangeValue, setDateRangeValue] = useState<Dayjs | null>(dayjs())
  console.log(dateRangeValue)
  const dateRange = generateDateRange(dateRangeValue!, matches ? 7 : 3)
  const handleChangeDate = (newValue: Dayjs) => {
    setDateCalendarValue(newValue)
    setDateRangeValue(newValue)
    handleClose()
  }
  const handleSubtractOrAdd = (type: 'SUBTRACT' | 'ADD') => () => {
    switch (type) {
      case "ADD":
        return setDateRangeValue(dayjs(dateRangeValue).add(1, 'day'))
      case "SUBTRACT":
        return setDateRangeValue(dayjs(dateRangeValue).subtract(1, 'day'))
      default:
        return null
    }

  }

  const handleDateItem = (date: string) => () => {
    console.log(dayjs(date))
    setDateCalendarValue(dayjs(date))
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <div className="roll-box">
        <div className="text">滚滚长江东逝水，浪花淘尽英雄，是非成败... ...</div>
      </div>

      <div className='flex justify-end items-end'>
        <button aria-describedby={id} onClick={handleClick}>select date</button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={dateCalendarValue} onChange={handleChangeDate}/>
        </LocalizationProvider>
      </Popover>
      <div className='flex items-center gap-x-2'>
        <button className='rotate-180 text-amber-600' onClick={handleSubtractOrAdd('SUBTRACT')}>
          <ArrowRightAltIcon/>
        </button>
        <div className='flex flex-nowrap gap-x-2'>
          {
            dateRange.map((d) => <button onClick={handleDateItem(d.date)}
                                         className={`${d.date === dayjs(dateCalendarValue).format('YYYY.MM.DD') ? 'text-amber-600' : ''} flex flex-nowrap`}>
              <span className='hidden md:block'>{d.dayOfWeek},</span> {d.dataOfMonth} </button>)
          }
        </div>
        <button className='text-amber-600' onClick={handleSubtractOrAdd('ADD')}>
          <ArrowRightAltIcon/>
        </button>
      </div>
      <CPagination
        // color='primary'
        count={10}
        shape="rounded"
      />
    </>

  )
}

export default Demo


const CPagination = styled(Pagination)(() => ({
  // width: 300,
  color: 'red',
  '& .Mui-selected': {
    background: 'red',
    color: '#FFF',
  },
}));