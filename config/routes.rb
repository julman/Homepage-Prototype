HpProto::Application.routes.draw do
  get "results/index"
  get "job/search"
    
  root to: "results#index"
end
