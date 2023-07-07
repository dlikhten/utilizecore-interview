Rails.application.routes.draw do
  scope :api, path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    # standard resources (mostly view-only, use forms for submission)
    resources :users, only: [:index, :show]
    resources :trips, only: [:index, :show]

    # forms
    resources :login_forms, only: [:create]
    resources :create_trip_forms, only: [:create]
    resources :reassign_trip_forms, only: [:update, :show]
    resources :action_check_in_forms, only: [:create]
    resources :action_check_out_forms, only: [:create]
  end
end
