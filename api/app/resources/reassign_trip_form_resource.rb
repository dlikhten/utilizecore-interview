class ReassignTripFormResource < FormResource
  self.type = :reassign_trip_form
  self.model = ReassignTripForm

  attribute :assignee_id, :string
end