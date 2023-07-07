import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

@Model()
export class ActionCheckIn extends ApplicationRecord {
  static jsonapiType = 'action_check_in_form';
  static endpoint = '/action_check_in_forms';

  @Attr() tripId!: string;
}
