class CreateTripFormResource < FormResource
  self.type = :create_trip_form
  self.model = CreateTripForm

  attribute :assignee_id, :string
  attribute :location, :string
  attribute :description, :string
  attribute :estimated_time_of_arrival, :datetime
  attribute :estimated_time_of_completion, :datetime
end