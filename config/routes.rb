Rails.application.routes.draw do
  root 'home#index'
  get '*path', to: 'home#index'
  resources :api do
    resources :images, only: %i[index show]
    resources :games, only: %i[create update]
  end
end
