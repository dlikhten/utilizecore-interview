import { Button } from 'components/forms/Button';
import { ReassignTripForm } from 'components/pages/trips/ReassignTripForm';
import { ReviewTrip } from 'components/pages/trips/ReviewTrip';
import { TripRowProps } from 'components/pages/trips/TripRow';
import { ActionCheckIn } from 'models/forms/ActionCheckIn';
import { ActionCheckOut } from 'models/forms/ActionCheckOut';
import { useCallback } from 'react';

export function TripActions({ trip, onSuccess, openPopup }: TripRowProps) {
  const checkIn = useCallback(async () => {
    const action = new ActionCheckIn();
    action.tripId = trip.id!;
    await action.save();
    onSuccess('Checked in');
  }, [onSuccess, trip.id]);

  const checkOut = useCallback(async () => {
    const action = new ActionCheckOut();
    action.tripId = trip.id!;
    await action.save();
    onSuccess('Checked out');
  }, [onSuccess, trip.id]);

  const reassign = useCallback(() => {
    openPopup('Reassign', <ReassignTripForm onSuccess={onSuccess} tripId={trip.id!} />);
  }, [onSuccess, openPopup, trip.id]);

  const review = useCallback(() => {
    openPopup('Review', <ReviewTrip trip={trip} onSuccess={onSuccess} />);
  }, [openPopup, trip]);

  if (trip.status === 'not-started') {
    return (
      <>
        <Button onClick={checkIn}>Check in</Button>
        <Button onClick={reassign}>Reassign</Button>
      </>
    );
  } else if (trip.status === 'in-progress') {
    return (
      <>
        <Button onClick={checkOut}>Check out</Button>
      </>
    );
  } else if (trip.status === 'completed') {
    return (
      <>
        <Button onClick={review}>Review</Button>
      </>
    );
  }
}
