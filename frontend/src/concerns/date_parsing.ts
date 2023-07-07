import dayjs, { ConfigType, Dayjs, OpUnitType, QUnitType } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export function parseISO(isoString: ConfigType): Dayjs {
  return dayjs(isoString);
}

/**
 * Format a date, but only if the given date is valid
 */
export function formatDate(date: ConfigType, format?: string, elseVal = '') {
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format(format) : elseVal;
}

export function duration(earlierTime: ConfigType, laterTime: ConfigType, unit?: QUnitType | OpUnitType) {
  return dayjs(laterTime).diff(earlierTime, unit);
}
