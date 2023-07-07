import { Button } from 'components/forms/Button';
import { TripRecord } from 'models/TripRecord';

export function TripActions({ trip }: { trip: TripRecord }) {
  if (trip.status === 'not-started') {
    return (
      <>
        <Button>Check in</Button>
        <Button>Reassign</Button>
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
