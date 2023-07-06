# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email)
#
class User < ApplicationRecord
  has_many :assigned_trips, class_name: "Trip", foreign_key: "assignee_id"
  has_many :owned_trips, class_name: "Trip", foreign_key: "owner_id"

  validates :email, presence: true, format: { with: /.*@.*/, message: "must be an email" }
end
