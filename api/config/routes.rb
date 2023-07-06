Rails.application.routes.draw do
  scope :api, path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    # standard resources (mostly view-only, use forms for submission)
    resource :users, only: [:show, :list]
    resource :trips, only: [:show, :list]

    # forms
    resource :create_trip_forms, only: [:create]
    resource :action_check_in_forms, only: [:create]
    resource :action_check_out_forms, only: [:create]
  end
end
