import { ApplicationRecord } from 'models/ApplicationRecord';
import { Attr, Model } from 'spraypaint';

@Model()
export class UserRecord extends ApplicationRecord {
  static jsonapiType = 'user';
  static endpoint = '/users';

  @Attr() email!: string;
}
