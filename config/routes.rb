Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit,:update,:new ,:create]
  resources :groups, only:[:index, :new,:create,:edit,:update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
