Rails.application.routes.draw do
  devise_for :users
  root 'chat_space#index'
  resources :users, only: [:edit, :update]
end
