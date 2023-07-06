# frozen_string_literal: true

require "rails_helper"

describe LoginForm do
  context "upsert" do
    let!(:a_user) { create(:user) }

    it "populates self if the email given already exists" do
      form = LoginForm.new({
        email: a_user.email
      })

      expect {
        expect(form.save).to be_truthy
      }.to change(User, :count).by(0)

      expect(form.id).to eq(a_user.id)
    end

    it "creates the user if the email doesn't exist" do
      form = LoginForm.new({
        email: "someone_else@foo.example"
      })

      expect {
        expect(form.save).to be_truthy
      }.to change(User, :count).by(1)

      expect(User.find_by(email: "someone_else@foo.example")).to be_present
    end

    it "handles invalid emails" do
      form = LoginForm.new({
        email: "bad"
      })

      expect {
        expect(form.save).to be_falsey
      }.to change(User, :count).by(0)

      expect(form.errors).to have_key(:email)
    end
  end
end
