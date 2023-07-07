import { createSWRKeyForFind } from 'concerns/jsonapi_utils';
import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';
import useSWR from 'swr';

export type ReassignTripFormAttributes = {
  assigneeId: string;
};

@Model()
export class ReassignTripFormRecord extends ApplicationRecord implements ReassignTripFormAttributes {
  static jsonapiType = 'reassign_trip_form';
  static endpoint = '/reassign_trip_forms';

  @Attr() assigneeId!: string;
}

export function useFetchReassignTripFormInitialValues(tripId?: string) {
  return useSWR(createSWRKeyForFind(ReassignTripFormRecord, tripId), () => ReassignTripFormRecord.find(tripId!), {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });
}
