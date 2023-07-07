import { FormatDate } from 'components/FormatDate';
import { TripStatusCell } from 'components/pages/trips/StatusCell';
import { TableCell } from 'components/pages/trips/TableCell';
import { TripActions } from 'components/pages/trips/TripActions';
import { TripRecord } from 'models/TripRecord';
import { ReactNode } from 'react';

type TripRowProps = {
  trip: TripRecord;
  onSuccess: () => void;
  openPopup: (title: string, content: ReactNode) => void;
};

export function TripRow({ trip }: TripRowProps) {
  return (
    <div className="contents">
      <TableCell>{trip.assignee.email}</TableCell>
      <TableCell>{trip.owner.email}</TableCell>
      <TableCell>{trip.location}</TableCell>
      <TableCell>
        <FormatDate date={trip.estimatedTimeOfArrival} format="MM/DD/YYYY hh:mm A z" />
      </TableCell>
      <TableCell>
        <FormatDate date={trip.estimatedTimeOfCompletion} format="MM/DD/YYYY hh:mm A z" />
      </TableCell>
      <TableCell span={2}>
        <div className="flex w-full">
          <div className="flex-grow">
            <TripStatusCell trip={trip} />
          </div>
          <div className="flex-nowrap flex gap-x-2">
            <TripActions trip={trip} />
          </div>
        </div>
      </TableCell>
    </div>
  );
}
TripRow.DEPENDENCY_GRAPH = {
  trip: ['assignee', 'owner'],
};
