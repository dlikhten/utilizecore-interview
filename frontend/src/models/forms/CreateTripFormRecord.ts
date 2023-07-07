import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

export type CreateTripFormAttributes = {
  assigneeId: string;
  location: string;
  description: string;
  estimatedTimeOfArrival: string;
  estimatedTimeOfCompletion: string;
};

@Model()
export class CreateTripFormRecord extends ApplicationRecord implements CreateTripFormAttributes {
  static jsonapiType = 'create_trip_form';
  static endpoint = '/create_trip_forms';

  @Attr() assigneeId!: string;
  @Attr() location!: string;
  @Attr() description!: string;
  @Attr() estimatedTimeOfArrival!: string;
  @Attr() estimatedTimeOfCompletion!: string;
}
