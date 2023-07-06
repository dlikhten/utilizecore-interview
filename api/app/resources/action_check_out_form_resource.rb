class ActionCheckOutFormResource < FormResource
  self.type = :action_check_out_form
  self.model = ActionCheckOutForm

  attribute :trip_id, :string
end