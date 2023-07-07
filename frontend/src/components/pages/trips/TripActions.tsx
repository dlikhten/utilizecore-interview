import { Button } from 'components/forms/Button';
import { ReassignTripForm } from 'components/pages/trips/ReassignTripForm';
import { TripRowProps } from 'components/pages/trips/TripRow';

export function TripActions({ trip, onSuccess, openPopup }: TripRowProps) {
  if (trip.status === 'not-started') {
    return (
      <>
        <Button>Check in</Button>
        <Button onClick={() => openPopup('Reassign', <ReassignTripForm onSuccess={onSuccess} tripId={trip.id!} />)}>
          Reassign
        </Button>
      </>
    );
  } else if (trip.status === 'in-progress') {
    return (
      <>
        <Button>Check out</Button>
      </>
    );
  } else if (trip.status === 'completed') {
    return (
      <>
        <Button>Review</Button>
      </>
    );
  }
}
