Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get "paint", to: "pages#paint"
  get "/game", to: "pages#game"
  get "error404", to: "pages#404", as: "error_404"
  resources :artworks, only: %i[index show]

  resources :gamerooms, only: %i[show index new create update] do
    resources :players, only: %i[create]
    collection do
      get :choice
    end
  end
end
