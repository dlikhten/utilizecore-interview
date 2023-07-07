import { formatDate, parseISO } from 'concerns/date_parsing';
import dayjs from 'dayjs';

type FormatDateProps = {
  date: dayjs.ConfigType;
  format: string;
};
export function FormatDate({ date, format }: FormatDateProps) {
  const parsedDate = parseISO(date);
  return <>{formatDate(parsedDate, format)}</>;
}
