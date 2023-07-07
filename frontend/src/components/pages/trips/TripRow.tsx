import { FormatDate } from 'components/FormatDate';
import { TripStatusCell } from 'components/pages/trips/StatusCell';
import { TableCell } from 'components/pages/trips/TableCell';
import { TripRecord } from 'models/TripRecord';

type TripProps = {
  trip: TripRecord;
};

export function TripRow({ trip }: TripProps) {
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
          <div className="self-start">
            <TripStatusCell trip={trip} />
          </div>
          <div className="self-end"></div>
        </div>
      </TableCell>
    </div>
  );
}
TripRow.DEPENDENCY_GRAPH = {
  trip: ['assignee', 'owner'],
};
