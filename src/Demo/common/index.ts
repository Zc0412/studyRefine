import dayjs, {Dayjs} from "dayjs";

export function generateDateRange(dateStr: Dayjs, length: number) {
  const _length = (length-1)/2
  // 将输入的日期字符串转换为日期对象
  const inputDate = dayjs(dateStr);

  // 创建一个新的数组来存储结果
  const dateRange = [];

  // 计算前两天的日期
  for (let i = _length; i > 0; i--) {
    const newDate = inputDate.subtract(i, 'day');
    console.log(newDate)
    dateRange.push({
      date: newDate.format('YYYY.MM.DD'),
      dataOfMonth:newDate.format('MMM DD'),
      dayOfWeek: newDate.format('ddd')
    });
  }

  // 将输入的日期添加到数组中
  dateRange.push({
    date: inputDate.format('YYYY.MM.DD'),
    dataOfMonth:inputDate.format('MMM DD'),
    dayOfWeek: inputDate.format('ddd')
  });

  // 计算后两天的日期
  for (let i = 1; i <= _length; i++) {
    const newDate = inputDate.add(i, 'day');
    console.log(newDate)
    dateRange.push({
      date: newDate.format('YYYY.MM.DD'),
      dataOfMonth:newDate.format('MMM DD'),
      dayOfWeek: newDate.format('ddd')
    });
  }


  return dateRange;
}
