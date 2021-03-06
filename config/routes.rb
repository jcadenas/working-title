Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [ :create, :show ]
    resource :session, only: [ :create, :destroy ]
    resources :teams, only: [ :index, :create, :show, :destroy, :update ] do
      resources :channels, only: [ :index ]
    end
    resources :memberships, only: [ :create, :destroy ]
    resources :channels, only: [ :show, :destroy, :create, :update ] do
      resources :messages, only: [ :index ]
    end
    resources :subscriptions, only: [ :create, :destroy ]
    resources :messages, only: [ :show, :create ]
  end

end
