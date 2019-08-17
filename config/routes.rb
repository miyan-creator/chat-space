Rails.application.routes.draw do
  devise_for :users
  get 'chat_space' => 'chat_space#index'
  resources :users, only: [:edit, :update]
end
