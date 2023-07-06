# == Schema Information
#
# Table name: trips
#
#  id                           :bigint           not null, primary key
#  completed_at                 :datetime
#  description                  :string
#  estimated_time_of_arrival    :datetime         not null
#  estimated_time_of_completion :datetime         not null
#  location                     :string           not null
#  start_at                     :datetime
#  status                       :string           default("not-started"), not null
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  assignee_id                  :bigint           not null
#  owner_id                     :bigint           not null
#
# Indexes
#
#  index_trips_on_assignee_id  (assignee_id)
#  index_trips_on_owner_id     (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (assignee_id => users.id)
#  fk_rails_...  (owner_id => users.id)
#
class Trip < ApplicationRecord
  belongs_to :assignee, class_name: "User"
  belongs_to :owner, class_name: "User"

  validates :status, :estimated_time_of_arrival, :estimated_time_of_completion, :location, presence: true
  validates :start_at, presence: true, if: ->{ status == "in-progress" }
  validates :completed_at, presence: true, if: ->{ status == "completed" }
  validate :ensure_time_overlaps!

  # note: while we technically have an "overdue" status, it is a temporal state based on status + current time
  #       therefore it should be computed. At the moment we have no use for it in the back-end so it will be rendered
  #       with the appropriate status in the front-end, and if we were to write reports, this would be derived
  #       during the query.
  STATUSES = %w[not-started in-progress completed]
  enum status: STATUSES.zip(STATUSES).to_h

  protected
    def ensure_time_overlaps!
      if estimated_time_of_arrival.present? && estimated_time_of_completion.present? && estimated_time_of_arrival >= estimated_time_of_completion
        errors.add(:estimated_time_of_completion, :before_arrival)
      end

      if start_at.present? && completed_at.present? && start_at >= completed_at
        errors.add(:completed_at, :before_start)
      end
    end
end
