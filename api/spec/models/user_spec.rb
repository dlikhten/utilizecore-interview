require 'rails_helper'

describe User, type: :model do
  context "validations" do
    it "required attributes" do
      user = User.new

      expect(user.valid?).to be_falsey

      expect(user.errors).to have_key(:email)
    end

    it "email should at least have an @ symbol" do
      user = User.new

      user.email = "foo"
      expect(user.valid?).to be_falsey

      user.email = "foo@email.com"
      expect(user.valid?).to be_truthy
    end
  end
end
