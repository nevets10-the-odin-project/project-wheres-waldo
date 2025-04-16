Rails.application.routes.draw do
  root 'home#index'
  get '*path', to: 'home#index', constraints: ->(req) { !req.env['REQUEST_URI'].include?('/api/') }
  namespace :api do
    resources :images, only: %i[index show]
    resources :games, only: %i[create update]
    resources :leaderboard, only: %i[index]
    post '/games/guess', to: 'games#check_guess'
  end
end
