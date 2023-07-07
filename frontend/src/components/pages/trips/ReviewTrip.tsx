import { FormatDate } from 'components/FormatDate';
import { Button } from 'components/forms/Button';
import { TripRecord } from 'models/TripRecord';
import { ReactNode } from 'react';

function Field({ label, value }: { label: string; value: string | ReactNode }) {
  return (
    <div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="overflow-hidden overflow-ellipsis w-full">{value}</div>
    </div>
  );
}

export function ReviewTrip({ trip, onSuccess }: { trip: TripRecord; onSuccess: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Field label="Assignee" value={trip.assignee.email} />
      <Field label="Owner" value={trip.owner.email} />
      <Field label="Address" value={trip.location} />
      <Field label="Description" value={trip.description} />
      <Field label="ETA" value={<FormatDate.LongForm date={trip.estimatedTimeOfArrival} />} />
      <Field label="Check in" value={<FormatDate.LongForm date={trip.startAt} />} />
      <Field label="ETC" value={<FormatDate.LongForm date={trip.estimatedTimeOfCompletion} />} />
      <Field label="Check out" value={<FormatDate.LongForm date={trip.completedAt} />} />
      <Button onClick={() => onSuccess()}>Ok</Button>
    </div>
  );
}
ReviewTrip.DEPENDENCY_GRAPH = {
  trip: ['assignee', 'owner'],
};
