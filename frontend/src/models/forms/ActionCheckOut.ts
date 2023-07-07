import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

@Model()
export class ActionCheckOut extends ApplicationRecord {
  static jsonapiType = 'action_check_out_form';
  static endpoint = '/action_check_out_forms';

  @Attr() tripId!: string;
}
