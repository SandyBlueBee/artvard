Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get "paint", to: "pages#paint"
  resources :artworks, only: %i[index show]
end
