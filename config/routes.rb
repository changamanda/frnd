Rails.application.routes.draw do

  resources :shifts, only: [:index, :create] do
    resources :shift_items, only: [:new, :create]
    resources :user_shifts, only: [:create]
  end

  get 'home/index'

  devise_for :users
  get 'users/index', to: 'users#index', as: 'users'
  get 'users/:id', to: 'users#show', as: 'user'

  post '/shift_items/:id/sub', to: 'shift_items#sub', as: 'new_sub'
  get '/shift_items/:id/subfill', to: 'shift_items#subfill', as: 'fill_sub'
  post '/shift_items/:id/subfill', to: 'shift_items#subupdate', as: 'update_sub'

  post '/text', to: 'text#send_text_message', as: 'text'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
