class ActionCheckInFormResource < FormResource
  self.type = :action_check_in_form
  self.model = ActionCheckInForm

  attribute :trip_id, :string
end