class UserResource < ApplicationResource
  self.type = "user"

  attribute :email, :string
end