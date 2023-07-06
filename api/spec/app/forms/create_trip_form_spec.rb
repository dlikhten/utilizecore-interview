# frozen_string_literal: true

require "rails_helper"

describe CreateTripForm do
  context "create" do
    let(:current_user) { create(:user) }

    it "smoke test" do
      form = CreateTripForm.new({
        location: "123 fake st",
        assignee_id: current_user.id.to_s,
        description: "",
        estimated_time_of_arrival: "2023-01-01 00:01:00.000Z",
        estimated_time_of_completion: "2023-01-01 00:02:00.000Z"
      })
      form.current_user = current_user # this would typically be done by the resource

      expect{
        expect(form.save).to be_truthy
      }.to change(Trip, :count).by(1)
    end

    it "transfers errors from the model" do
      form = CreateTripForm.new({
        location: "123 fake st",
        assignee_id: "",
        description: "",
        estimated_time_of_arrival: "2023-01-01 00:01:00.000Z",
        estimated_time_of_completion: ""
      })
      form.current_user = current_user # this would typically be done by the resource

      expect{
        expect(form.save).to be_falsey
      }.to change(Trip, :count).by(0)

      expect(form.errors).to have_key(:assignee_id)
      expect(form.errors).to have_key(:estimated_time_of_completion)
    end
  end
end
