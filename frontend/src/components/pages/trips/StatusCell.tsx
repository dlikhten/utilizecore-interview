import { CheckCircleIcon, ExclamationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { duration, parseISO } from 'concerns/date_parsing';
import { TripRecord } from 'models/TripRecord';
import { useEffect, useMemo, useState } from 'react';

function paddedPositiveNumber(number: number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

export function TripStatusCell({ trip }: { trip: TripRecord }) {
  const [elapsed, setElapsed] = useState('');

  const computedStatus = trip.computedStatus();

  useEffect(() => {
    let interval: any = undefined;

    // only start ticking if the status is appropriate...
    if (computedStatus === 'overdue' || computedStatus === 'in-progress') {
      interval = setInterval(() => {
        if ((computedStatus === 'overdue' || computedStatus === 'in-progress') && trip.startAt) {
          const pStartAt = parseISO(trip.startAt);
          const pNow = parseISO(new Date());

          const hours = duration(pStartAt, pNow, 'hours');
          const minutes = duration(pStartAt, pNow, 'minutes') % 60;

          setElapsed(`${paddedPositiveNumber(hours)}:${paddedPositiveNumber(minutes)}`);
        } else {
          setElapsed('');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [computedStatus, trip.startAt]);

  return useMemo(() => {
    if (computedStatus === 'not-started') {
      return (
        <div className="bg-blue-400 p-2 rounded-md inline-block text-white">
          <ExclamationCircleIcon width={20} height={20} className="inline fill-white" /> Unstarted
        </div>
      );
    } else if (computedStatus === 'completed') {
      return (
        <div className="bg-green-500 p-2 rounded-md inline-block text-white">
          <CheckCircleIcon width={20} height={20} className="inline fill-white" /> Complete
        </div>
      );
    } else if (computedStatus === 'overdue') {
      return (
        <div className="bg-red-500 p-2 rounded-md inline-block text-white">
          <QuestionMarkCircleIcon width={20} height={20} className="inline fill-white" /> Overdue - Total {elapsed}
        </div>
      );
    } else {
      return (
        <div className="bg-orange-400 p-2 rounded-md inline-block text-white">
          <QuestionMarkCircleIcon width={20} height={20} className="inline fill-white" /> In Progress - Total {elapsed}
        </div>
      );
    }
  }, [computedStatus, elapsed]);
}
