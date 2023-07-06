FactoryBot.define do
  factory :trip do
    owner { association(:user) }
    assignee { association(:user) }

    estimated_time_of_arrival { Time.zone.now.beginning_of_day + rand(12).hours }
    estimated_time_of_completion { instance.estimated_time_of_arrival + 15.minutes + rand(360).minutes }
    status { "not-started" }
    start_at { nil }
    completed_at { nil }
    location { Faker::Address.full_address }
    description { Faker::Movies::Hackers.quote }

    trait :own_assignee do
      assignee { instance.owner }
    end

    trait :started do
      status { "in-progress" }
      start_at { instance.estimated_time_of_arrival }
    end

    trait :completed do
      status { "completed" }
      start_at { instance.estimated_time_of_arrival }
      completed_at { instance.estimated_time_of_completion }
    end
  end
end
