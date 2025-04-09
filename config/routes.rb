Rails.application.routes.draw do
  root 'home#index'
  resources :images, only: %i[index show]
  resources :games, only: %i[create update]
end
