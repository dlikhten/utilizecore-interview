class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.belongs_to :assignee, null: false, foreign_key: {to_table: :users}, index: true
      t.belongs_to :owner, null: false, foreign_key: {to_table: :users}, index: true
      t.timestamp :estimated_time_of_arrival, null: false
      t.timestamp :estimated_time_of_completion, null: false
      t.string :status, null: false, default: "not-started"
      t.timestamp :start_at
      t.timestamp :completed_at
      t.string :location, null: false
      t.string :description

      t.timestamps
    end
  end
end
